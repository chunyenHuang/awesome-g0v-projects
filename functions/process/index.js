const AWS = require('aws-sdk');
const csv = require('csvtojson');
const request = require('request');

const { parse } = require('./helper');

const s3 = new AWS.S3();

const { S3_BUCKET_DATA } = process.env;

exports.handler = async () => {
  const csvUrl = `https://raw.githubusercontent.com/chunyenHuang/awesome-g0v-projects/master/data/projects.csv`;
  const jsonObj = await csv().fromStream(request.get(csvUrl));

  const result = await parse(jsonObj);

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
