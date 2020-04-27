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

exports.handler = async () => {
  const data = await client.getSecretValue({ SecretId: SECRET_NAME }).promise();
  let secret;
  if ('SecretString' in data) {
    secret = data.SecretString;
  } else {
    const buff = new Buffer(data.SecretBinary, 'base64');
    secret = buff.toString('ascii');
  }
  const { GITHUB_API_KEY: githubApiKey } = JSON.parse(secret);

  const jsonObj = await csv().fromStream(request.get(CSV_URL_ORGS));
  const result = await parse(jsonObj, githubApiKey);

  const report = {
    updatedAt: moment().toISOString(),
    source: CSV_URL_ORGS,
    data: result,
  };

  const params = {
    Bucket: S3_BUCKET_DATA,
    Key: 'data.json',
    Body: JSON.stringify(report),
    ContentType: 'application/json',
    ACL: 'public-read',
    CacheControl: 'max-age=3600',
  };
  await s3.putObject(params).promise();

  // handle hackmd
  const hackmdOverviewUrl = 'https://g0v.hackmd.io/api/overview'; // ?v=
  // const hackmdHistoryurl = 'https://g0v.hackmd.io/api/_/history'; // ?v=1587947073774&limit=100
  const res = await fetch(hackmdOverviewUrl);
  const hackmdOverviewData = await res.json();

  await s3.putObject({
    Bucket: S3_BUCKET_DATA,
    Key: 'hackmd.json',
    Body: JSON.stringify(hackmdOverviewData),
    ContentType: 'application/json',
    ACL: 'public-read',
    CacheControl: 'max-age=3600',
  }).promise();

  return 'ok';
};
