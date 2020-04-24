import React, { useEffect, useState } from 'react';
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
    </Button>)
}

export default VisitButton;
