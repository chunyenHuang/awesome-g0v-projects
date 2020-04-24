import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import OrganizationTable from './components/OrganizationTable';
import RepoTable from './components/RepoTable';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
}));

console.log(window.location);
const env = window.location.hostname.includes('-prd-') ? 'prd' : 'dev';
const dataUrl = `https://awesome-g0v-projects-${env}-data.s3.amazonaws.com/data.json`;

function App() {
  const classes = useStyles();

  const [organizations, setOrganizations] = useState([]);
  // const [projects, setProjects] = useState([]);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(dataUrl);
      const data = await res.json();
      console.log(data);

      setOrganizations(data);
      setRepos(data.reduce((items, project) => [...items, ...project.repos], []));
    })();
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <OrganizationTable data={organizations}/>
      </div>
      <div className={classes.container}>
        <RepoTable data={repos}/>
      </div>
    </div>

  );
}

export default App;
