const { Octokit } = require('@octokit/rest');
const fetch = require('node-fetch');
const to = require('await-to-js').default;

const { groupArrayByCount, fixJSONString } = require('../utils');

const RESERVED_RATE = 1000;
const BATCH_PROCESS_REPOS_SIZE = 100;

let octokit;
let logs;

module.exports.getReposAndIssues = async (projects, githubApiKey, reservedRate = RESERVED_RATE) => {
  octokit = new Octokit({
    auth: githubApiKey,
  });

  logs = [];

  const { data: { rate: { limit, remaining, reset } } } = await octokit.rateLimit.get();
  console.log({ limit, remaining, reset });
  logs.push(`Github API Rate`, { limit, remaining, reset });

  // Prevent throttling, only execute this when there is sufficient rate for requests.
  if (remaining < reservedRate) {
    throw new Error(`Will reset in ${((reset * 1000 - Date.now())/60000).toFixed(0)} minutes`);
  }

  // get all the g0v repo first
  const g0vRepos = await getAllReposForOrg('g0v');
  logs.push(`g0vRepos: ${g0vRepos.length}`);

  const otherRepoNames = [];
  projects.forEach(({ github_repos }) => {
    const candidates = github_repos.split(',').filter((x) => x);
    candidates
      .filter((x) => !x.startsWith('g0v/')) // fetch the rest repos
      .forEach((item) => {
        if (!otherRepoNames.includes(item)) {
          otherRepoNames.push(item);
        }
      });
  });

  logs.push(`otherRepoNames: ${otherRepoNames.length}`);

  let allIssues = [];

  const g0vGroups = groupArrayByCount(g0vRepos.map(({ full_name }) => full_name), BATCH_PROCESS_REPOS_SIZE);
  await g0vGroups.reduce(async (chain, groupRepoNames) => {
    await chain;
    const [issues] = await Promise.all([
      getIssues(groupRepoNames),
    ]);
    allIssues = [...allIssues, ...issues];
  }, Promise.resolve());

  let otherRepos = [];
  const otherGroups = groupArrayByCount(otherRepoNames, BATCH_PROCESS_REPOS_SIZE);
  await otherGroups.reduce(async (chain, groupRepoNames) => {
    await chain;
    const [issues, repos] = await Promise.all([
      getIssues(groupRepoNames),
      getAllRepos(groupRepoNames),
    ]);
    allIssues = [...allIssues, ...issues];
    otherRepos = [...otherRepos, ...repos];
  }, Promise.resolve());

  const updatedRepos = await Promise.all(
    [...g0vRepos, ...otherRepos].map(processRepo),
  );

  const { data: { rate: { remaining: currentRemaining } } } = await octokit.rateLimit.get();

  logs.push(`${remaining - currentRemaining} - GitHub api calls used in this process.`);

  return {
    repos: updatedRepos.filter((x) => x),
    issues: allIssues,
    logs,
  };
};

async function getG0vJson({ size, full_name, default_branch }) {
  if (size === 0) {
    return { url: null, data: {} };
  }

  const url = `https://raw.githubusercontent.com/${full_name}/${default_branch}/g0v.json`;

  const [err, res] = await to(fetch(url));
  if (err || !res.ok) {
    return { url: null, data: {} };
  }

  const output = await res.text();
  const { data, error } = fixJSONString(output);

  if (error) {
    const customLog = `Invalid Json format. Make a PR for this file:` +
      `${url.replace('https://raw.githubusercontent.com', 'https://github.com').replace(`/${full_name}/`, `/${full_name}/blob/`)}`;

    logs.push(customLog);
  }

  return {
    url: data ? url : null,
    data,
  };
}

async function getContributors(repo) {
  if (repo.size === 0) return [];

  const owner = repo.full_name.split('/')[0];
  const params = {
    owner,
    repo: repo.name,
    anon: true,
    per_page: 100,
  };
  const [error, results] = await to(octokit.paginate(octokit.repos.listContributors, params));

  if (error) {
    logs.push(`Failed to get contributors for ${repo.full_name}`);
    return [];
  }

  return results.map(({ login, avatar_url, html_url, site_admin, contributions, type }) => {
    return { login, avatar_url, html_url, site_admin, contributions, type };
  });
}

async function getLanguages(repo) {
  if (repo.size === 0 || !repo.language) return [];

  const owner = repo.full_name.split('/')[0];
  const params = {
    owner,
    repo: repo.name,
  };
  const [error, res] = await to(octokit.repos.listLanguages(params));

  if (error) {
    logs.push(`Failed to get languages for ${repo.full_name}`);
    return {
      languages: {},
      languagePrimary: 'N/A',
      languageSecondary: 'N/A',
    };
  }

  const languages = res.data;

  return {
    languages,
    languagePrimary: Object.keys(languages)[0],
    languageSecondary: Object.keys(languages)[1],
  };
}

async function processRepo(repo) {
  const [
    contributors,
    { languages, languagePrimary, languageSecondary },
    { url: g0vJsonUrl, data: g0vJson },
  ] = await Promise.all([
    getContributors(repo),
    getLanguages(repo),
    getG0vJson(repo),
  ]);

  // only keep necessary data
  return {
    name: repo.name,
    full_name: repo.full_name,
    owner: {
      login: repo.owner.login,
      type: repo.owner.type,
      avatar_url: repo.owner.avatar_url,
      html_url: repo.owner.html_url,
      site_admin: repo.owner.site_admin,
    },
    size: repo.size,
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

async function getIssues(repoNames) {
  const query = {
    q: `type:issues+state:open+${repoNames.map((x)=>`repo:${x}`).join('+')}`,
    sort: 'created',
    order: 'desc',
    per_page: 100,
  };

  const { data: { items } } = await octokit.search.issuesAndPullRequests(query);
  return items;
}

async function getAllRepos(repoNames) {
  const query = {
    q: `fork:false+${repoNames.map((x)=>`repo:${x}`).join('+')}`,
    sort: 'updated',
    order: 'desc',
    per_page: 100,
  };

  const data = await octokit.paginate(octokit.search.repos, query);
  return data;
}

async function getAllReposForOrg(org) {
  return octokit.paginate(octokit.repos.listForOrg, { org, per_page: 100 });
}
