const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

jest.setTimeout(5 * 60 * 1000);

const REQUEST_WAIT_TIME = 300;

describe('Test Data format', () => {
  test('*.csv', async () => {
    const toCheckUrls = [];
    const addCheckUrl = async (url) => {
      if (toCheckUrls.includes(url)) {
        throw new Error(`${url} has been checked. Please check if there is any duplicate.`);
      }
      toCheckUrls.push(url);
    };

    const dataDir = path.join(__dirname, '../data');
    const promises = fs.readdirSync(dataDir)
      .filter((file) => file.endsWith('.csv'))
      .map(async (filename) => {
        const items = await csv().fromFile(path.join(dataDir, filename));
        const githubUrl = 'https://github.com';

        const checkFilePromises = items.map(async (item) => {
          expect(Object.keys(item).length, `Do not add new properties, ${JSON.stringify(item)}`).toEqual(4);
          expect(item.name.length, `name should be a valid string, ${item.name}`).toBeGreaterThan(0);
          expect(item.githubId.length, `name should be a valid string, ${item.name}`).toBeGreaterThan(0);

          const url = `${githubUrl}/${item.githubId}`;
          addCheckUrl(url);

          if (item.githubRepos.length > 0) {
            const repos = item.githubRepos.split(',');
            expect(Array.isArray(repos)).toEqual(true);
            const checkRepoPromises = repos.map(async (repo) => {
              expect(repo.length).toBeGreaterThan(0);

              const url = `${githubUrl}/${item.githubId}/${repo}`;
              addCheckUrl(url);
            });

            await Promise.all(checkRepoPromises);
          }
        });
        await Promise.all(checkFilePromises);
      });
    await Promise.all(promises);

    // prevent github throttling
    console.log(`Checking ${toCheckUrls.length} urls... should take about ${toCheckUrls.length*REQUEST_WAIT_TIME/1000} seconds`);
    const failed = [];
    await toCheckUrls.reduce(async (chain, url) => {
      await chain;
      const res = await fetch(url);
      if (!res.ok) {
        const err = `${url} Error: ${res.status}`;
        console.log(err);
        failed.push(err);
      }
      await new Promise((resolve) => setTimeout(resolve, REQUEST_WAIT_TIME));
    }, Promise.resolve());

    expect(failed.length, failed.join('\n')).toEqual(0);
  });
});
