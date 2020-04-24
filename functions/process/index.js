const AWS = require('aws-sdk');

const { parse } = require('./helper');

const s3 = new AWS.S3();

const { S3_BUCKET_DATA } = process.env;

exports.handler = async () => {
  const csvUrl = `https://${S3_BUCKET_DATA}.s3.amazonaws.com/projects.csv`;

  const result = await parse(csvUrl);

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
