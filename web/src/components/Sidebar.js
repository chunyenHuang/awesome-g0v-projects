import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Link from 'react-router-dom/Link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

import { drawerWidth, appBarMinHeight } from '../constants/themeConfig';
import routes from '../routes';
import GithubLinkButton from './GithubLinkButton';
import LanguageSelector from './LanguageSelector';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: {
    minHeight: appBarMinHeight,
  },
  logo: {
    width: 'auto',
    height: appBarMinHeight,
  },
  flexBox: {
    flex: 1,
  },
  bottomIconContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const menu = routes.filter(({ hide }) => !hide);

export default function Sidebar({ updatedAt }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const index = menu.findIndex(({ paths }) => window.location.hash === `#${paths[0]}`);
    console.log(index);
    setSelectedIndex(index);
  }, []);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Grid container className={classes.toolbar} align="center" justify="center">
        <img
          src="https://raw.githubusercontent.com/g0v/style-guide/gh-pages/logo/png/g0v-s.png"
          alt="logo"
          className={classes.logo}
        />
      </Grid>
      <Divider />
      <List>
        {menu.map(({ title, paths }, index) => (
          <ListItem
            button
            key={title}
            to={paths[0]}
            component={Link}
            onClick={() => setSelectedIndex(index)}
            selected={index === selectedIndex}
            classes={classes.listItemContainer}
          >
            <ListItemText primary={t(title)} />
          </ListItem>
        ))}
      </List>
      <div className={classes.flexBox} />
      {updatedAt &&
        <div className={classes.bottomIconContainer}>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {t('app.updatedAt')} <br/>
            {moment(updatedAt).fromNow(true)} {t('text.ago')}
          </Typography>
        </div>
      }
      <Grid className={classes.bottomIconContainer}>
        <IconButton
          className={classes.button}
          to={'/info'}
          size="small"
          component={Link}
        >
          <HelpOutlineIcon />
        </IconButton>
        <GithubLinkButton
          className={classes.button}
          url='chunyenHuang/awesome-g0v-projects'
        />
      </Grid>
      <LanguageSelector />
    </Drawer>);
}

Sidebar.propTypes = {
  updatedAt: PropTypes.string,
};
