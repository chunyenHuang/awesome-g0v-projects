import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';

import VisitButton from './VisitButton';

function RepoTable({ repos = [] }) {
  const title = 'Repos';

  const columns = [{
    name: 'archived',
    label: 'Archived',
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => `${value ? 'Yes' : '-'}`
    },
  }, {
    name: 'disabled',
    label: 'Disabled',
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => `${value ? 'Yes' : '-'}`
    },
  }, {
    name: 'name',
    label: 'name',
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
    name: 'language',
    label: 'Language',
    options: {
      filter: true,
      sort: true,
    },
  }, {
    name: 'open_issues',
    label: 'Issues',
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'pushed_at',
    label: 'Last Push At',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => new Date(value).toLocaleDateString()
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
      data={repos}
      columns={columns}
      options={options}
    />
  );
}

export default RepoTable;
