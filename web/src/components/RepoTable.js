import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ErrorIcon from '@material-ui/icons/Error';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { green } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';
import GitHubIcon from '@material-ui/icons/GitHub';
import CheckIcon from '@material-ui/icons/Check';

import Table from './Table';
import VisitButton from './VisitButton';
import TextLink from './TextLink';

function RepoTable({ data = [] }) {
  const { t } = useTranslation();

  const title = t('table.repo.title');

  const columns = [{
    name: 'archived',
    label: t('table.repo.activity'),
    options: {
      filter: false,
      sort: true,
      customBodyRender(value) {
        return value ? <ErrorIcon color="secondary" /> : <WbSunnyIcon style={{ color: green[500] }} />;
      },
    },
  }, {
    name: 'g0vJsonUrl',
    label: t('table.repo.g0vJsonProvided'),
    options: {
      filter: false,
      sort: true,
      customBodyRender(value) {
        return value ? <CheckIcon style={{ color: green[500] }} /> : '';
      },
    },
  }, {
    name: 'owner.login',
    label: t('table.repo.org'),
    options: {
      filter: true,
      sort: true,
      customBodyRender(value) {
        return (
          <TextLink title={value} url={`https://github.com/${value}`} />);
      },
    },
  }, {
    name: 'name',
    label: t('table.repo.name'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'description',
    label: t('table.repo.description'),
    options: {
      filter: false,
      sort: false,
    },
  }, {
    name: 'languagePrimary',
    label: t('table.repo.language'),
    options: {
      filter: true,
      sort: true,
    },
  }, {
    name: 'languageSecondary',
    label: t('table.repo.language2'),
    options: {
      filter: true,
      sort: true,
    },
  }, {
    name: 'languages',
    label: t('table.repo.allLanguages'),
    options: {
      filter: false,
      sort: false,
      display: false,
      customBodyRender(value) {
        return (
          <ul>
            {Object.keys(value).map((key, index)=> <li key={index}>{key}</li>)}
          </ul>
        );
      },
    },
  }, {
    name: 'open_issues',
    label: t('table.repo.issues'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'contributors.length',
    label: t('table.repo.contributors'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'created_at',
    label: t('table.repo.createdAt'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD'),
    },
  }, {
    name: 'pushed_at',
    label: t('table.repo.pushedAt'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD'),
    },
  }, {
    name: 'license.spdx_id',
    label: t('table.repo.license'),
    options: {
      display: false,
      filter: true,
      sort: true,
    },
  }, {
    name: 'html_url',
    label: ' ',
    options: {
      filter: false,
      customBodyRender: (value) => <VisitButton url={value} title={t('table.repo.githubRepo')} icon={<GitHubIcon />}/>,
    },
  }];

  const options = {};

  return (
    <Table
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

RepoTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RepoTable;
