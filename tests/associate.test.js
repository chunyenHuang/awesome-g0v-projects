const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const csv = require('csvtojson');

const g0vDb = require('../functions/process/g0vDb');
const associate = require('../functions/process/associate');

jest.setTimeout(60 * 1000);

const { DEBUG } = process.env;

describe('Associate', () => {
  it('Associate', async () => {
    const baseUrl = 'https://awesome-g0v-projects-dev-data.s3.amazonaws.com';
    const [
      projects,
      { data: repos },
      { data: g0vDbData },
      { data: hackmd },
    ] = await Promise.all([
      csv().fromFile(path.join(__dirname, '../data/projects.csv')),
      fetch(`${baseUrl}/repos.json`).then((res) => res.json()),
      g0vDb(),
      fetch(`${baseUrl}/hackmd.json`).then((res) => res.json()),
    ]);

    const {
      updatedProjects,
      updatedRepos,
      updatedHackmds,
      updatedG0vData,
    } = associate(projects, repos, g0vDbData, hackmd);

    expect(Array.isArray(updatedProjects)).toEqual(true);
    expect(Array.isArray(updatedRepos)).toEqual(true);
    expect(Array.isArray(updatedHackmds)).toEqual(true);
    expect(Array.isArray(updatedG0vData)).toEqual(true);

    if (DEBUG) {
      fs.writeFileSync(path.join(__dirname, 'associate-updatedProjects.json'), JSON.stringify(updatedProjects, null, 2));
      fs.writeFileSync(path.join(__dirname, 'associate-updatedRepos.json'), JSON.stringify(updatedRepos, null, 2));
      fs.writeFileSync(path.join(__dirname, 'associate-updatedHackmds.json'), JSON.stringify(updatedHackmds, null, 2));
      fs.writeFileSync(path.join(__dirname, 'associate-updatedG0vData.json'), JSON.stringify(updatedG0vData, null, 2));
    }
  });
});
