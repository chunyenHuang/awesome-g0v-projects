import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './i18n';

import Header from './components/Header';
import routes from './routes';

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

  return (
    <div className={classes.main}>
      <Router basename={`${process.env.PUBLIC_URL}`}>
        <React.Suspense fallback={<CircularProgress className={classes.spinner} />}>
          <Header />
          <div className={classes.container}>
            {routes.map((route, index) => (
              <Route path={route.path} exact key={index}>
                <route.component />
              </Route>
            ))}
          </div>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
