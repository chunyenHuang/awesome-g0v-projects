import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DescriptionIcon from '@material-ui/icons/Description';
import { useTranslation } from 'react-i18next';

import Table from './Table';
import CellList from './table/CellList';
import VisitButton from './VisitButton';

function HackmdTable({ data, nested = false }) {
  const { t } = useTranslation();
  const [tags, setTags] = useState([]);

  const title = t('table.hackmd.listTitle');
  const description = 'Data Source: https://g0v.hackmd.io';

  const columns = [{
    name: 'title',
    label: t('table.hackmd.title'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'userpath',
    label: t('table.hackmd.user'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'tags',
    label: t('table.hackmd.tags'),
    options: {
      display: !nested,
      filter: true,
      filterOptions: {
        names: tags,
      },
      sort: true,
      customBodyRender: (value) => <CellList value={value}/>,
    },
  }, {
    name: 'publishType',
    label: t('table.hackmd.publishType'),
    options: {
      filter: true,
      sort: true,
    },
  }, {
    name: 'publishedAt',
    label: t('table.hackmd.publishedAt'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => value ? moment(value).format('YYYY/MM/DD') : '',
    },
  }, {
    name: 'createdAt',
    label: t('table.hackmd.createdAt'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD'),
    },
  }, {
    name: 'lastchangeAt',
    label: t('table.hackmd.lastchangeAt'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD HH:MM'),
    },
  }, {
    name: 'id',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender(value) {
        return (
          <VisitButton url={`https://g0v.hackmd.io/${value}`} title={t('table.hackmd.hackmd')} icon={<DescriptionIcon />}/>);
      },
    },
  }];

  const options = {
    expandableRows: true,
    isRowExpandable: () => false,
  };

  useEffect(() => {
    const allTags = [];
    data.forEach(({ tags }) => {
      (tags || []).forEach((tag) => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });

    setTags(allTags);
  }, [data]);

  return (
    <Table
      title={title}
      description={description}
      data={data}s
      columns={columns}
      options={options}
      nested={nested}
    />
  );
}

HackmdTable.propTypes = {
  data: PropTypes.array.isRequired,
  nested: PropTypes.bool,
};

export default HackmdTable;
