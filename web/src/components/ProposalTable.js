import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import DescriptionIcon from '@material-ui/icons/Description';
import VideocamIcon from '@material-ui/icons/Videocam';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';

import Table from './Table';
import CellList from './table/CellList';
import VisitButton from './VisitButton';

function ProposalTable({ data, nested = false }) {
  const { t } = useTranslation();
  const [manpowers, setManpowers] = useState([]);

  const title = t('table.proposal.listTitle');

  const columns = [{
    name: 'term',
    label: t('table.proposal.term'),
    options: {
      display: !nested,
      filter: false,
      sort: true,
    },
  }, {
    name: 'event_name',
    label: t('table.proposal.eventName'),
    options: {
      display: !nested,
      filter: !nested,
      sort: true,
    },
  }, {
    name: 'dummy_event_type',
    label: t('table.proposal.eventType'),
    options: {
      display: !nested,
      filter: !nested,
      sort: true,
    },
  }, {
    name: 'date',
    label: t('table.proposal.date'),
    options: {
      display: !nested,
      sort: true,
      customBodyRender: (value) => moment(value).format('YYYY/MM/DD'),
    },
  }, {
    name: 'project',
    label: t('table.proposal.project'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'owner_name',
    label: t('table.proposal.ownerName'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'slack_id',
    label: t('table.proposal.slackId'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'slack_channel',
    label: t('table.proposal.slackChannel'),
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'three_brief',
    label: t('table.proposal.threeBrief'),
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => <CellList value={value}/>,
    },
  }, {
    name: 'manpower',
    label: t('table.proposal.manpower'),
    options: {
      filter: true,
      filterOptions: {
        names: manpowers,
      },
      sort: true,
      customBodyRender: (value) => <CellList value={value}/>,
    },
  }, {
    name: 'tags',
    label: t('table.proposal.tags'),
    options: {
      filter: true,
      filterOptions: {
        names: manpowers,
      },
      sort: true,
      customBodyRender: (value) => <CellList value={value}/>,
    },
  }, {
    name: 'education_project',
    label: t('table.proposal.educationProject'),
    options: {
      filter: true,
      sort: true,
    },
  }, {
    name: 'license_data',
    label: t('table.proposal.license'),
    options: {
      filter: true,
      sort: true,
    },
  }, {
    name: 'video_link',
    label: ' ',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => <VisitButton url={value} title={t('table.proposal.video')} icon={<VideocamIcon />}/>,
    },
  }, {
    name: 'guideline',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => <VisitButton url={value} title={t('table.proposal.guideline')} icon={<DescriptionIcon />}/>,
    },
  }, {
    name: 'other_document',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => <VisitButton url={value} title={t('table.proposal.otherDocument')} icon={<LooksOneIcon />}/>,
    },
  }, {
    name: 'other_document2',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => <VisitButton url={value} title={t('table.proposal.otherDocument')} icon={<LooksTwoIcon />}/>,
    },
  }, {
    name: 'other_document3',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => <VisitButton url={value} title={t('table.proposal.otherDocument')} icon={<Looks3Icon />}/>,
    },
  }];

  const options = {
    expandableRows: true,
    isRowExpandable: () => false,
  };

  useEffect(() => {
    setManpowers([]);
  }, []);

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

ProposalTable.propTypes = {
  data: PropTypes.array.isRequired,
  nested: PropTypes.bool,
};

export default ProposalTable;
