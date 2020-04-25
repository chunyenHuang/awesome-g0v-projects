import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import GitHubIcon from '@material-ui/icons/GitHub';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import LanguageSelector from './LanguageSelector';
import VisitButton from './VisitButton';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

const env = window.location.hostname.includes('-prd-') ? 'prd' : 'dev';
const dataUrl = `https://awesome-g0v-projects-${env}-data.s3.amazonaws.com/data.json`;

function Header() {
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

export default Header;
