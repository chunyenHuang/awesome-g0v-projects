const similarity = require('similarity');
const moment = require('moment');

const isValidLink = (string) => {
  return string !== '' && string.startsWith('http');
};

const associate = (projects, repos = [], g0vDbData = [], hackmds = []) => {
  const updatedProjects = projects
    .map((item) => {
      const projectName = item.name;

      const addProjectName = (x) => {
        x.projectName = x.projectName || projectName;
        x.projectNames = x.projectNames || [];
        x.projectNames.push(projectName);
        return x;
      };

      item.g0v_db_rows = item.g0v_db_rows.split(',').filter((x) => x).map((x) => parseInt(x));
      item.github_repos = item.github_repos.split(',').filter((x) => x);
      item.owners = item.owners.split(',').filter((x) => x);
      item.tags = item.tags.split(',').filter((x) => x);

      item.proposals = g0vDbData
        .filter((x) => item.g0v_db_rows.includes(x.row))
        .map(addProjectName);

      let totalContributors = 0;
      item.repos = repos
        .filter((x) => item.github_repos.includes(x.full_name))
        .map(addProjectName)
        .map((x) => {
          totalContributors += x.contributors.length;
          return x;
        });

      item.github_contributors_count = totalContributors;

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

      const matchedHackmds = hackmds
        .filter((hackmd) => {
          const { id } = hackmd;

          const matchedUrl = urls.find(({ url }) => url.includes(id));
          if (matchedUrl) return true;

          return false;
        });
      const matchedHackmdsIds = matchedHackmds.map(({ id }) => id);
      const targetHackmdTags = matchedHackmds.reduce((tags, item) => {
        return [...tags, ...(item.tags || [])];
      }, []);

      const otherHackmds = hackmds
        .filter((hackmd) => {
          const { id, title } = hackmd;
          // dot not add the exact match again.
          if (matchedHackmdsIds.includes(id)) return false;

          // use the tags from the exact matched hackmd
          // if there is any matched tag.
          if (hackmd.tags && hackmd.tags.some((x) => targetHackmdTags.includes(x))) {
            return true;
          }

          // TODO: use partial match for tags
          if (similarity(item.name, title) >= 0.8) {
            return true;
          }

          return false;
        });

      item.hackmds = [...matchedHackmds, ...otherHackmds]
        .map(addProjectName);

      const lastHackmdUpdatedDate = (item.hackmds[0] || {}).lastchangeAt;
      item.lastHackmdUpdatedDate = lastHackmdUpdatedDate ? moment(lastHackmdUpdatedDate).toISOString() : null;

      item.lastUpdatedAt = [
        // item.lastProposedDate,
        item.lastRepoUpdatedDate,
        item.lastHackmdUpdatedDate,
      ].filter((x) => x).sort((a, b) => a > b ? -1 : 1)[0];

      // TODO: iterrate all the nested prop to get all valid url links
      item.urls = urls;

      // gather all the manpower needs
      item.needs = [];
      item.proposals.forEach(({ manpower }) => {
        manpower.forEach((i) => {
          if (i && !item.needs.includes(i)) item.needs.push(i);
        });
      });
      item.repos.filter((x) => x.g0vJsonUrl).forEach(({ g0vJson }) => {
        Array.isArray(g0vJson.needs) && g0vJson.needs.forEach((i) => {
          if (i && typeof i === 'string' && !item.needs.includes(i)) item.needs.push(i);
        });
      });

      item.needs.filter((x) => x).map((x) => x.replace(/\n\r/g, ' '));

      return item;
    });

  const addMissingProjectName = (x) => {
    x.projectName = x.projectName || null;
    x.projectNames = x.projectNames || [];
    return x;
  };

  return {
    updatedProjects,
    updatedRepos: repos.map(addMissingProjectName),
    updatedHackmds: hackmds.map(addMissingProjectName),
    updatedG0vData: g0vDbData.map(addMissingProjectName),
  };
};

module.exports = associate;
