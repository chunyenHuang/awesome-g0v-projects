import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

function VisitButton({ url, title = 'Visit', tooltip, icon, className }) {
  const isDisabled = (!url || url === '' || !url.startsWith('http'));
  const size = 'small';

  const tooltipTitle = tooltip || (isDisabled ? '' : title);

  if (icon) {
    return (
      <Tooltip title={tooltipTitle}>
        <span>
          <IconButton
            className={className}
            disabled={isDisabled}
            aria-label={title}
            // component="span"
            target="_blank"
            href={url}
            size={size}
          >
            {icon}
          </IconButton>
        </span>
      </Tooltip>);
  }
  return (
    <Button
      className={className}
      variant="outlined"
      color="primary"
      size={size}
      target="_blank"
      href={url}
      disabled={isDisabled}
    >
      {title}
    </Button>);
}

VisitButton.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  tooltip: PropTypes.string,
  icon: PropTypes.object,
  className: PropTypes.string,
};

export default VisitButton;
