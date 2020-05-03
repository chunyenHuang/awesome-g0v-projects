import ProjectTable from './components/ProjectTable';
import ProposalEventTable from './components/ProposalEventTable';
import TaskTable from './components/TaskTable';
import HackmdTagTable from './components/HackmdTagTable';
import RepoTable from './components/RepoTable';
// import OrganizationTable from './components/OrganizationTable';
import DeveloperTable from './components/DeveloperTable';
import Info from './components/Info';
import Project from './components/Project';
import Unsolved from './components/Unsolved';

export default [{
  title: 'header.findProjects',
  paths: ['/', '/projects'],
  component: ProjectTable,
}, {
  title: 'header.project',
  paths: [
    '/project/:name',
    '/project/:name/*',
  ],
  component: Project,
  hide: true,
}, {
  title: 'header.findProposals',
  paths: ['/proposals'],
  component: ProposalEventTable,
}, {
  title: 'header.findTasks',
  paths: ['/tasks'],
  component: TaskTable,
}, {
  title: 'header.findCowriting',
  paths: ['/cowriting'],
  component: HackmdTagTable,
}, {
  title: 'header.findRepositories',
  paths: ['/repositories'],
  component: RepoTable,
  // }, {
  //   title: 'header.findOrganizations',
  //   paths:[ '/organizations',
  //   component: OrganizationTable,
}, {
  title: 'header.findDevelopers',
  paths: ['/developers'],
  component: DeveloperTable,
}, {
  title: 'header.unsolved',
  paths: ['/unsolved'],
  component: Unsolved,
}, {
  title: 'header.info',
  paths: ['/info'],
  component: Info,
  hide: true,
}];
