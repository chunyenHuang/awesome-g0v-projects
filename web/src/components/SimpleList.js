import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  listContainer: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    // overflow: 'auto',
    // height: 800,
    // maxHeight: '90vh',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function SimpleList({ title, data }) {
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <ListSubheader>{title}</ListSubheader>
      <List className={classes.listContainer} >
        {data.map((item, index) => (
          <ListItem
            key={`${index}-${item}`}
          >
            <ListItemText primary={`${item}`} />
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

SimpleList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
};
