import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import TextLink from '../TextLink';

const useStyles = makeStyles((theme) => ({
  list: {
    paddingInlineStart: '20px',
  },
}));


function CellList({ value = [], targetKey }) {
  const classes = useStyles();
  const showLast = 3;

  if (typeof value === 'string') {
    return (
      <span>
        {value.startsWith('http') ? <TextLink url={value} title={value} /> : value}
      </span>);
  }

  const list = Array.isArray(value) ? value : Object.keys(value);
  return (
    <ul className={classes.list}>
      {list
        .filter((i, index) => index < showLast)
        .map((item, index) => {
          let data = item;
          if (typeof item === 'object') {
            if (targetKey && item[targetKey]) {
              data = item[targetKey];
            } else {
              data = JSON.stringify(item);
            }
          }
          return (
            <li key={index}>
              {data.startsWith('http') ? <TextLink url={data} title={data} /> : data}
            </li>
          );
        })}
    </ul>);
}

CellList.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  targetKey: PropTypes.string,
};

export default CellList;
