const AWS = require('aws-sdk');
const csv = require('csvtojson');
const request = require('request');
const moment = require('moment');
const fetch = require('node-fetch');

const { parse } = require('./helper');

const s3 = new AWS.S3();
const client = new AWS.SecretsManager({ region: 'us-east-1' });

const {
  S3_BUCKET_DATA,
  SECRET_NAME,
  CSV_URL_ORGS,
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

  const jsonObj = await csv().fromStream(request.get(CSV_URL_ORGS));
  const { data, issues, logs } = await parse(jsonObj, githubApiKey);

  const report = {
    updatedAt: moment().toISOString(),
    source: CSV_URL_ORGS,
    data,
  };

  // handle hackmd
  const hackmdOverviewUrl = 'https://g0v.hackmd.io/api/overview'; // ?v=
  const res = await fetch(hackmdOverviewUrl);
  const hackmdOverviewData = await res.json();

  await Promise.all([
    uploadJsonData('data.json', report),
    uploadJsonData('issues.json', issues),
    uploadJsonData('logs.json', logs),
    uploadJsonData('hackmd.json', hackmdOverviewData),
  ]);

  return 'ok';
};
