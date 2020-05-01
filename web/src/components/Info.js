import React, { useEffect, useState } from 'react';

import { getLogs } from '../data';

function Info() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await getLogs();
      setLogs(data);
    })();
  }, []);
  return (
    <div>
      <pre style={{ fontSize: 10, margin: 16 }}>
        <h3>Server logs</h3>
        {logs.map((i, index)=>(
          <div key={index}>{JSON.stringify(i)}</div>
        ))}
      </pre>
    </div>);
}

export default Info;
