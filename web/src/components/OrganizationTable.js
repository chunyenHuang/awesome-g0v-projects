import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Table from './Table';
import RepoTable from './RepoTable';
import GithubLinkButton from './GithubLinkButton';
import NestedTableContainer from './table/NestedTableContainer';
import CellImage from './table/CellImage';
import { getOrganizations } from '../data';
import { sortByKey } from '../utils';
// const useStyles = makeStyles((theme) => ({}));

function OrganizationTable({ data: inData }) {
  // const classes = useStyles();
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const title = t('table.organization.title');
  const description = 'Data Source: GitHub';

  const columns = [{
    name: 'githubInfo.type',
    label: t('table.organization.type'),
    options: {
      filter: false,
      sort: true,
      display: false,
    },
  }, {
    name: 'githubInfo.avatar_url',
    label: t('table.organization.avatar'),
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => <CellImage value={value} />,
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
      customBodyRender: (value) => <GithubLinkButton url={value} />,
    },
  }];

  const options = {
    expandableRows: true,
    renderExpandableRow(rowData, rowMeta) {
      const item = data[rowMeta.dataIndex];
      const repos = item.repos
        .sort(sortByKey('pushed_at', true));
      return (
        <NestedTableContainer columns={columns}>
          <RepoTable data={repos} nested={true} />
        </NestedTableContainer>
      );
    },
  };


  useEffect(() => {
    if (inData) {
      setData(inData);
    } else {
      (async () => {
        setData(await getOrganizations());
      })();
    }
  }, [inData]);

  return (
    <Table
      title={title}
      description={description}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

OrganizationTable.propTypes = {
  data: PropTypes.array,
};

export default OrganizationTable;
