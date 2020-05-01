import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DescriptionIcon from '@material-ui/icons/Description';
import LanguageIcon from '@material-ui/icons/Language';
import { useTranslation } from 'react-i18next';

import Table from './Table';
import CellList from './table/CellList';
import CellParagraph from './table/CellParagraph';
import CellImage from './table/CellImage';
import VisitButton from './VisitButton';
import TextLink from './TextLink';
import ProjectDetails from './G0vJsonProjectDetails';
import G0vJsonIconButton from './G0vJsonIconButton';
import NestedTableContainer from './table/NestedTableContainer';
import GithubLinkButton from './GithubLinkButton';
import { getProjects } from '../data';
import G0vProjectStatusBadget from './G0vProjectStatusBadget';

function ProjectTable({ data: inData }) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    status: [],
    keywords: [],
    needs: [],
    languages: [],
  });

  const title = t('table.g0vJsonProject.title');
  const description = 'Data Source: GitHub & g0v.json';

  const columns = [{
    name: 'g0vJson.status',
    label: t('table.g0vJsonProject.status'),
    options: {
      filter: true,
      filterOptions: {
        names: filterOptions.status,
      },
      sort: true,
      customBodyRender: (value = '') => <G0vProjectStatusBadget value={value} />,
    },
  }, {
    name: 'owner.login',
    label: t('table.g0vJsonProject.org'),
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
    label: t('table.g0vJsonProject.author'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'g0vJson.thumbnail',
    label: t('table.g0vJsonProject.thumbnail'),
    options: {
      filter: false,
      sort: false,
      display: false,
      customBodyRender: (value = []) => <CellImage value={value[0]} />,
    },
  }, {
    name: 'name',
    label: t('table.g0vJsonProject.repo'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'g0vJson.name',
    label: t('table.g0vJsonProject.name'),
    options: {
      display: false,
      filter: false,
      sort: true,
    },
  }, {
    name: 'g0vJson.name_zh',
    label: t('table.g0vJsonProject.name_zh'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'g0vJson.description',
    label: t('table.g0vJsonProject.description'),
    options: {
      display: false,
      filter: false,
      sort: false,
      customBodyRender: (value) => <CellParagraph value={value} />,
    },
  }, {
    name: 'g0vJson.description_zh',
    label: t('table.g0vJsonProject.description_zh'),
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => <CellParagraph value={value} />,
    },
  }, {
    name: 'g0vJson.keywords',
    label: t('table.g0vJsonProject.keywords'),
    options: {
      filter: true,
      filterOptions: {
        names: filterOptions.keywords,
      },
      sort: true,
      customBodyRender: (value) => <CellList value={value} />,
    },
  }, {
    name: 'g0vJson.needs',
    label: t('table.g0vJsonProject.needs'),
    options: {
      filter: true,
      filterOptions: {
        names: filterOptions.needs,
      },
      sort: true,
      customBodyRender: (value) => <CellList value={value} />,
    },
  }, {
    name: 'g0vJson.licenses',
    label: t('table.g0vJsonProject.licenses'),
    options: {
      display: false,
      filter: false,
      sort: true,
      customBodyRender: (value) => <CellList value={value} targetKey="type" />,
    },
  }, {
    name: 'languagePrimary',
    label: t('table.g0vJsonProject.language'),
    options: {
      display: false,
      filter: false,
      sort: true,
    },
  }, {
    name: 'languageSecondary',
    label: t('table.g0vJsonProject.language2'),
    options: {
      display: false,
      filter: false,
      sort: true,
    },
  }, {
    name: 'languages',
    label: t('table.g0vJsonProject.allLanguages'),
    options: {
      filter: true,
      filterOptions: {
        names: filterOptions.languages,
      },
      sort: false,
      display: true,
      customBodyRender: (value) => <CellList value={value} />,
    },
  }, {
    name: 'open_issues',
    label: t('table.g0vJsonProject.issues'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'contributors.length',
    label: t('table.g0vJsonProject.contributors'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'created_at',
    label: t('table.g0vJsonProject.createdAt'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD'),
    },
  }, {
    name: 'pushed_at',
    label: t('table.g0vJsonProject.pushedAt'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD'),
    },
  }, {
    name: 'g0vJsonUrl',
    label: ' ',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value, { rowData }) => {
        const repo = `${rowData[1]}/${rowData[4]}`;
        return (<G0vJsonIconButton url={value} repo={repo} />);
      },
    },
  }, {
    name: 'g0vJson.homepage',
    label: ' ',
    options: {
      filter: false,
      customBodyRender(value) {
        return (
          <VisitButton url={value} title={t('table.g0vJsonProject.homepage')} icon={<LanguageIcon />} />);
      },
    },
  }, {
    name: 'g0vJson.document',
    label: ' ',
    options: {
      filter: false,
      customBodyRender(value) {
        return (
          <VisitButton url={value} title={t('table.g0vJsonProject.documents')} icon={<DescriptionIcon />} />);
      },
    },
  }, {
    name: 'html_url',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => <GithubLinkButton url={value} />,
    },
  }];

  const options = {
    expandableRows: true,
    renderExpandableRow(rowData, rowMeta) {
      const item = data[rowMeta.dataIndex];
      return (
        <NestedTableContainer columns={columns}>
          <ProjectDetails project={item} />
        </NestedTableContainer>
      );
    },
  };

  useEffect(() => {
    const allStatus = [];
    const allKeywords = [];
    const allNeeds = [];
    const allLanguages = [];
    data.forEach((item) => {
      item.languages.forEach((key) => {
        if (!allLanguages.includes(key)) {
          allLanguages.push(key);
        }
      });

      if (Array.isArray(item.g0vJson.keywords)) {
        item.g0vJson.keywords.forEach((key) => {
          if (!allKeywords.includes(key)) {
            allKeywords.push(key);
          }
        });
      }

      if (Array.isArray(item.g0vJson.needs)) {
        item.g0vJson.needs.forEach((key) => {
          if (!allNeeds.includes(key)) {
            allNeeds.push(key);
          }
        });
      }

      if (item.g0vJson.status) {
        if (!allStatus.includes(item.g0vJson.status.toLowerCase())) {
          allStatus.push(item.g0vJson.status.toLowerCase());
        }
      }
    });
    setFilterOptions({
      languages: allLanguages,
      keywords: allKeywords,
      needs: allNeeds,
      status: allStatus,
    });
  }, [data]);

  useEffect(() => {
    if (inData) {
      setData(inData);
    } else {
      (async () => {
        setData(await getProjects());
      })();
    }
  }, [inData]);

  return (
    <Table
      title={title}
      description={description}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

ProjectTable.propTypes = {
  data: PropTypes.array,
};

export default ProjectTable;
