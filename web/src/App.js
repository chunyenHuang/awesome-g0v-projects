import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import './i18n';

import Header from './components/Header';
import routes from './routes';
import { load } from './data';

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
      <Router basename={'/'}>
        <React.Suspense fallback={<CircularProgress className={classes.spinner} />}>
          <Header updatedAt={updatedAt}/>
          {!updatedAt && <CircularProgress className={classes.spinner} />}
          {updatedAt &&
            <div className={classes.container}>
              <Switch>
                {routes.map((route, index) => (
                  <Route path={route.path} exact key={index}>
                    <route.component />
                  </Route>
                ))}
              </Switch>
            </div>}
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
