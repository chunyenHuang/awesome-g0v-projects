import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import VisitButton from './VisitButton';

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(2),
    height: '100%',
    maxHeight: '100%',
    overflow: 'auto',
  },
  card: {
    maxWidth: 300,
    margin: theme.spacing(1),
  },
  cardMedia: {
    height: 300,
  },
}));

const defaultImageUrl = 'https://raw.githubusercontent.com/g0v/style-guide/gh-pages/logo/png/double-line/g0v-2line-transparent-s.png';

export default function G0vJsonGallery({ g0vJsons = [] }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      {g0vJsons.length === 0 &&
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            alt={t('project.noG0vJson')}
            image={defaultImageUrl}
            title={t('project.noG0vJson')}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {t('project.noG0vJson')}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {t('project.noG0vJsonDescription')}
            </Typography>
          </CardContent>
        </Card>}

      {g0vJsons.map((g0vJson, index) => (
        <Card className={classes.card} key={index}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            alt={g0vJson.name_zh || g0vJson.name}
            image={g0vJson.thumbnail || defaultImageUrl}
            title={g0vJson.name_zh || g0vJson.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {g0vJson.name_zh || g0vJson.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {g0vJson.description_zh || g0vJson.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" disabled>
              {g0vJson.status}
            </Button>
            <VisitButton url={g0vJson.homepage} title={t('g0vJson.homepage')} variant="text" />
            <VisitButton url={g0vJson.repository} title={t('g0vJson.repo')} variant="text" />
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
}

G0vJsonGallery.propTypes = {
  g0vJsons: PropTypes.array.isRequired,
};
