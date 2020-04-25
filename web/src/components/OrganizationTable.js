import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import GitHubIcon from '@material-ui/icons/GitHub';

import Table from './Table';
import RepoTable from './RepoTable';
import VisitButton from './VisitButton';

const useStyles = makeStyles((theme) => ({
  nestedContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
}));

function OrganizationTable({ data }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const title = t('table.organization.title');

  const columns = [{
    name: 'githubInfo.type',
    label: t('table.organization.type'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'name',
    label: t('table.organization.name'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'githubInfo.login',
    label: t('table.organization.id'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'githubInfo.description',
    label: t('table.organization.description'),
    options: {
      filter: false,
      sort: false,
    },
  }, {
    name: 'repos.length',
    label: t('table.organization.repos'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'githubInfo.html_url',
    label: ' ',
    options: {
      filter: false,
      customBodyRender: (value) => <VisitButton url={value} title={t('table.organization.githubRepo')} icon={<GitHubIcon />}/>,
    },
  }];

  const options = {
    expandableRows: true,
    renderExpandableRow(rowData, rowMeta) {
      const item = data[rowMeta.dataIndex];
      const repos = item.repos.sort((a, b) => a.pushed_at > b.pushed_at ? -1 : 1);
      return (
        <TableRow>
          <TableCell colSpan={columns.length + 1} className={classes.nestedContainer}>
            <RepoTable data={repos} />
          </TableCell>
        </TableRow>
      );
    },
  };

  return (
    <Table
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

OrganizationTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default OrganizationTable;
