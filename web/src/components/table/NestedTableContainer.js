import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles((theme) => ({
  nestedContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
}));

function NestedTableContainer({ columns = [], children }) {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell colSpan={columns.length + 1} className={classes.nestedContainer}>
        {children}
      </TableCell>
    </TableRow>);
}

NestedTableContainer.propTypes = {
  columns: PropTypes.array,
  children: PropTypes.node,
};

export default NestedTableContainer;
