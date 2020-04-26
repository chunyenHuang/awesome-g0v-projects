const { Octokit } = require('@octokit/rest');
const fetch = require('node-fetch');
const to = require('await-to-js').default;

const { groupArrayByCount, fixJSONString } = require('../utils');

const RESERVED_RATE = 2000;
const BATCH_PROCESS_REPOS_SIZE = 300;
const EXCLUDE_FORK_REPO = true;

let octokit;

module.exports.parse = async (jsonObj, githubApiKey, reservedRate = RESERVED_RATE) => {
  octokit = new Octokit({
    auth: githubApiKey,
  });

  const { data: { rate: { limit, remaining, reset } } } = await octokit.rateLimit.get();
  console.log(`Github API Rate`, { limit, remaining, reset });

  // Prevent throttling, only execute this when there is sufficient rate for requests.
  if (remaining < reservedRate) {
    throw new Error(`Will reset in ${((reset * 1000 - Date.now())/60000).toFixed(0)} minutes`);
  }

  const promises = jsonObj.map(processGithubOrgOrUser);

  const result = await Promise.all(promises);

  const { data: { rate: { remaining: currentRemaining } } } = await octokit.rateLimit.get();

  console.log(`${remaining - currentRemaining} - GitHub api calls used in this process.`);

  return result.filter((x) => x);
};

async function getG0vJson({ full_name, default_branch }) {
  const url = `https://raw.githubusercontent.com/${full_name}/${default_branch}/g0v.json`;

  const [err, res] = await to(fetch(url));
  if (err || !res.ok) {
    return { url: null, data: {} };
  }

  const output = await res.text();
  const customLog = `Invalid Json format. Make a PR for this file:` +
    `${url.replace('https://raw.githubusercontent.com', 'https://github.com').replace(`/${full_name}/`, `/${full_name}/blob/`)}`;
  const data = fixJSONString(output, customLog);

  return {
    url: data ? url : null,
    data,
  };
}

async function getContributors(octokit, owner, repo) {
  const params = {
    owner,
    repo: repo.name,
    anon: true,
    per_page: 100,
  };
  const [error, results] = await to(octokit.paginate(octokit.repos.listContributors, params));

  if (error) {
    console.log(`Failed to get contributors for ${owner}/${repo}`);
    return [];
  }

  return results.map(({ login, avatar_url, html_url, site_admin, contributions, type }) => {
    return { login, avatar_url, html_url, site_admin, contributions, type };
  });
}

async function getLanguages(octokit, owner, repo) {
  const { data: languages } = await octokit.repos.listLanguages({ owner, repo: repo.name });

  return {
    languages,
    languagePrimary: Object.keys(languages)[0],
    languageSecondary: Object.keys(languages)[1],
  };
}

async function getRepos(owner, type, targetRepos = []) {
  // Only query for registered repos.
  let repos;
  if (targetRepos.length === 0) {
    repos = (type === 'org') ?
      await octokit.paginate(octokit.repos.listForOrg, { org: owner }) :
      await octokit.paginate(octokit.repos.listForUser, { username: owner });
  } else {
    repos = await Promise.all(
      targetRepos.map(async (repo) => {
        const params = {
          owner,
          repo,
        };

        const { data } = await octokit.repos.get(params);
        return data;
      }),
    );
  }

  // only keep the original project.
  if (EXCLUDE_FORK_REPO) {
    repos = repos.filter((x) => !x.fork);
  }

  return repos;
}

async function getGithubInfo(type, owner) {
  const { data: githubInfo } = (type === 'org') ? await octokit.orgs.get({ org: owner }):
    await octokit.users.getByUsername({ username: owner });

  return {
    login: githubInfo.login,
    description: githubInfo.description,
    html_url: githubInfo.html_url,
    avatar_url: githubInfo.avatar_url,
    public_repos: githubInfo.public_repos,
    type: githubInfo.type,
    created_at: githubInfo.created_at,
    updated_at: githubInfo.updated_at,
  };
}

async function processRepo(owner, repo) {
  const [
    contributors,
    { languages, languagePrimary, languageSecondary },
    { url: g0vJsonUrl, data: g0vJson },
  ] = await Promise.all([
    getContributors(octokit, owner, repo),
    getLanguages(octokit, owner, repo),
    getG0vJson(repo),
  ]);

  // only keep necessary data
  return {
    name: repo.name,
    owner: {
      login: repo.owner.login,
      type: repo.owner.type,
      avatar_url: repo.owner.avatar_url,
      html_url: repo.owner.html_url,
      site_admin: repo.owner.site_admin,
    },
    html_url: repo.html_url,
    description: repo.description,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    pushed_at: repo.pushed_at,
    homepage: repo.homepage,
    language: repo.language,
    fork: repo.fork,
    forks_count: repo.forks_count,
    archived: repo.archived,
    disabled: repo.disabled,
    license: repo.license,
    forks: repo.forks,
    open_issues: repo.open_issues,
    stargazers_count: repo.stargazers_count,
    watchers_count: repo.watchers_count,
    open_issues_count: repo.open_issues_count,
    watchers: repo.watchers,
    default_branch: repo.default_branch,
    // optional g0v.json
    g0vJsonUrl,
    g0vJson,
    // custom
    languages,
    languagePrimary,
    languageSecondary,
    contributors,
  };
}

async function processGithubOrgOrUser({ type, name, githubId, githubRepos }) {
  const owner = githubId.replace('https://github.com/', '');
  const targetRepos = githubRepos.split(',').filter((x) => x);

  const [githubInfo, repos] = await Promise.all([
    getGithubInfo(type, owner),
    getRepos(owner, type, targetRepos),
  ]);

  const updatedRepos = [];
  const groups = groupArrayByCount(repos, BATCH_PROCESS_REPOS_SIZE);
  await groups.reduce(async (chain, group) => {
    await chain;
    const fetchRepoInfoPromises = group.map(async (repo) => {
      updatedRepos.push(await processRepo(owner, repo));
    });

    await Promise.all(fetchRepoInfoPromises);
  }, Promise.resolve());

  return {
    name,
    githubInfo,
    repos: updatedRepos,
  };
}
