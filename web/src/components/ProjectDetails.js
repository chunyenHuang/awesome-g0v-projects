import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import CellList from './table/CellList';

const maxHeight = 480;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  listContainer: {
    maxHeight,
    overflow: 'auto',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  image: {
    maxHeight,
  },
}));

function ProjectDetails({ project = {} }) {
  const classes = useStyles();
  const { t } = useTranslation();


  return (
    <Paper className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Grid container justify="center" alignItems="center">
            <img src={project.g0vJson.thumbnail} className={classes.image} alt="thumbnail"/>
          </Grid>
        </Grid>
        <Grid item xs={8} className={classes.listContainer}>
          <List className={classes.list}>
            {Object.keys(project.g0vJson).map((key, index)=>{
              return (
                <ListItem alignItems="flex-start" divider={true} key={index}>
                  <ListItemText
                    primary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        {t(`table.project.${key}`)}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <CellList value={project.g0vJson[key]} targetKey="type" />
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Paper>);
}

ProjectDetails.propTypes = {
  project: PropTypes.object,
};

export default ProjectDetails;
