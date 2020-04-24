import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ProjectTable from './components/ProjectTable';
import RepoTable from './components/RepoTable';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
}));

const dataUrl = 'https://awesome-g0v-projects-data.s3.amazonaws.com/data.json';

function App() {
  const classes = useStyles();

  const [projects, setProjects] = useState([]);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(dataUrl);
      const data = await res.json();
      console.log(data);

      setProjects(data);
      setRepos(data.reduce((items, project) => [...items, ...project.repos], []))
    })();
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <ProjectTable projects={projects}/>
      </div>
      <div className={classes.container}>
        <RepoTable repos={repos}/>
      </div>
    </div>

  );
}

export default App;
