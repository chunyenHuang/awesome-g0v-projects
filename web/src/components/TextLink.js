import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import RouteLink from 'react-router-dom/Link';

function TextLink({ url, title = 'link', variant = 'body2', ...args }) {
  if (url.startsWith('/')) {
    return (
      <Link
        variant={variant}
        color="primary"
        { ...args }
        to={url}
        style={{ fontSize: 12 }}
        component={RouteLink}
      >
        {title}
      </Link>);
  }
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
