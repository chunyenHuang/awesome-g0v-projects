import React from 'react';
import PropTypes from 'prop-types';

function CellParagraph({ value = '', length = 25 }) {
  return (<span>
    {`${value.substring(0, length)}${value.length > length ? '...' : ''}`}
  </span>);
}

CellParagraph.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  length: PropTypes.number,
};

export default CellParagraph;
