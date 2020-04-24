import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import ErrorIcon from '@material-ui/icons/Error';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { green } from '@material-ui/core/colors';

import VisitButton from './VisitButton';
import TextLink from './TextLink';

function RepoTable({ data = [] }) {
  const title = 'Repos';

  console.log(data);

  const columns = [{
    name: 'archived',
    label: 'Status',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => value ? <ErrorIcon color="secondary" /> : <WbSunnyIcon style={{ color: green[500] }} />,
    },
  }, {
    name: 'owner.login',
    label: 'Org',
    options: {
      filter: true,
      sort: true,
      customBodyRender(value) {
        return (
          <TextLink title={value} url={`https://github.com/${value}`} />)
      }
    },
  }, {
    name: 'name',
    label: 'Name',
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'description',
    label: 'Description',
    options: {
      filter: false,
      sort: false,
    },
  }, {
    name: 'languagePrimary',
    label: 'Language #1',
    options: {
      filter: true,
      sort: true,
    },
  }, {
    name: 'languageSecondary',
    label: 'Language #2',
    options: {
      filter: true,
      sort: true,
    },
  }, {
    name: 'languages',
    label: 'All Languages',
    options: {
      filter: false,
      sort: false,
      display: false,
      customBodyRender: (value) => {
        return (
          <ul>
            {Object.keys(value).map((key, index)=> <li key={index}>{key}</li>)}
          </ul>
        )
      }
    },
  }, {
    name: 'open_issues',
    label: 'Issues',
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'contributors.length',
    label: 'Contributors',
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'created_at',
    label: 'Created At',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD')
    },
  }, {
    name: 'pushed_at',
    label: 'Last Push At',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD')
    },
  }, {
    name: 'license.spdx_id',
    label: 'License',
    options: {
      display: false,
      filter: true,
      sort: true,
    },
  }, {
    name: 'html_url',
    label: 'Visit',
    options: {
      filter: false,
      customBodyRender(value) {
        return (
          <VisitButton url={value} />)
      }
    },
  }];

  const options = {
    fixedHeader: true,
    selectableRows: 'none',
    filterType: 'checkbox',
    pagination: true,
    rowsPerPageOptions: [10, 100, 500, 1000],
    rowsPerPage: 10,
    expandableRows: false,
  };

  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default RepoTable;
