import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './i18n';

import Header from './components/Header';
import ProjectTable from './components/ProjectTable';
import OrganizationTable from './components/OrganizationTable';
import RepoTable from './components/RepoTable';

const useStyles = makeStyles((theme) => ({
  main: {},
  spinner: {
    position: 'absolute',
    top: 150,
    left: 'calc(50% - 20px)',
  },
  container: {
    // padding: theme.spacing(2),
    paddingTop: 55,
  },
}));

const env = window.location.hostname.includes('-prd-') ? 'prd' : 'dev';
const dataUrl = `https://awesome-g0v-projects-${env}-data.s3.amazonaws.com/data.json`;

function App() {
  const classes = useStyles();

  const [lastUpdatedAt, setLastUpdatedAt] = useState();
  const [organizations, setOrganizations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(dataUrl);
      const { updatedAt, data } = await res.json();

      setLastUpdatedAt(updatedAt);
      setOrganizations(data.sort((a, b) => a.name > b.name ? 1 : -1));

      const allRepos = data
        .reduce((items, project) => [...items, ...project.repos], [])
        .sort((a, b) => a.pushed_at < b.pushed_at ? 1 : -1);

      setProjects(allRepos.filter((x) => x.g0vJsonUrl));
      setRepos(allRepos);
    })();
  }, []);

  return (
    <div className={classes.main}>
      <Router>
        <React.Suspense fallback={<CircularProgress className={classes.spinner} />}>
          <Header lastUpdatedAt={lastUpdatedAt} />
          <div className={classes.container}>
            <Route path="/" exact>
              <ProjectTable data={projects}/>
            </Route>
            <Route path="/organizations" exact>
              <OrganizationTable data={organizations}/>
            </Route>
            <Route path="/repositories" exact>
              <RepoTable data={repos}/>
            </Route>
          </div>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
