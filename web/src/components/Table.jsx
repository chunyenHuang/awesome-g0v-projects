import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const cellStyle = {
  maxWidth: 150,
  minWidth: 32,
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  padding: '4px 4px 4px 8px',
  cursor: 'pointer',
  fontSize: 12,
};

const theme = createMuiTheme({
  overrides: {
    MUIDataTableToolbar: {
      root: {
        padding: '0px 8px 0px 8px',
      },
    },
    MUIDataTable: {
      paper: {
        padding: '0px 8px 0px 8px',
      },
    },
    MUIDataTableHeadCell: {
      root: {
        ...cellStyle,
        fontWeight: 'bold',
      },
    },
    MUIDataTableBodyCell: {
      root: cellStyle,
    },
  },
});

function Table({ title, data, columns, options }) {
  const onItemClick = (rowData, rowMeta) => {
    const item = data[rowMeta.dataIndex];
    console.log(item);
  };

  // overwrite options
  const updatedOptions = Object.assign({
    pagination: true,
    rowsPerPageOptions: [10, 50, 100, 500, 1000],
    rowsPerPage: 10,
    filterType: 'checkbox',
    responsive: 'stacked',
    fixedHeader: true,
    resizableColumns: false,
    selectableRows: 'none',
    isRowSelectable: () => false,
    onRowClick: onItemClick,
    print: true,
  }, options);

  return (
    <MuiThemeProvider theme={theme}>
      <MUIDataTable
        className="data-table"
        title={title}
        data={data}
        columns={columns}
        options={updatedOptions}
      />
    </MuiThemeProvider>
  );
}

Table.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  options: PropTypes.object,
};

export default Table;
