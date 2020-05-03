import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';

import G0vJsonGallery from './G0vJsonGallery';
import SimilarProjectList from './SimilarProjectList';
import SimpleList from './SimpleList';

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(2),
    height: '100%',
    maxHeight: '100%',
    overflow: 'auto',
  },
}));

function ProjectDashboard({ project }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [g0vJsons, setG0vJsons] = useState([]);

  useEffect(() => {
    const g0vJsons = project.repos
      .filter((x) => x.g0vJsonUrl)
      .map(({ g0vJson }) => g0vJson);
    console.log(g0vJsons);
    setG0vJsons(g0vJsons);
  }, [project]);

  if (!project) {
    return 'Project does not exist';
  }

  return (
    <Grid container className={classes.main} spacing={2}>
      <Grid item md={2}>
        <SimpleList title={t('project.needs')} data={project.needs}/>
        <SimpleList title={t('project.keywords')} data={project.keywords}/>
      </Grid>
      <Grid item md={6}>
        <G0vJsonGallery g0vJsons={g0vJsons} />
      </Grid>
      <Grid item md={4}>
        <SimilarProjectList projectName={project.name} tags={project.tags} />
      </Grid>
    </Grid>
  );
}

ProjectDashboard.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectDashboard;
