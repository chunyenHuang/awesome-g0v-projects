import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { getLogs } from '../data';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  logContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    height: 400,
    overflow: 'auto',
  },
}));

function Info() {
  const classes = useStyles();

  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await getLogs();
      setLogs(data);
    })();
  }, []);

  return (
    <div className={classes.container}>
      <Paper className={classes.container}>
        <pre style={{ fontSize: 10, margin: 16 }}>
          <h3>Server logs</h3>
          {showLogs &&
            <div className={classes.logContainer}>
              {logs.map((i, index)=>(
                <div key={index}>{JSON.stringify(i)}</div>
              ))}
            </div>}
          <Button
            onClick={()=>setShowLogs(!showLogs)}
            variant="outlined"
          >
            {showLogs ? 'Hide' : 'Show'} Logs
          </Button>
        </pre>
      </Paper>
    </div>);
}

export default Info;
