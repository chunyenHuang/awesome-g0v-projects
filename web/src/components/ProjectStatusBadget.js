import React from 'react';
import PropTypes from 'prop-types';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ErrorIcon from '@material-ui/icons/Error';
import FaceIcon from '@material-ui/icons/Face';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { green } from '@material-ui/core/colors';

function ProjectStatusBadget({ value }) {
  if (value === 'hot') {
    return (<WbSunnyIcon style={{ color: green[500] }} />);
  } else
  if (value === 'normal') {
    return (<FaceIcon color="primary" />);
  } else
  if (value === 'low') {
    return (<ErrorIcon color="secondary" />);
  } else {
    return (<HelpOutlineIcon color="default" />);
  }
}

ProjectStatusBadget.propTypes = {
  value: PropTypes.string,
};

export default ProjectStatusBadget;
