const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');

const { getReposAndIssues } = require('../functions/process/helper');

const { GITHUB_API_KEY } = process.env;

jest.setTimeout(3 * 60 * 1000);

describe('Process Helper', () => {
  // TODO: since g0v will be automatically included, this test must be changed
  // it('parse: test data', async () => {
  //   if (!GITHUB_API_KEY) return console.log('Bypass without GITHUB_API_KEY');

  //   const projects = [{
  //     github_repos: 'chunyenHuang/awesome-g0v-projects',
  //   }];
  //   const result = await getReposAndIssues(projects, GITHUB_API_KEY, 100);

  //   fs.writeFileSync(path.join(__dirname, 'result-test-data.json'), JSON.stringify(result, null, 2));
  //   const { repos, issues, logs } = result;
  //   expect(Array.isArray(repos)).toEqual(true);
  //   expect(Array.isArray(issues)).toEqual(true);
  //   expect(Array.isArray(logs)).toEqual(true);
  // });

  it('parse: projects.csv', async () => {
    if (!GITHUB_API_KEY) return console.log('Bypass without GITHUB_API_KEY');

    const projects = await csv().fromFile(path.join(__dirname, '../data/projects.csv'));
    const result = await getReposAndIssues(projects, GITHUB_API_KEY);

    fs.writeFileSync(path.join(__dirname, 'result.json'), JSON.stringify(result, null, 2));

    const { repos, issues, logs } = result;
    console.log(repos.length);
    console.log(issues.length);
    expect(Array.isArray(repos)).toEqual(true);
    expect(Array.isArray(issues)).toEqual(true);
    expect(Array.isArray(logs)).toEqual(true);
  });
});
