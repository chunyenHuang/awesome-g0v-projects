import ProjectTable from './components/ProjectTable';
import OrganizationTable from './components/OrganizationTable';
import RepoTable from './components/RepoTable';
import DeveloperTable from './components/DeveloperTable';
import HackmdTagTable from './components/HackmdTagTable';
import ProposalEventTable from './components/ProposalEventTable';
import TaskTable from './components/TaskTable';

export default [{
  title: 'header.findProjects',
  path: '/',
  component: ProjectTable,
}, {
  title: 'header.findProposals',
  path: '/proposals',
  component: ProposalEventTable,
}, {
  title: 'header.findTasks',
  path: '/tasks',
  component: TaskTable,
}, {
  title: 'header.findCowriting',
  path: '/cowriting',
  component: HackmdTagTable,
}, {
  title: 'header.findRepositories',
  path: '/repositories',
  component: RepoTable,
}, {
  title: 'header.findOrganizations',
  path: '/organizations',
  component: OrganizationTable,
}, {
  title: 'header.findDevelopers',
  path: '/developers',
  component: DeveloperTable,
}];
