import React, { useEffect, useState } from 'react';
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
    </Link>)
}

export default TextLink;
