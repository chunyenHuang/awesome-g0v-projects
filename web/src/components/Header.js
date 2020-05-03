import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import moment from 'moment';

import LanguageSelector from './LanguageSelector';
// import VisitButton from './VisitButton';
import routes from '../routes';
import { drawerWidth } from '../constants/themeConfig';

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
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

function Header({ updatedAt }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          {t('app.name')}
        </Typography>
        {routes.filter(({ hide })=>!hide).map(({ title, paths }) => (
          <Button to={paths[0]} key={title} component={Link}>
            {t(title)}
          </Button>
        ))}

        <div className={classes.space}></div>

        {updatedAt &&
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {t('app.updatedAt')} {moment(updatedAt).fromNow()}
          </Typography>}
        {/* <VisitButton
          className={classes.button}
          url={getProjectsDataUrl()}
          title={'Download JSON'}
          icon={<CloudDownloadIcon />}
        /> */}
        <LanguageSelector />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  updatedAt: PropTypes.string,
};

export default Header;
