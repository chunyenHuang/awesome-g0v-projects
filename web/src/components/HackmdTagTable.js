import React, { useEffect, useState } from 'react';
import moment from 'moment';
import DescriptionIcon from '@material-ui/icons/Description';
import { useTranslation } from 'react-i18next';

import Table from './Table';
import VisitButton from './VisitButton';
import NestedTableContainer from './table/NestedTableContainer';
import HackmdTable from './HackmdTable';
import GithubLinkButton from './GithubLinkButton';
import { getHackmdDataByTag } from '../data';

function HackmdTagTable() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const title = t('table.hackmdTag.listTitle');
  const description = 'Data Source: https://g0v.hackmd.io';

  const columns = [{
    name: 'tag',
    label: t('table.hackmdTag.tag'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'recentTitle',
    label: t('table.hackmdTag.recentTitle'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'recentLastChangedAt',
    label: t('table.hackmdTag.recentLastChangedAt'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD HH:MM'),
    },
  }, {
    name: 'records.length',
    label: t('table.hackmdTag.records'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'githubRepoUrl',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => <GithubLinkButton url={value} />,
    },
  }, {
    name: 'tagUrl',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender(value) {
        return (
          <VisitButton url={value} title={t('table.hackmdTag.hackmd')} icon={<DescriptionIcon />}/>);
      },
    },
  }];

  const options = {
    expandableRows: true,
    renderExpandableRow(rowData, rowMeta) {
      const item = data[rowMeta.dataIndex];
      return (
        <NestedTableContainer columns={columns}>
          <HackmdTable data={item.records} nested={true} />
        </NestedTableContainer>
      );
    },
  };

  useEffect(() => {
    (async () => {
      setData(await getHackmdDataByTag());
    })();
  }, []);

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

export default HackmdTagTable;
