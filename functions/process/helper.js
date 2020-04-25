const { Octokit } = require('@octokit/rest');
const fetch = require('node-fetch');
const to = require('await-to-js').default;

module.exports.parse = async (jsonObj, githubApiKey) => {
  const octokit = new Octokit({
    auth: githubApiKey,
  });

  const promises = jsonObj.map(async ({ type, name, githubId, githubRepos }) => {
    const owner = githubId.replace('https://github.com/', '');

    const { data: githubInfo } = (type === 'org') ? await octokit.orgs.get({ org: owner }):
      await octokit.users.getByUsername({ username: owner });

    const targetRepos = githubRepos.split(',').filter((x) => x);

    // Only query for registered repos.
    let repos;
    if (targetRepos.length === 0) {
      repos = (type === 'org') ? await octokit.paginate(octokit.repos.listForOrg, { org: owner }) :
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

    const getG0vJson = async ({ full_name, default_branch }) => {
      const url = `https://raw.githubusercontent.com/${full_name}/${default_branch}/g0v.json`;

      const [err, res] = await to(fetch(url));
      const output = await res.text();

      let data;
      if (!err && res.ok) {
        try {
          data = JSON.parse(output);
        } catch (e) {
          console.log(
            'Invalid Json format. Make a PR for this file:',
            url.replace('https://raw.githubusercontent.com', 'https://github.com').replace(`/${full_name}/`, `/${full_name}/blob/`),
          );

          // try common error fix
          try {
            const fixedString = output
              .replace(/\r?\n|\r/g, '')
              .replace(/\s\s+/g, ' ') // extra white space
              .replace(/,(\s+)?}/g, '{') // ,}
              .replace(/,(\s+)?\]/g, ']') // ,]
              .replace(/\](\s+)?"/g, '],"') // ]"
              .replace(/}(\s+)?"/g, '},"'); // }"

            data = JSON.parse(fixedString);
            console.log('Fix by common JSON fix');
          } catch (e) {
            console.log(e);
          }
          data = {};
        }
      }

      return {
        url: data ? url : null,
        data,
      };
    };

    const updatedRepos = [];

    const groups = groupArrayByCount(repos, 50);
    await groups.reduce(async (chain, group) => {
      await chain;
      const fetchRepoInfoPromises = group.map(async (repo) => {
        const params = { owner, repo: repo.name, per_page: 100 };
        const [
          contributors,
          { data: languages },
          { url: g0vJsonUrl, data: g0vJson },
        ] = await Promise.all([
          octokit.paginate(octokit.repos.listContributors, params).catch((err) => {
            console.log('Failed to get contributors for', params);
            return [];
          }),
          octokit.repos.listLanguages(params),
          getG0vJson(repo),
        ]);

        // only keep necessary data
        updatedRepos.push({
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
          languagePrimary: Object.keys(languages)[0],
          languageSecondary: Object.keys(languages)[1],
          contributors: contributors.map(({ login, avatar_url, html_url, site_admin, contributions, type }) => {
            return { login, avatar_url, html_url, site_admin, contributions, type };
          }),
          languages,
        });
      });

      await Promise.all(fetchRepoInfoPromises);
    }, Promise.resolve());

    return {
      name,
      githubInfo: {
        login: githubInfo.login,
        description: githubInfo.description,
        html_url: githubInfo.html_url,
        public_repos: githubInfo.public_repos,
        type: githubInfo.type,
        created_at: githubInfo.created_at,
        updated_at: githubInfo.updated_at,
      },
      repos: updatedRepos,
    };
  });

  const result = await Promise.all(promises);
  return result.filter((x) => x);
};

/**
 * @memberof module:utils
 * @summary split array items to grouped items
 * @param {Array} inArray
 * @param {number} inCount
 * @return {Array<Array>}
 */
function groupArrayByCount(inArray = [], inCount) {
  if (inCount <= 0) {
    return inArray;
  }
  const result = [];
  let currentGroupIndex = -1;
  inArray.forEach((item, index) => {
    if (index % inCount === 0) {
      currentGroupIndex++;
      result.push([]);
    }

    result[currentGroupIndex].push(item);
  });

  return result;
}