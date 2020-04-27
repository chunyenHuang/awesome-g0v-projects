import ProjectTable from './components/ProjectTable';
import OrganizationTable from './components/OrganizationTable';
import RepoTable from './components/RepoTable';
import DeveloperTable from './components/DeveloperTable';
import HackmdTagTable from './components/HackmdTagTable';

export default [{
  title: 'header.findProjects',
  path: '/',
  component: ProjectTable,
}, {
  title: 'header.findOrganizations',
  path: '/organizations',
  component: OrganizationTable,
}, {
  title: 'header.findRepositories',
  path: '/repositories',
  component: RepoTable,
}, {
  title: 'header.findDevelopers',
  path: '/developers',
  component: DeveloperTable,
}, {
  title: 'header.findCowriting',
  path: '/cowriting',
  component: HackmdTagTable,
}];
