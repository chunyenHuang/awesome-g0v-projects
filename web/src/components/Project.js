import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams, Link, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import moment from 'moment';

import { getProject } from '../data';
import RepoTable from './RepoTable';
import ProposalTable from './ProposalTable';
import LinkTable from './LinkTable';
import HackmdTable from './HackmdTable';
import { drawerWidth, appBarMinHeight } from '../constants/themeConfig';
import DeveloperTable from './DeveloperTable';
import ProjectDashboard from './ProjectDashboard';
import TaskTable from './TaskTable';

const useStyles = makeStyles((theme) => ({
  main: {
    height: '100vh',
    overflow: 'hidden',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    minHeight: appBarMinHeight,
  },
  title: {
    marginRight: theme.spacing(2),
    cursor: 'pointer',
  },
  space: {
    flex: 1,
  },
  spinner: {
    position: 'absolute',
    top: 150,
    left: 'calc(50% - 20px)',
  },
  container: {
    paddingTop: appBarMinHeight + 2,
    height: '100%',
    // marginBottom: theme.spacing(2),
    // padding: theme.spacing(2),
    // height: 400,
    // maxHeight: 'calc(100% - 150px)',
  },
  selected: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
}));

function Project({ project: inProject }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { name } = useParams();
  const encodedProjectName = name;
  const projectName = decodeURIComponent(name);
  console.log(projectName);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [project, setProject] = useState(undefined);

  const tableMaxHeight = `calc(100vh - 170px)`;

  console.log(project);

  const getMenu = () => {
    if (!project) return [];

    return [{
      path: 'dashboard',
      title: t('project.dashboard'),
      render: () => <ProjectDashboard project={project} />,
    }, {
      path: 'proposals',
      title: t('project.proposals') + ` (${project ? project.g0v_db_rows.length : 0})`,
      render: () => <ProposalTable data={project.proposals} hideFields={['event_name', 'dummy_event_type']} maxHeight={tableMaxHeight} />,
    }, {
      path: 'repos',
      title: t('project.repos') + ` (${project ? project.github_repos.length : 0})`,
      render: () => <RepoTable data={project.repos} maxHeight={tableMaxHeight} />,
    }, {
      path: 'tasks',
      title: t('project.recentTasks'),
      render: () => <TaskTable repos={project.repos} maxHeight={tableMaxHeight} />,
    }, {
      path: 'cowritings',
      title: t('project.cowritings') + ` (${project? project.hackmds.length : 0})`,
      render: () => <HackmdTable data={project.hackmds} maxHeight={tableMaxHeight} />,
    }, {
      path: 'links',
      title: t('project.links') + ` (${project?project.urls.length : 0})`,
      render: () => <LinkTable data={project.urls} maxHeight={tableMaxHeight} />,
    }, {
      path: 'developers',
      title: t('project.developers') + ` (${project?project.github_contributors_count:0})`,
      render: () => <DeveloperTable repos={project.repos} maxHeight={tableMaxHeight} />,
    }].map((item) => {
      item.path = `/project/${encodedProjectName}/${item.path}`;
      return item;
    });
  };

  const menu = getMenu();

  useEffect(() => {
    if (history.location.pathname.split('/').length === 3) {
      history.push(`/project/${encodedProjectName}/dashboard`);
    } else {
      const index = menu.findIndex(({ path }) => path === history.location.pathname);
      setSelectedIndex(index);
    }
  }, [history, encodedProjectName, menu]);

  useEffect(() => {
    (async () => {
      if (projectName) {
        setIsLoading(true);
        const proj = await getProject(projectName);
        console.log(proj);
        proj && setProject(proj);
        setIsLoading(false);
      } else
      if (inProject) {
        setProject(inProject);
      }
    })();
  }, [inProject, projectName]);

  if (isLoading || !project) {
    return (<CircularProgress className={classes.spinner} />);
  }

  return (
    <div className={classes.main}>
      <AppBar position="fixed" color="default" elevation={1} className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title} onClick={()=> history.push(`/project/${encodedProjectName}/dashboard`)}>
            {project.name}
          </Typography>
          {menu.map(({ title, path }, index) => (
            <Button
              key={title}
              to={path}
              component={Link}
              className={selectedIndex === index ? classes.selected : ''}
              onClick={()=> setSelectedIndex(index)}
            >
              {title}
            </Button>
          ))}
          <div className={classes.space}></div>
          {/* <span>
            {t('project.lastUpdatedAt')} {moment(project.lastUpdatedAt).fromNow(true)} {t('text.ago')}
          </span> */}
        </Toolbar>
      </AppBar>

      <div className={classes.container}>
        {menu.map(({ path, render }, index) => (
          <Route
            key={index}
            path={path}
            exact
            render={render}
          />
        ))}
      </div>
    </div>
  );
}

Project.propTypes = {
  project: PropTypes.object,
};

export default Project;
