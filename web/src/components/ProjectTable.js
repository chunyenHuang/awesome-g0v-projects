import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Table from './Table';
import CellList from './table/CellList';
import VisitButton from './VisitButton';
import RepoTable from './RepoTable';
import ProposalTable from './ProposalTable';
// import ProjectDetails from './G0vJsonProjectDetails';
import NestedTableContainer from './table/NestedTableContainer';
import { getProjects, getTags } from '../data';

function ProjectTable({ data: inData }) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);

  const title = t('table.project.title');
  const description = 'Data Source: g0v database & GitHub & g0v.json';

  const columns = [{
    name: 'source',
    label: t('table.project.source'),
    options: {
      filter: true,
      sort: true,
    },
  }, {
    name: 'name',
    label: t('table.project.name'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'description',
    label: t('table.project.description'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'g0v_db_rows.length',
    label: t('table.project.proposalsCount'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'lastProposedDate',
    label: t('table.project.lastProposedDate'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => value ? moment(value).format('YYYY/MM/DD') : '-',
    },
  }, {
    name: 'github_repos.length',
    label: t('table.project.githubReposCount'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'lastRepoUpdatedDate',
    label: t('table.project.lastRepoUpdatedDate'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => value ? moment(value).format('YYYY/MM/DD') : '-',
    },
  }, {
    name: 'owners',
    label: t('table.project.owners'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => <CellList value={value}/>,
    },
  }, {
    name: 'tags',
    label: t('table.project.tags'),
    options: {
      filter: true,
      filterOptions: {
        names: tags,
        logic: (tags, filters) => {
          let isIncluded = false;
          filters.forEach((i) => {
            if (tags.includes(i)) {
              isIncluded = true;
            }
          });

          if (filters.length) return !isIncluded;
          return false;
        },
      },
      customFilterListOptions: {
        render(v) {
          return `tags: ${v}`;
        },
      },
      sort: true,
      customBodyRender: (value) => <CellList value={value}/>,
    },
  }, {
    name: 'homepage',
    label: t('table.project.homepage'),
    options: {
      filter: false,
      sort: false,
      display: false,
    },
  }, {
    name: 'homepage',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => <VisitButton url={value} title={t('table.project.homepage')} />,
    },
  }];

  const options = {
    expandableRows: true,
    renderExpandableRow(rowData, rowMeta) {
      const item = data[rowMeta.dataIndex];
      return (
        <NestedTableContainer columns={columns}>
          {item.proposals.length > 0 &&
            <ProposalTable data={item.proposals} nested={true} />}
          {item.repos.length > 0 &&
            <RepoTable data={item.repos} nested={true} />}
        </NestedTableContainer>
      );
    },
  };

  useEffect(() => {
    if (inData) {
      setData(inData);
    } else {
      (async () => {
        const [
          { data: projects },
          { data: tags },
        ] = await Promise.all([
          getProjects(),
          getTags(),
        ]);
        setData(projects);
        setTags(tags.map((x) => x.name));
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
