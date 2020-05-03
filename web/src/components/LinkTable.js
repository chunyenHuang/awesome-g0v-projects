import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Table from './Table';
import TextLink from './TextLink';

function LinkTable({ data, nested = false, maxHeight }) {
  const { t } = useTranslation();

  const title = t('table.link.listTitle');
  const description = '';

  const columns = [{
    name: 'name',
    label: t('table.link.name'),
    options: {
      display: false,
      filter: false,
      sort: true,
    },
  }, {
    name: 'url',
    label: t('table.link.url'),
    options: {
      filter: false,
      sort: true,
      customBodyRender(value) {
        const link = value.startsWith('http') ? value : `http://${value}`;
        return (
          <TextLink url={link} title={link} />);
      },
    },
  }];

  const options = {
    expandableRows: true,
    isRowExpandable: () => false,
  };

  return (
    <Table
      title={title}
      description={description}
      data={data}s
      columns={columns}
      options={options}
      nested={nested}
      themeProps={{ cell: { maxWidth: 300 } }}
      maxHeight={maxHeight}
    />
  );
}

LinkTable.propTypes = {
  data: PropTypes.array.isRequired,
  nested: PropTypes.bool,
  maxHeight: PropTypes.string,
};

export default LinkTable;
