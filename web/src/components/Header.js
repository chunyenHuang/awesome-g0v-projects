import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import GitHubIcon from '@material-ui/icons/GitHub';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import moment from 'moment';

import LanguageSelector from './LanguageSelector';
import VisitButton from './VisitButton';

const useStyles = makeStyles((theme) => ({
  title: {
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

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title}
        >
          {t('app.name')}
        </Typography>
        {lastUpdatedAt &&
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {t('app.updatedAt')} {moment(lastUpdatedAt).format('YYYY-MM-DD HH:mm:ss')}
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
