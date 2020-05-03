const { Octokit } = require('@octokit/rest');
const to = require('await-to-js').default;

const { GITHUB_API_KEY } = process.env;

describe('GitHub', () => {
  test('Failed to get contributors', async () => {
    if (!GITHUB_API_KEY) return console.log('Bypass without GITHUB_API_KEY');

    const full_name = 'g0v/react-native-xx';

    const octokit = new Octokit({
      auth: GITHUB_API_KEY,
    });
    const [owner, repo] = full_name.split('/');
    const params = {
      owner,
      repo,
      anon: true,
      per_page: 100,
    };
    const [error, results] = await to(octokit.paginate(octokit.repos.listContributors, params));

    if (error) {
      console.log(error);
    } else {
      console.log(results);
    }
  });
});
