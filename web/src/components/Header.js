import React from 'react';
import Link from 'react-router-dom/Link';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import moment from 'moment';

import LanguageSelector from './LanguageSelector';
import VisitButton from './VisitButton';

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

const env = window.location.hostname.includes('-prd-') ? 'prd' : 'dev';
const dataUrl = `https://awesome-g0v-projects-${env}-data.s3.amazonaws.com/data.json`;

function Header({ lastUpdatedAt }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const routes = [{
    title: t('header.findProjects'),
    path: '/',
  }, {
    title: t('header.findOrganizations'),
    path: '/organizations',
  }, {
    title: t('header.findRepositories'),
    path: '/repositories',
  }];

  return (
    <AppBar position="fixed" color="default">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          {t('app.name')}
        </Typography>
        {routes.map(({ title, path }) => (
          <Button to={path} key={title} component={Link}>
            {title}
          </Button>
        ))}

        <div className={classes.space}></div>

        {lastUpdatedAt &&
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {t('app.updatedAt')} {moment(lastUpdatedAt).fromNow()}
          </Typography>}
        <VisitButton
          className={classes.button}
          url={dataUrl}
          title={'Download JSON'}
          icon={<CloudDownloadIcon />}
        />
        <VisitButton
          className={classes.button}
          url={'https://github.com/chunyenHuang/awesome-g0v-projects'}
          title={'GitHub'}
          icon={<GitHubIcon />}
        />
        <LanguageSelector />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  lastUpdatedAt: PropTypes.string,
};

export default Header;
