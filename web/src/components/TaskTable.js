import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Table from './Table';
import GithubLinkButton from './GithubLinkButton';
import { getGitHubIssuesByRepos, getRepos } from '../data';
import CellList from './table/CellList';
import CellParagraph from './table/CellParagraph';
import CellImage from './table/CellImage';
import TextLink from './TextLink';
import NestedTableContainer from './table/NestedTableContainer';
import RepoTable from './RepoTable';

const useStyles = makeStyles((theme) => ({
  bodyContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function TaskTable({ repos: inRepos, nested = false, maxHeight }) {
  const classes = useStyles();

  const { t } = useTranslation();
  const [repos, setRepos] = useState([]);
  const [data, setData] = useState([]);

  const title = t('table.task.listTitle');
  const description = `Data Source: GitHub`;

  const columns = [{
    name: 'source',
    label: t('table.task.source'),
    options: {
      filter: true,
      sort: true,
    },
  }, {
    name: 'repository_url',
    label: t('table.task.githubRepo'),
    options: {
      filter: false,
      sort: true,
      customBodyRender(value) {
        const name = value.replace('https://api.github.com/repos/', '');
        return (
          <TextLink title={name} url={`https://github.com/${name}`} />);
      },
    },
  }, {
    name: 'title',
    label: t('table.task.title'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'body',
    label: t('table.task.description'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => <CellParagraph value={value} length={50} />,
    },
  }, {
    name: 'labels',
    label: t('table.task.labels'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => <CellList value={value} targetKey="name" />,
    },
  }, {
    name: 'user.avatar_url',
    label: t('table.task.avatar'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => <CellImage value={value} />,
    },
  }, {
    name: 'user.login',
    label: t('table.task.author'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'author_association',
    label: t('table.task.authorAssociation'),
    options: {
      filter: true,
      sort: true,
    },
  }, {
    name: 'comments',
    label: t('table.task.comments'),
    options: {
      display: false,
      filter: false,
      sort: true,
    },
  }, {
    name: 'created_at',
    label: t('table.task.createdAt'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD'),
    },
  }, {
    name: 'html_url',
    label: ' ',
    options: {
      filter: false,
      customBodyRender: (value) => <GithubLinkButton url={value} />,
    },
  }];

  const options = {
    expandableRows: true,
    renderExpandableRow(rowData, rowMeta) {
      const item = data[rowMeta.dataIndex];
      const repo = repos.find((x) => x.html_url === item.repository_url.replace('https://api.github.com/repos/', 'https://github.com/'));
      return (
        <NestedTableContainer columns={columns}>
          <Paper className={classes.bodyContainer}>
            <ReactMarkdown source={item.body} />
          </Paper>
          <RepoTable data={[repo]} nested={true} />
        </NestedTableContainer>
      );
    },
  };

  useEffect(() => {
    (async () => {
      const githubIssues = await getGitHubIssuesByRepos(repos);
      setData(githubIssues);
    })();
  }, [repos]);

  useEffect(() => {
    (async () => {
      if (inRepos) {
        setRepos(inRepos);
      } else {
        const { data: repos } = await getRepos();
        setRepos(repos);
      }
    })();
  }, [inRepos]);

  return (
    <Table
      title={title}
      description={description}
      data={data}s
      columns={columns}
      options={options}
      nested={nested}
      maxHeight={maxHeight}
    />
  );
}

TaskTable.propTypes = {
  repos: PropTypes.array,
  nested: PropTypes.bool,
  maxHeight: PropTypes.string,
};

export default TaskTable;
