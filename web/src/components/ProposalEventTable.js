import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import Table from './Table';
import NestedTableContainer from './table/NestedTableContainer';
import { getProposalEvents } from '../data';
import ProposalTable from './ProposalTable';

function ProposalEventTable({ data: inData, nested = false }) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const title = t('table.proposal.listTitle');

  const columns = [{
    name: 'term',
    label: t('table.proposal.term'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'event_name',
    label: t('table.proposal.eventName'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'dummy_event_type',
    label: t('table.proposal.eventType'),
    options: {
      filter: true,
      sort: true,
    },
  }, {
    name: 'date',
    label: t('table.proposal.date'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD'),
    },
  }, {
    name: 'proposals.length',
    label: t('table.proposal.proposalCount'),
    options: {
      filter: false,
      sort: true,
    },
  }];

  const options = {
    expandableRows: true,
    renderExpandableRow(rowData, rowMeta) {
      const item = data[rowMeta.dataIndex];
      return (
        <NestedTableContainer columns={columns}>
          <ProposalTable data={item.proposals} nested={true} />
        </NestedTableContainer>
      );
    },
  };

  useEffect(() => {
    if (inData) {
      setData(inData);
    } else {
      (async () => {
        setData(await getProposalEvents());
      })();
    }
  }, [inData]);

  return (
    <Table
      title={title}
      data={data}s
      columns={columns}
      options={options}
      nested={nested}
    />
  );
}

ProposalEventTable.propTypes = {
  data: PropTypes.array.isRequired,
  nested: PropTypes.bool,
};

export default ProposalEventTable;
