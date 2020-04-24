const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');

const { parse } = require('../functions/process/helper');

const { GITHUB_API_KEY } = process.env;

jest.setTimeout(3 * 60 * 1000);

describe('Process Helper', () => {
  it('parse', async () => {
    const jsonObj = await csv().fromFile(path.join(__dirname, '../data/projects.csv'));
    const result = await parse(jsonObj, GITHUB_API_KEY);

    fs.writeFileSync(path.join(__dirname, 'result.json'), JSON.stringify(result, null, 2));
  });
});
