import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import './i18n';

import Header from './components/Header';
import ProjectTable from './components/ProjectTable';
import OrganizationTable from './components/OrganizationTable';
import RepoTable from './components/RepoTable';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
}));

const env = window.location.hostname.includes('-prd-') ? 'prd' : 'dev';
const dataUrl = `https://awesome-g0v-projects-${env}-data.s3.amazonaws.com/data.json`;

function App() {
  const classes = useStyles();

  const [organizations, setOrganizations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(dataUrl);
      const data = await res.json();

      setOrganizations(data);

      const allRepos = data.reduce((items, project) => [...items, ...project.repos], []);
      setProjects(allRepos.filter((x) => x.g0vJson));
      setRepos(allRepos);
    })();
  }, []);

  return (
    <React.Suspense fallback={<CircularProgress />}>
      <Header />
      <div className={classes.container}>
        <ProjectTable data={projects}/>
      </div>
      <div className={classes.container}>
        <OrganizationTable data={organizations}/>
      </div>
      <div className={classes.container}>
        <RepoTable data={repos}/>
      </div>
    </React.Suspense>
  );
}

export default App;
