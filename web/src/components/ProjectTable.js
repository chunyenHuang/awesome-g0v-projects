import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import {
  TableRow,
  TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import RepoTable from './RepoTable';
import VisitButton from './VisitButton';

const useStyles = makeStyles((theme) => ({
  nestedContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
}));

function ProjectTable({ projects }) {
  const classes = useStyles();
  const title = 'Projects';

  const columns = [{
    name: 'name',
    label: 'Name',
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'githubInfo.login',
    label: 'Team',
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'githubInfo.description',
    label: 'Description',
    options: {
      filter: false,
      sort: false,
    },
  }, {
    name: 'repos.length',
    label: 'Repositories',
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'githubInfo.html_url',
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
    expandableRows: true,
    pagination: true,
    rowsPerPageOptions: [10, 100, 500, 1000],
    rowsPerPage: 10,
    renderExpandableRow(rowData, rowMeta) {
      const item = projects[rowMeta.dataIndex];
      console.log(item);
      const data = item.repos.sort((a, b) => a.pushed_at > b.pushed_at ? -1 : 1);
      return (
        <TableRow>
          <TableCell colSpan={columns.length + 1} className={classes.nestedContainer}>
            <RepoTable repos={data} />
          </TableCell>
        </TableRow>
      );
    },
  };

  return (
    <MUIDataTable
      title={title}
      data={projects}
      columns={columns}
      options={options}
    />
  );
}

export default ProjectTable;
