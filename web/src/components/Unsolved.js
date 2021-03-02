import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { getProposals, getRepos, getHackmdData } from '../data';
import ProposalTable from './ProposalTable';
import RepoTable from './RepoTable';
import HackmdTable from './HackmdTable';

const maxHeight = '300px';

export default function Unsolved() {
  const [proposals, setProposals] = useState([]);
  const [repos, setRepos] = useState([]);
  const [hackmds, setHackmds] = useState([]);

  useEffect(() => {
    (async () => {
      const [
        { data: allProposals },
        { data: allRepos },
        { data: allHackmds },
      ] = await Promise.all([
        getProposals(),
        getRepos(),
        getHackmdData(),
      ]);

      setProposals(allProposals.filter((x) => !x.projectName));
      setRepos(allRepos.filter((x) => !x.projectName));
      setHackmds(allHackmds.filter((x) => !x.projectName));
    })();
  }, []);
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <ProposalTable data={proposals} nested={true} maxHeight={maxHeight}/>
      </Grid>
      <Grid item xs={12}>
        <RepoTable data={repos} nested={true} maxHeight={maxHeight}/>
      </Grid>
      <Grid item xs={12}>
        <HackmdTable data={hackmds} nested={true} maxHeight={maxHeight}/>
      </Grid>
    </Grid>);
}

Unsolved.propTypes = {};
