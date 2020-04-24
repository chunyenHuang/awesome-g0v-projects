import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ProjectTable from './components/ProjectTable';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ProjectTable />
    </div>
  );
}

export default App;
