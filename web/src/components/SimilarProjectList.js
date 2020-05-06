import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { getProjectsByTag } from '../data';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  listContainer: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    // overflow: 'auto',
    // height: 600,
    // maxHeight: '85vh',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function SimilarProjectList({ projectName, tags }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const [tagProjects, setTagProjects] = useState([]);

  const selectProject = (name) => {
    history.push(`/project/${encodeURIComponent(name)}/dashboard`);
  };

  useEffect(() => {
    (async () => {
      const results = await Promise.all(tags.map((tag) => {
        return getProjectsByTag(tag, [projectName]);
      }));
      setTagProjects(results);
    })();
  }, [projectName, tags]);

  return (
    <Card className={classes.container}>
      <ListSubheader>{t('project.similarProjects')}</ListSubheader>
      <List subheader={<li />} className={classes.listContainer} >
        {tags.map((tag, index) => (
          <li key={`section-${index}`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>{tag} ({(tagProjects[index]||[]).length})</ListSubheader>
              {(tagProjects[index] || []).map(({ name }) => (
                <ListItem
                  key={`${index}-${name}`}
                  button
                  onClick={()=>selectProject(name)}
                >
                  <ListItemText primary={`${name}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </Card>
  );
}

SimilarProjectList.propTypes = {
  projectName: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};
