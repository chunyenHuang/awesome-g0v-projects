const AWS = require('aws-sdk');
const csv = require('csvtojson');
const request = require('request');

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

  const params = {
    Bucket: S3_BUCKET_DATA,
    Key: 'data.json',
    Body: JSON.stringify(result),
    ContentType: 'application/json',
    ACL: 'public-read',
  };
  await s3.putObject(params).promise();

  return 'ok';
};
