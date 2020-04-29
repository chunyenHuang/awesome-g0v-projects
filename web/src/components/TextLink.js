import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';

function TextLink({ url, title = 'link', variant = 'body2', ...args }) {
  return (
    <Link
      variant={variant}
      color="primary"
      { ...args }
      target="_blank"
      href={url}
      style={{ fontSize: 12 }}
    >
      {title}
    </Link>);
}

TextLink.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  variant: PropTypes.string,
};

export default TextLink;
