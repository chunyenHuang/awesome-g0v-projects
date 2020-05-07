import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import YouTube from 'react-youtube';
import Carousel from 'react-material-ui-carousel';

import VisitButton from './VisitButton';

const useStyles = makeStyles((theme) => ({
  main: {
    marginBottom: theme.spacing(2),
  },
  carousel: {
    width: '100%',
  },
  card: {
    maxWidth: '100%',
    margin: theme.spacing(1),
  },
  cardMedia: {
    height: 300,
  },
  actionContainer: {
    padding: theme.spacing(2),
  },
  space: {
    flex: 1,
  },
}));

export default function ProposalGallery({ proposals = [] }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction="row"
      justify="strech"
      alignItems="stretch"
      spacing={2}
      className={classes.main}
    >
      <Carousel
        autoPlay={false}
        className={classes.carousel}
      >
        {proposals.map((proposal, index) => (
          <Card className={classes.card} key={index}>
            <YouTube
              videoId={youtubeUrlParser(proposal.video_link)}
              opts={{ width: '100%' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {proposal.project}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {proposal.date} {proposal.event_name}
              </Typography>
            </CardContent>
            <CardActions className={classes.actionContainer}>
              <VisitButton url={proposal.guideline} title={t('project.guideline')} variant="text" />
              <div className={classes.space} />
              <Typography variant="body2" color="textSecondary" component="p">
                {proposal.three_brief.join(',')}
              </Typography>
            </CardActions>
          </Card>
        ))}
      </Carousel>
    </Grid>
  );
}

ProposalGallery.propTypes = {
  proposals: PropTypes.array.isRequired,
};

function youtubeUrlParser(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}
