import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  img: {
    maxHeight: 65,
    maxWidth: '100%',
  },
}));

function CellImage({ value = '', alt = '-' }) {
  const classes = useStyles();
  return (
    <Grid container justify="center" align="center">
      {value && <img src={value} alt={alt} className={classes.img}/>}
    </Grid>);
}

CellImage.propTypes = {
  value: PropTypes.string,
  alt: PropTypes.string,
};

export default CellImage;
