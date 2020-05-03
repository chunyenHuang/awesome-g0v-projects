const AWS = require('aws-sdk');
const csv = require('csvtojson');
const request = require('request');
const moment = require('moment');
const fetch = require('node-fetch');

const { getReposAndIssues } = require('./helper');
const g0vDb = require('./g0vDb');
const associate = require('./associate');

const s3 = new AWS.S3();
const client = new AWS.SecretsManager({ region: 'us-east-1' });

const {
  S3_BUCKET_DATA,
  SECRET_NAME,
  CSV_URL,
} = process.env;

let updatedAt;

const uploadJsonData = async (filename, data, source) => {
  const params = {
    Bucket: S3_BUCKET_DATA,
    Key: filename,
    Body: JSON.stringify({ updatedAt, source, data }),
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

  const {
    updatedProjects,
    updatedRepos,
    updatedHackmds,
    updatedG0vData,
  } = associate(projects, repos, g0vDbData, hackmdOverviewData);

  updatedAt = moment().toISOString();

  await Promise.all([
    uploadJsonData('projects.json', updatedProjects, projectsCsvUrl),
    uploadJsonData('repos.json', updatedRepos, 'GitHub'),
    uploadJsonData('hackmd.json', updatedHackmds, hackmdOverviewUrl),
    uploadJsonData('g0vDbData.json', updatedG0vData, g0vDataUrl.split('?')[0]),

    uploadJsonData('tags.json', tags, tagsCsvUrl),
    uploadJsonData('owners.json', owners, ownersCsvUrl),
    uploadJsonData('issues.json', issues, 'GitHub'),
    uploadJsonData('logs.json', logs, 'Server'),
  ]);

  return 'ok';
};
