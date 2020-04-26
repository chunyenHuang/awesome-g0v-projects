import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';

function TextLink({ url, title = 'link', ...args }) {
  return (
    <Link
      variant="body2"
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
};

export default TextLink;
