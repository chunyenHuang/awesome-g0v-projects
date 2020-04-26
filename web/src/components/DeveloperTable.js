import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';

import Table from './Table';
import VisitButton from './VisitButton';
import TextLink from './TextLink';
import NestedTableContainer from './table/NestedTableContainer';
import RepoTable from './RepoTable';

const useStyles = makeStyles((theme) => ({
  img: {
    maxHeight: 65,
    maxWidth: '100%',
  },
}));

function DeveloperTable({ repos = [], nested = false }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const title = t('table.developer.title');

  const columns = [{
    name: 'details.type',
    label: t('table.developer.type'),
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  }, {
    name: 'details.avatar_url',
    label: t('table.developer.avatar'),
    options: {
      filter: false,
      sort: false,
      customBodyRender(value) {
        return (
          <Grid container justify="center" align="center">
            {value && <img src={value} alt="-" className={classes.img}/>}
          </Grid>);
      },
    },
  }, {
    name: 'details.login',
    label: t('table.developer.githubId'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'majorRepoName',
    label: t('table.developer.majorRepoName'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => <TextLink title={value} url={`https://github.com/${value}`} />,
    },
  }, {
    name: 'majorContributions',
    label: t('table.developer.majorContributions'),
    options: {
      display: false,
      filter: false,
      sort: true,
    },
  }, {
    name: 'repos.length',
    label: t('table.developer.repos'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'averageContributions',
    label: t('table.developer.averageContributions'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'details.html_url',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender(value) {
        return (
          <VisitButton url={value} title={t('table.developer.githubPage')} icon={<GitHubIcon />}/>);
      },
    },
  }];

  const options = {
    expandableRows: true,
    renderExpandableRow(rowData, rowMeta) {
      const item = data[rowMeta.dataIndex];
      return (
        <NestedTableContainer columns={columns}>
          <RepoTable data={item.repos} nested={true} />
        </NestedTableContainer>
      );
    },
  };

  useEffect(() => {
    setData(getContributorsFromRepos(repos));
  }, [repos]);

  return (
    <Table
      title={title}
      data={data}
      columns={columns}
      options={options}
      nested={nested}
    />
  );
}

DeveloperTable.propTypes = {
  repos: PropTypes.array.isRequired,
  nested: PropTypes.bool,
};

export default DeveloperTable;


function getContributorsFromRepos(repos) {
  const list = {};

  repos.forEach((repo) => {
    const { contributors } = repo;
    contributors.forEach((contributor) => {
      const { contributions: repoContributions } = contributor;
      const key = `${contributor.type}-${contributor.login}`;
      const data = list[key] || {
        details: contributor,
        repos: [],
        majorRepoName: '',
        majorContributions: 0,
        totalContributions: 0,
        averageContributions: 0,
      };

      data.repos.push(repo);
      data.totalContributions += repoContributions;

      if (repoContributions > data.majorContributions) {
        data.majorContributions = repoContributions;
        data.majorRepoName = repo.name;
      }

      list[key] = data;
    });
  });

  return Object.keys(list)
    .map((key) => {
      const { details, totalContributions, repos } = list[key];
      list[key].averageContributions = parseInt((totalContributions / repos.length).toFixed(0));

      // overwrite the Anonymous
      if (details.type === 'Anonymous') {
        details.login = '沒有人';
        details.avatar_url = 'https://avatars1.githubusercontent.com/u/2668086?s=200&v=4';
        details.html_url = 'https://github.com/g0v';
      }

      return list[key];
    })
    .sort((a, b) => a.repos.length > b.repos.length ? -1 : 1);
}
