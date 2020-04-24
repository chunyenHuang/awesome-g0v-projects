import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function VisitButton({ url, title = 'Visit' }) {
  return (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      target="_blank"
      href={url}
    >
      {title}
    </Button>);
}

VisitButton.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default VisitButton;
