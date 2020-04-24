const { Octokit } = require('@octokit/rest');

module.exports.parse = async (jsonObj, githubApiKey) => {
  const octokit = new Octokit({
    auth: githubApiKey,
  });

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
      const params = { owner: org, repo: repo.name, };
      const [
        { data: contributors },
        { data: languages },
      ] = await Promise.all([
        octokit.repos.listContributors(params),
        octokit.repos.listLanguages(params),
      ])

      repo.contributors = contributors;
      repo.languagePrimary = Object.keys(languages)[0];
      repo.languageSecondary = Object.keys(languages)[1];
      repo.languages = languages;
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
