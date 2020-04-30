const AWS = require('aws-sdk');
const csv = require('csvtojson');
const request = require('request');
const moment = require('moment');
const fetch = require('node-fetch');

const { getReposAndIssues } = require('./helper');
const g0vDb = require('./g0vDb');

const s3 = new AWS.S3();
const client = new AWS.SecretsManager({ region: 'us-east-1' });

const {
  S3_BUCKET_DATA,
  SECRET_NAME,
  CSV_URL,
} = process.env;

const uploadJsonData = async (filename, data) => {
  const params = {
    Bucket: S3_BUCKET_DATA,
    Key: filename,
    Body: JSON.stringify(data),
    ContentType: 'application/json',
    ACL: 'public-read',
    CacheControl: 'max-age=3600',
  };
  await s3.putObject(params).promise();
};

const getSecret = async () => {
  const data = await client.getSecretValue({ SecretId: SECRET_NAME }).promise();
  let secret;
  if ('SecretString' in data) {
    secret = data.SecretString;
  } else {
    const buff = new Buffer(data.SecretBinary, 'base64');
    secret = buff.toString('ascii');
  }
  return JSON.parse(secret);
};

exports.handler = async () => {
  const { GITHUB_API_KEY: githubApiKey } = await getSecret();

  const projectsCsvUrl = `${CSV_URL}/projects.csv`;
  const tagsCsvUrl = `${CSV_URL}/tags.csv`;
  const ownersCsvUrl = `${CSV_URL}/owners.csv`;

  const [
    projects,
    tags,
    owners,
    { url: g0vDataUrl, data: g0vDbData },
  ] = await Promise.all([
    csv().fromStream(request.get(projectsCsvUrl)),
    csv().fromStream(request.get(tagsCsvUrl)),
    csv().fromStream(request.get(ownersCsvUrl)),
    g0vDb(),
  ]);
  const { repos, issues, logs } = await getReposAndIssues(projects, githubApiKey);

  // handle hackmd
  const hackmdOverviewUrl = 'https://g0v.hackmd.io/api/overview'; // ?v=
  const res = await fetch(hackmdOverviewUrl);
  const hackmdOverviewData = await res.json();

  const updatedAt = moment().toISOString();

  await Promise.all([
    uploadJsonData('projects.json', {
      updatedAt,
      source: projectsCsvUrl,
      data: projects,
    }),
    uploadJsonData('tags.json', {
      updatedAt,
      source: tagsCsvUrl,
      data: tags,
    }),
    uploadJsonData('owners.json', {
      updatedAt,
      source: ownersCsvUrl,
      data: owners,
    }),
    uploadJsonData('repos.json', {
      updatedAt,
      source: `GitHub`,
      data: repos,
    }),
    uploadJsonData('issues.json', {
      updatedAt,
      source: `GitHub`,
      data: issues,
    }),
    uploadJsonData('logs.json', {
      updatedAt,
      source: 'Server',
      data: logs,
    }),
    uploadJsonData('g0vDbData.json', {
      updatedAt,
      source: g0vDataUrl.split('?')[0],
      data: g0vDbData,
    }),
    uploadJsonData('hackmd.json', {
      updatedAt,
      source: hackmdOverviewUrl,
      data: hackmdOverviewData,
    }),
  ]);

  return 'ok';
};
