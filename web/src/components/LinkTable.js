import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Table from './Table';
import TextLink from './TextLink';

function LinkTable({ data, nested = false }) {
  const { t } = useTranslation();

  const title = t('table.link.listTitle');
  const description = '';

  const columns = [{
    name: 'name',
    label: t('table.link.name'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'url',
    label: t('table.link.url'),
    options: {
      filter: false,
      sort: false,
      customBodyRender(value) {
        return (
          <TextLink url={value} title={value} />);
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
      themeProps={{ maxWidth: 300 }}
    />
  );
}

LinkTable.propTypes = {
  data: PropTypes.array.isRequired,
  nested: PropTypes.bool,
};

export default LinkTable;
