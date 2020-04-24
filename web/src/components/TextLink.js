import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';

function TextLink({ url, title = 'link' }) {
  return (
    <Link
      variant="body2"
      color="primary"
      target="_blank"
      href={url}
    >
      {title}
    </Link>);
}

TextLink.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default TextLink;
