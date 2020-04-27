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
        // padding: '0px 8px 0px 8px',
      },
    },
    MUIDataTable: {
      paper: {
        padding: 0,
      },
      responsiveScrollMaxHeight: {
        maxHeight: 'calc(100vh - 170px) !important',
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
    MUIDataTableSelectCell: {
      expandDisabled: {
        // Soft hide the button.
        visibility: 'hidden',
      },
    },
    MUIDataTableFilter: {
      root: {
        minWidth: 400,
      },
    },
  },
});

function Table({ title, data, columns, options, nested = false }) {
  const onItemClick = (rowData, rowMeta) => {
    const item = data[rowMeta.dataIndex];
    console.log(item);
  };

  // overwrite options
  const updatedOptions = Object.assign({
    pagination: true,
    responsive: nested ? 'stacked' : 'scrollMaxHeight',
    rowsPerPageOptions: nested ? [10, 50, 100, 1000] : [50, 100, 500, 1000],
    rowsPerPage: nested ? 10 : 50,
    filterType: 'multiselect',
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
  nested: PropTypes.bool,
};

export default Table;
