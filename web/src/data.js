import similarity from 'similarity';
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

export const getLogDataUrl = () => {
  return `${API_URL}/logs.json`;
};

export const load = async () => {
  const results = await Promise.all([
    getTags(),
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

  const output = Object.keys(list)
    .map((key) => list[key])
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
    .sort(sortByKey('pushed_at', true));

  return output;
};

export const getProjects = async () => {
  const key = 'projects';
  if (cache[key]) return cache[key];

  const url = getProjectsDataUrl();
  const res = await fetch(url);
  const output = await res.json();

  output.data = output.data
    .map((item) => {
      const diff = Date.now() - (new Date(item.lastUpdatedAt).getTime());
      if (!item.lastUpdatedAt) {
        item.status = 'unknown';
      } else
      if (diff < 86400000 * 30) {
        item.status = 'hot';
      } else
      if (diff < 86400000 * 30 * 6) {
        item.status = 'normal';
      } else {
        item.status = 'low';
      }

      return item;
    })
    .sort(sortByKey('lastProposedDate', true))
    .sort(sortByKey('lastUpdatedAt', true));

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

export const getLogs = async () => {
  const key = 'logs';
  if (cache[key]) return cache[key];

  const url = getLogDataUrl();
  const res = await fetch(url);
  const output = await res.json();

  cache[key] = output;

  return output;
};
