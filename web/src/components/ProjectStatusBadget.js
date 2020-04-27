import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  badget: {
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
}));

function ProjectStatusBadget({ value }) {
  const classes = useStyles();

  if (!value) return null;

  const color = 'textPrimary';

  return (
    <div className={classes.badget}>
      <Typography color={color} variant="inherit">
        {value.toLowerCase()}
      </Typography>
    </div>);
}

ProjectStatusBadget.propTypes = {
  value: PropTypes.string,
};

export default ProjectStatusBadget;
