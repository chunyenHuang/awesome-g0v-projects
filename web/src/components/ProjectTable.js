import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DescriptionIcon from '@material-ui/icons/Description';
import LanguageIcon from '@material-ui/icons/Language';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useTranslation } from 'react-i18next';

import Table from './Table';
import CellList from './table/CellList';
import CellParagraph from './table/CellParagraph';
import VisitButton from './VisitButton';
import TextLink from './TextLink';
import ProjectDetails from './ProjectDetails';

const useStyles = makeStyles((theme) => ({
  img: {
    maxHeight: 65,
    maxWidth: '100%',
  },
  nestedContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
}));

function ProjectTable({ data = [] }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const title = t('table.project.title');

  data = data.map((item) => {
    item.g0vJson.name_zh = item.g0vJson.name_zh || item.g0vJson.name;
    item.g0vJson.description_zh = item.g0vJson.description_zh || item.g0vJson.description;
    return item;
  });

  const columns = [{
    name: 'g0vJson.status',
    label: t('table.project.status'),
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value = '') => `${value.toUpperCase()}`,
    },
  }, {
    name: 'owner.login',
    label: t('table.project.org'),
    options: {
      filter: true,
      sort: true,
      customBodyRender(value) {
        return (
          <TextLink title={value} url={`https://github.com/${value}`} />);
      },
    },
  }, {
    name: 'g0vJson.author',
    label: t('table.project.author'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'g0vJson.thumbnail',
    label: t('table.project.thumbnail'),
    options: {
      filter: false,
      sort: false,
      display: false,
      customBodyRender(value) {
        return (
          <Grid container justify="center" align="center">
            {value && <img src={value} alt="-" className={classes.img}/>}
          </Grid>);
      },
    },
  }, {
    name: 'name',
    label: t('table.project.repo'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'g0vJson.name',
    label: t('table.project.name'),
    options: {
      display: false,
      filter: false,
      sort: true,
    },
  }, {
    name: 'g0vJson.name_zh',
    label: t('table.project.name'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'g0vJson.description',
    label: t('table.project.description'),
    options: {
      display: false,
      filter: false,
      sort: false,
      customBodyRender: (value) => <CellParagraph value={value} />,
    },
  }, {
    name: 'g0vJson.description_zh',
    label: t('table.project.description'),
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => <CellParagraph value={value} />,
    },
  }, {
    name: 'g0vJson.keywords',
    label: t('table.project.keywords'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => <CellList value={value} />,
    },
  }, {
    name: 'g0vJson.needs',
    label: t('table.project.needs'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => <CellList value={value} />,
    },
  }, {
    name: 'g0vJson.licenses',
    label: t('table.project.licenses'),
    options: {
      display: false,
      filter: false,
      sort: true,
      customBodyRender: (value) => <CellList value={value} targetKey="type" />,
    },
  }, {
    name: 'languagePrimary',
    label: t('table.project.language'),
    options: {
      display: false,
      filter: true,
      sort: true,
    },
  }, {
    name: 'languageSecondary',
    label: t('table.project.language2'),
    options: {
      display: false,
      filter: true,
      sort: true,
    },
  }, {
    name: 'languages',
    label: t('table.project.allLanguages'),
    options: {
      filter: false,
      sort: false,
      display: true,
      customBodyRender: (value) => <CellList value={value} />,
    },
  }, {
    name: 'open_issues',
    label: t('table.project.issues'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'contributors.length',
    label: t('table.project.contributors'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'created_at',
    label: t('table.project.createdAt'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD'),
    },
  }, {
    name: 'pushed_at',
    label: t('table.project.pushedAt'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD'),
    },
  }, {
    name: 'g0vJson.homepage',
    label: ' ',
    options: {
      filter: false,
      customBodyRender(value) {
        return (
          <VisitButton url={value} title={t('table.project.homepage')} icon={<LanguageIcon />} />);
      },
    },
  }, {
    name: 'g0vJson.document',
    label: ' ',
    options: {
      filter: false,
      customBodyRender(value) {
        return (
          <VisitButton url={value} title={t('table.project.documents')} icon={<DescriptionIcon />} />);
      },
    },
  }, {
    name: 'html_url',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender(value) {
        return (
          <VisitButton url={value} title={t('table.project.githubRepo')} icon={<GitHubIcon />}/>);
      },
    },
  }];

  const options = {
    expandableRows: true,
    renderExpandableRow(rowData, rowMeta) {
      const item = data[rowMeta.dataIndex];
      return (
        <TableRow>
          <TableCell colSpan={columns.length + 1} className={classes.nestedContainer}>
            <ProjectDetails project={item} />
          </TableCell>
        </TableRow>
      );
    },
  };

  return (
    <Table
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

ProjectTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ProjectTable;
