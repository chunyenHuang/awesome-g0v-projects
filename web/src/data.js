import { sortByKey } from './utils';
const env = window.location.hostname.includes('-prd-') ? 'prd' : 'dev';

const cache = {};

const API_URL = `https://awesome-g0v-projects-${env}-data.s3.amazonaws.com`;

export const getProjectsDataUrl = () => {
  return `${API_URL}/projects.json`;
};

export const getTagsDataUrl = () => {
  return `${API_URL}/tags.json`;
};

export const getOwnersDataUrl = () => {
  return `${API_URL}/tags.json`;
};

export const getGithubReposUrl = () => {
  return `${API_URL}/repos.json`;
};

export const getGithubIssuesUrl = () => {
  return `${API_URL}/issues.json`;
};

export const getG0VDataUrl = () => {
  return `${API_URL}/g0vDbData.json`;
};

export const getHackmdDataUrl = () => {
  return `${API_URL}/hackmd.json`;
};

export const load = async () => {
  await Promise.all([
    getTags(),
    getRepos(),
    getProposals(),
  ]);

  const results = await Promise.all([
    getProjects(),
  ]);

  return results[0].updatedAt;
};

export const getHackmdData = async () => {
  const key = 'hackmd';
  if (cache[key]) return cache[key];

  const url = getHackmdDataUrl();
  const res = await fetch(url);
  const output = await res.json();

  cache[key] = output;

  return output;
};

export const getHackmdDataByTag = async (inRepos) => {
  const key = 'hackmd-byTag';
  if (cache[key]) return cache[key];

  const { data: hackmdData } = await getHackmdData();

  // group by tags
  const list = {};

  hackmdData.forEach((record) => {
    const { lastchangeAt, title } = record;
    record.tags = record.tags || [];
    record.tags.forEach((tag) => {
      const data = list[tag] || {
        tag,
        tagUrl: `https://g0v.hackmd.io/?nav=overview&tags=%5B"${tag}"%5D`,
        recentTitle: '',
        recentLastChangedAt: undefined,
        records: [],
        githubRepoUrl: '',
      };
      data.records.push(record);

      if (!data.recentLastChangedAt || data.recentLastChangedAt < lastchangeAt) {
        data.recentLastChangedAt = lastchangeAt;
        data.recentTitle = title;
      }

      list[tag] = data;
    });
  });

  const repos = inRepos || (await getRepos()).data;

  const output = Object.keys(list)
    .map((key) => {
      const item = list[key];
      const matchRepo = repos.find((x) => {
        const targetName = item.tag.toLowerCase();

        if (targetName === 'g0v') return false;

        return x.owner.login.toLowerCase() === targetName ||
          x.name.toLowerCase() === targetName ||
          x.name.toLowerCase().startsWith(targetName) ||
          targetName.startsWith(x.name.toLowerCase());
      });
      if (matchRepo) {
        item.githubRepoUrl = matchRepo.html_url;
        matchRepo.hackmdUrl = item.tagUrl;
      }
      return item;
    })
    .sort(sortByKey('recentLastChangedAt', true));

  cache[key] = output;

  return output;
};

export const getTags = async () => {
  const key = 'tags';
  if (cache[key]) return cache[key];

  const url = getTagsDataUrl();
  const res = await fetch(url);
  const output = await res.json();

  cache[key] = output;

  return output;
};

export const getRepos = async () => {
  const key = 'repos';
  if (cache[key]) return cache[key];

  const url = getGithubReposUrl();
  const res = await fetch(url);
  const output = await res.json();

  cache[key] = output;
  console.log(output);

  output.data = output.data
    // Ignore fork projects
    .filter((x) => !x.fork)
    .sort(sortByKey('pushed_at', true))
    .map((item) => {
      item.languages = Object.keys(item.languages || {}).map((key) => key);
      return item;
    });

  // // link
  // await getHackmdDataByTag(repos);

  return output;
};

export const getProjects = async () => {
  const key = 'projects';
  if (cache[key]) return cache[key];

  const url = getProjectsDataUrl();
  const res = await fetch(url);
  const output = await res.json();

  const { data: repos } = await getRepos();
  const { data: proposals } = await getProposals();

  const isValidLink = (string) => {
    return string !== '' && string.startsWith('http');
  };

  output.data = output.data
    .map((item) => {
      item.g0v_db_rows = item.g0v_db_rows.split(',').filter((x) => x).map((x) => parseInt(x));
      item.github_repos = item.github_repos.split(',').filter((x) => x);
      item.owners = item.owners.split(',').filter((x) => x);
      item.tags = item.tags.split(',').filter((x) => x);

      item.proposals = proposals.filter((x) => item.g0v_db_rows.includes(x.row));
      item.repos = repos.filter((x) => item.github_repos.includes(x.full_name));

      item.lastProposedDate = (item.proposals[0] || {}).date;
      item.lastRepoUpdatedDate = (item.repos[0] || {}).pushed_at;

      // fill homepage url if possible
      if (!isValidLink(item.homepage)) {
        if (item.proposals[0]) {
          const { guideline, video_link, other_document } = item.proposals[0];

          item.homepage = isValidLink(guideline) ? guideline :
            isValidLink(video_link) ? video_link : other_document;
        } else
        if (item.repos[0]) {
          item.homepage = item.repos[0].html_url;
        }
      }

      return item;
    })
    .sort(sortByKey('lastProposedDate', true))
    .sort(sortByKey('lastRepoUpdatedDate', true));

  cache[key] = output;

  return output;
};

export const getProposals = async () => {
  const key = 'proposals';
  if (cache[key]) return cache[key];

  const url = getG0VDataUrl();
  const res = await fetch(url);
  const output = await res.json();

  output.data = output.data
    .sort(sortByKey('date', true));

  cache[key] = output;

  return output;
};

// export const getProposalsDataUrl = () => {
//   return 'https://sheets.googleapis.com/v4/spreadsheets/1C9-g1pvkfqBJbfkjPB0gvfBbBxVlWYJj6tTVwaI5_x8/values/%E5%A4%A7%E6%9D%BE%E6%8F%90%E6%A1%88%E5%88%97%E8%A1%A8!A1:W10000?key=AIzaSyBhiqVypmyLHYPmqZYtvdSvxEopcLZBdYU'; // eslint-disable-line
// };

export const getProposalEvents = async () => {
  const events = {};
  const { data } = await getProposals();

  data.forEach((item) => {
    events[item.term] = events[item.term] || {
      term: item.term,
      date: item.date,
      event_name: item.event_name,
      dummy_event_type: item.dummy_event_type,
      proposals: [],
    };
    events[item.term].proposals.push(item);
  });

  return Object.keys(events).reverse().map((key) => events[key]);
};

export const getGitHubIssues = async () => {
  const key = 'issues';
  if (cache[key]) return cache[key];

  const url = getGithubIssuesUrl();
  const res = await fetch(url);
  const output = await res.json();

  output.data = output.data
    .sort(sortByKey('created_at', true));

  cache[key] = output;

  return output;
};
