import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  HashRouter as Router,
  Route,
  // Switch,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import './i18n';

// import Header from './components/Header';
import routes from './routes';
import { load } from './data';
import Sidebar from './components/Sidebar';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
  },
  spinner: {
    position: 'absolute',
    top: 150,
    left: 'calc(50% - 20px)',
  },
  container: {
    // padding: theme.spacing(2),
    // paddingTop: 55,
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [updatedAt, setUpdatedAt] = useState(undefined);

  useEffect(() => {
    (async () => {
      const lastUpdatedAt = await load();
      setUpdatedAt(lastUpdatedAt);
    })();
  }, []);

  return (
    <div className={classes.main}>
      <Router basename={process.env.PUBLIC_URL}>
        <React.Suspense fallback={<CircularProgress className={classes.spinner} />}>
          <CssBaseline />

          {/* <Header updatedAt={updatedAt} /> */}
          <Sidebar updatedAt={updatedAt} />

          {!updatedAt && <CircularProgress className={classes.spinner} />}

          {updatedAt &&
            <main className={classes.container}>
              {/* <Switch> */}
              {routes.map((route, index) => (
                <React.Fragment key={index}>
                  {route.paths.map((path)=>(
                    <Route path={path} exact key={path}>
                      <route.component />
                    </Route>
                  ))}
                </React.Fragment>
              ))}
              {/* </Switch> */}
            </main>}
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
