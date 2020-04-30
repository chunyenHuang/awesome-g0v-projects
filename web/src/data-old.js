const env = window.location.hostname.includes('-prd-') ? 'prd' : 'dev';

const cache = {};

export const getGithubDataUrl = () => {
  return `https://awesome-g0v-projects-${env}-data.s3.amazonaws.com/data.json`;
};

export const getGithubIssuesUrl = () => {
  return `https://awesome-g0v-projects-${env}-data.s3.amazonaws.com/issues.json`;
};

export const getHackmdData = async () => {
  const key = 'hackmd';
  if (cache[key]) return cache[key];

  const dataUrl = `https://awesome-g0v-projects-${env}-data.s3.amazonaws.com/hackmd.json`;

  const res = await fetch(dataUrl);
  const output = await res.json();

  cache[key] = output;

  return output;
};

export const getHackmdDataByTag = async (inRepos) => {
  const key = 'hackmd-byTag';
  if (cache[key]) return cache[key];

  const hackmdData = await getHackmdData();

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

  const repos = inRepos || await getRepos();

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
    }).sort((a, b) => a.recentLastChangedAt > b.recentLastChangedAt ? -1 : 1);

  cache[key] = output;

  return output;
};

export const getGithubData = async () => {
  const key = 'github';
  if (cache[key]) return cache[key];

  const dataUrl = getGithubDataUrl();
  const res = await fetch(dataUrl);
  const output = await res.json();

  cache[key] = output;

  return output;
};

export const getOrganizations = async () => {
  const { data } = await getGithubData();
  return data
    .filter((x) => x.githubInfo.type === 'Organization')
    .sort((a, b) => a.name > b.name ? 1 : -1);
};

export const getRepos = async () => {
  const { data } = await getGithubData();
  const repos = data
    .reduce((items, project) => [...items, ...project.repos], [])
    // Ignore fork projects
    .filter((x) => !x.fork)
    .sort((a, b) => a.pushed_at < b.pushed_at ? 1 : -1)
    .map((item) => {
      item.languages = Object.keys(item.languages).map((key) => key);
      return item;
    });

  // link
  await getHackmdDataByTag(repos);

  return repos;
};

export const getProjects = async () => {
  const repos = await getRepos();

  return repos
    .filter((x) => x.g0vJsonUrl)
    .map((item) => {
      item.g0vJson.name_zh = item.g0vJson.name_zh || item.g0vJson.name;
      item.g0vJson.description_zh = item.g0vJson.description_zh || item.g0vJson.description;
      return item;
    });
};

export const getProposalsDataUrl = () => {
  return 'https://sheets.googleapis.com/v4/spreadsheets/1C9-g1pvkfqBJbfkjPB0gvfBbBxVlWYJj6tTVwaI5_x8/values/%E5%A4%A7%E6%9D%BE%E6%8F%90%E6%A1%88%E5%88%97%E8%A1%A8!A1:W10000?key=AIzaSyBhiqVypmyLHYPmqZYtvdSvxEopcLZBdYU'; // eslint-disable-line
};

export const getProposalEvents = async () => {
  const url = getProposalsDataUrl();
  const res = await fetch(url);
  const { values } = await res.json();

  const headers = values.shift().map((x) => x.replace(/ /g, '_'));
  const events = {};

  values.forEach((row) => {
    const rowData = headers.reduce((obj, header, index) => {
      row[index] = row[index] || '';
      if (['manpower', 'three_brief', 'tags', 'license_data'].includes(header)) {
        obj[header] = row[index]
          .replace(/[.,、，；\\/](\s+)?/g, ',')
          .split(',');
      } else {
        obj[header] = row[index];
      }
      return obj;
    }, {});
    events[rowData.term] = events[rowData.term] || {
      term: rowData.term,
      date: rowData.date,
      event_name: rowData.event_name,
      dummy_event_type: rowData.dummy_event_type,
      proposals: [],
    };
    events[rowData.term].proposals.push(rowData);
  });

  return Object.keys(events).reverse().map((key) => events[key]);
};

export const getGitHubIssues = async () => {
  const url = getGithubIssuesUrl();
  const res = await fetch(url);
  const { items } = await res.json();

  return items;
};
