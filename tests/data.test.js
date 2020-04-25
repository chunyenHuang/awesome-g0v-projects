const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

describe('Test Data format', () => {
  test('*.csv', async () => {
    const checkUrl = async (url) => {
      const res = await fetch(url);
      expect(res.ok, `${url} should exist`).toEqual(true);
    };

    const dataDir = path.join(__dirname, '../data');
    const promises = fs.readdirSync(dataDir)
      .filter((file) => file.endsWith('.csv'))
      .map(async (filename) => {
        const items = await csv().fromFile(path.join(dataDir, filename));
        const githubUrl = 'https://github.com';

        const checkFilePromises = items.map(async (item) => {
          expect(Object.keys(item).length, 'Do not add new properties').toEqual(3);
          expect(item.name.length, `name should be a valid string`).toBeGreaterThan(0);
          expect(item.githubId.length, 'name should be a valid string').toBeGreaterThan(0);

          const url = `${githubUrl}/${item.githubId}`;
          await checkUrl(url);

          if (item.githubRepos.length > 0) {
            const repos = item.githubRepos.split(',');
            expect(Array.isArray(repos)).toEqual(true);
            const checkRepoPromises = repos.map(async (repo) => {
              expect(repo.length).toBeGreaterThan(0);

              const url = `${githubUrl}/${item.githubId}/${repo}`;
              await checkUrl(url);
            });

            await Promise.all(checkRepoPromises);
          }
        });
        await Promise.all(checkFilePromises);
      });
    await Promise.all(promises);
  });
});
