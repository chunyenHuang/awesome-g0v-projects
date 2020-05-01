const AWS = require('aws-sdk');
const csv = require('csvtojson');
const request = require('request');
const moment = require('moment');
const fetch = require('node-fetch');
const similarity = require('similarity');

const { getReposAndIssues } = require('./helper');
const g0vDb = require('./g0vDb');

const s3 = new AWS.S3();
const client = new AWS.SecretsManager({ region: 'us-east-1' });

const {
  S3_BUCKET_DATA,
  SECRET_NAME,
  CSV_URL,
} = process.env;

const uploadJsonData = async (filename, data) => {
  const params = {
    Bucket: S3_BUCKET_DATA,
    Key: filename,
    Body: JSON.stringify(data),
    ContentType: 'application/json',
    ACL: 'public-read',
    CacheControl: 'max-age=3600',
  };
  await s3.putObject(params).promise();
};

const getSecret = async () => {
  const data = await client.getSecretValue({ SecretId: SECRET_NAME }).promise();
  let secret;
  if ('SecretString' in data) {
    secret = data.SecretString;
  } else {
    const buff = new Buffer(data.SecretBinary, 'base64');
    secret = buff.toString('ascii');
  }
  return JSON.parse(secret);
};

exports.handler = async () => {
  const { GITHUB_API_KEY: githubApiKey } = await getSecret();

  const projectsCsvUrl = `${CSV_URL}/projects.csv`;
  const tagsCsvUrl = `${CSV_URL}/tags.csv`;
  const ownersCsvUrl = `${CSV_URL}/owners.csv`;

  const [
    projects,
    tags,
    owners,
    { url: g0vDataUrl, data: g0vDbData },
  ] = await Promise.all([
    csv().fromStream(request.get(projectsCsvUrl)),
    csv().fromStream(request.get(tagsCsvUrl)),
    csv().fromStream(request.get(ownersCsvUrl)),
    g0vDb(),
  ]);
  const { repos, issues, logs } = await getReposAndIssues(projects, githubApiKey);

  // handle hackmd
  const hackmdOverviewUrl = 'https://g0v.hackmd.io/api/overview'; // ?v=
  const res = await fetch(hackmdOverviewUrl);
  const hackmdOverviewData = await res.json();

  // associate all items to project
  const isValidLink = (string) => {
    return string !== '' && string.startsWith('http');
  };

  const updatedProjects = projects
    .map((item) => {
      item.g0v_db_rows = item.g0v_db_rows.split(',').filter((x) => x).map((x) => parseInt(x));
      item.github_repos = item.github_repos.split(',').filter((x) => x);
      item.owners = item.owners.split(',').filter((x) => x);
      item.tags = item.tags.split(',').filter((x) => x);

      item.proposals = g0vDbData.filter((x) => item.g0v_db_rows.includes(x.row));
      item.repos = repos.filter((x) => item.github_repos.includes(x.full_name));

      const lastProposedDate = (item.proposals[0] || {}).date;
      item.lastProposedDate = lastProposedDate ? moment(lastProposedDate).toISOString() : null;

      const lastRepoUpdatedDate = (item.repos[0] || {}).pushed_at;
      item.lastRepoUpdatedDate = lastRepoUpdatedDate ? moment(lastRepoUpdatedDate).toISOString() : null;

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

      const urls = [];

      const addUrl = (name, url) => {
        if (url) urls.push({ name, url });
      };

      addUrl('homepage', item.homepage);

      item.keywords = [];
      item.proposals.forEach((proposal) => {
        addUrl('guideline', proposal.guideline);
        addUrl('doc', proposal.other_document);
        addUrl('doc2', proposal.other_document2);
        addUrl('doc3', proposal.other_document3);
        addUrl('video', proposal.video_link);

        proposal.three_brief = proposal.three_brief.filter((x) => x);
        proposal.three_brief.forEach((i) => {
          if (!item.keywords.includes(i)) {
            item.keywords.push(i);
          }
        });

        proposal.tags = proposal.tags.filter((x) => x);
        proposal.tags.forEach((i) => {
          if (!item.tags.includes(i)) {
            item.tags.push(i);
          }
        });
      });

      item.repos.forEach((repo) => {
        addUrl('repo', repo.html_url);
        if (typeof repo.g0vJson === 'object') {
          addUrl('document', repo.g0vJson.document);
          addUrl('homepage', repo.g0vJson.homepage);
        }
      });

      item.hackmds = hackmdOverviewData.filter((hackmd) => {
        const { id, title } = hackmd;
        hackmd.projectId = item.row;

        const matchedUrl = urls.find(({ url }) => url.includes(id));
        if (matchedUrl) return true;

        // TODO: use partial match for tags
        if (similarity(item.name, title) >= 0.5) {
          return true;
        }

        return false;
      });
      const lastHackmdUpdatedDate = (item.hackmds[0] || {}).lastchangeAt;
      item.lastHackmdUpdatedDate = lastHackmdUpdatedDate ? moment(lastHackmdUpdatedDate).toISOString() : null;

      item.lastUpdatedAt = [
        // item.lastProposedDate,
        item.lastRepoUpdatedDate,
        item.lastHackmdUpdatedDate,
      ].filter((x) => x).sort((a, b) => a > b ? -1 : 1)[0];

      item.urls = urls;

      return item;
    });

  const updatedAt = moment().toISOString();

  await Promise.all([
    uploadJsonData('projects.json', {
      updatedAt,
      source: projectsCsvUrl,
      data: updatedProjects,
    }),
    uploadJsonData('tags.json', {
      updatedAt,
      source: tagsCsvUrl,
      data: tags,
    }),
    uploadJsonData('owners.json', {
      updatedAt,
      source: ownersCsvUrl,
      data: owners,
    }),
    uploadJsonData('repos.json', {
      updatedAt,
      source: `GitHub`,
      data: repos,
    }),
    uploadJsonData('issues.json', {
      updatedAt,
      source: `GitHub`,
      data: issues,
    }),
    uploadJsonData('logs.json', {
      updatedAt,
      source: 'Server',
      data: logs,
    }),
    uploadJsonData('g0vDbData.json', {
      updatedAt,
      source: g0vDataUrl.split('?')[0],
      data: g0vDbData,
    }),
    uploadJsonData('hackmd.json', {
      updatedAt,
      source: hackmdOverviewUrl,
      data: hackmdOverviewData,
    }),
  ]);

  return 'ok';
};
