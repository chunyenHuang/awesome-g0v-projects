import React, { useEffect, useState } from 'react';
import Link from 'react-router-dom/Link';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

import LanguageSelector from './LanguageSelector';
import VisitButton from './VisitButton';
import GithubLinkButton from './GithubLinkButton';
import routes from '../routes';
import { getGithubDataUrl, getGithubData } from '../data';

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(1),
  },
  space: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

function Header() {
  const classes = useStyles();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdatedAt, setLastUpdatedAt] = useState('');

  useEffect(() => {
    setTimeout(async () => {
      const { updatedAt } = await getGithubData();
      setLastUpdatedAt(updatedAt);
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <AppBar position="fixed" color="default">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          {t('app.name')}
        </Typography>
        {routes.map(({ title, path }) => (
          <Button to={path} key={title} component={Link}>
            {t(title)}
          </Button>
        ))}

        <div className={classes.space}></div>

        {isLoading && <CircularProgress size={20} color="inherit" className={classes.button} />}

        {lastUpdatedAt &&
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {t('app.updatedAt')} {moment(lastUpdatedAt).fromNow()}
          </Typography>}
        <VisitButton
          className={classes.button}
          url={getGithubDataUrl()}
          title={'Download JSON'}
          icon={<CloudDownloadIcon />}
        />
        <GithubLinkButton
          className={classes.button}
          url='chunyenHuang/awesome-g0v-projects'
        />
        <LanguageSelector />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {};

export default Header;
