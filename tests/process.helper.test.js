const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');

const { parse } = require('../functions/process/helper');

const { GITHUB_API_KEY } = process.env;

jest.setTimeout(3 * 60 * 1000);

describe('Process Helper', () => {
  it('parse: test data', async () => {
    if (!GITHUB_API_KEY) return console.log('Bypass without GITHUB_API_KEY');

    const jsonObj = [{
      type: 'user',
      name: 'John Huang',
      githubId: 'chunyenHuang',
      githubRepos: 'awesome-g0v-projects',
    }];
    const result = await parse(jsonObj, GITHUB_API_KEY, 100);

    fs.writeFileSync(path.join(__dirname, 'result-test-data.json'), JSON.stringify(result, null, 2));
  });

  it('parse: organization.csv', async () => {
    if (!GITHUB_API_KEY) return console.log('Bypass without GITHUB_API_KEY');

    const jsonObj = await csv().fromFile(path.join(__dirname, '../data/organizations.csv'));
    const result = await parse(jsonObj, GITHUB_API_KEY);

    fs.writeFileSync(path.join(__dirname, 'result.json'), JSON.stringify(result, null, 2));
  });
});
