const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');
const { Octokit } = require('@octokit/rest');

const { GITHUB_API_KEY } = process.env;

const octokit = new Octokit({
  auth: GITHUB_API_KEY,
});

module.exports.parse = async (jsonObj) => {
  const promises = jsonObj.map(async ({ name, githubOrgUrl, githubRepoUrls }) => {
    const org = githubOrgUrl.replace('https://github.com/', '');
    const { data: githubInfo } = await octokit.orgs.get({ org });

    const targetRepos = githubRepoUrls.split(',').filter((x) => x);
    // Only query for registered repos.
    let repos;
    if (targetRepos.length === 0) {
      repos = (await octokit.repos.listForOrg({ org })).data;
    } else {
      repos = await Promise.all(
        targetRepos.map(async (url) => {
          const name = url.split('/').pop();
          const params = {
            owner: org,
            repo: name,
          };

          const { data } = await octokit.repos.get(params);
          return data;
        }),
      );
    }

    const fetchRepoInfoPromises = repos.map(async (repo) => {
      const [
        { data: contributors },
      ] = await Promise.all([
        octokit.repos.listContributors({ owner: org, repo: repo.name, }),
      ])

      repo.contributors = contributors;
    });

    await Promise.all(fetchRepoInfoPromises);

    return {
      name,
      githubInfo,
      repos,
    };
  });

  return Promise.all(promises);
};
