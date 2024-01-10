import { ISidebar } from 'interfaces'
import CandidatesIcon from 'assets/svg/CandidateIcon'
import DashboardIcon from 'assets/svg/DashboardIcon'
import EmployeeIcon from 'assets/svg/EmployeeIcon'
// import InboxIcon from 'assets/svg/InboxIcon'
import JobsIcon from 'assets/svg/JobsIcon'

import StructureIcon from 'assets/svg/StructureIcon'

export const Sidebardata: ISidebar[] = [
  // {
  //   category: '',
  //   data: [
  //     {
  //       title: 'Dashboard',
  //       icon: <DashboardIcon />,
  //       id: 1,
  //       url: '/dashboard',
  //     },
  //     {
  //       title: 'inbox',
  //       icon: <InboxIcon />,
  //       id: 2,
  //       url: '/inbox',
  //     },
  //   ],
  // },
  {
    category: 'Recruitment',
    data: [
      {
        icon: <JobsIcon />,
        title: 'job posting',
        id: 4,
        url: '/jobs',
      },
      {
        icon: <CandidatesIcon />,
        title: ' candidates',
        id: 5,
        url: '/candidatesdashboard',
      },
    ],
  },

  {
    category: 'Organization',
    data: [
      {
        icon: <EmployeeIcon />,
        title: ' employee',
        id: 10,
        url: '/organization/employees',
      },
      {
        icon: <StructureIcon />,
        title: 'structure',
        id: 11,
        url: '/structure/Roles',
      },
    ],
  },
  {
    category: 'Master',
    data: [
      {
        icon: <JobsIcon />,
        title: 'department',
        value: 'department',
        id: 18,
        url: '/master/departments',
      },
      {
        icon: <CandidatesIcon />,
        title: 'employment type',
        value: 'employmenttype',
        id: 5,
        url: '/master/employment-type',
      },
      {
        icon: <DashboardIcon />,
        title: 'profile questions',
        value: 'profilequestions',
        id: 6,
        url: '/master/profile-questions',
      },
      {
        icon: <CandidatesIcon />,
        title: 'experience',
        value: 'Minimumexperience',
        id: 7,
        url: '/master/experience',
      },
      {
        icon: <CandidatesIcon />,
        title: 'screening',
        value: 'screeningQuestions',
        id: 7,
        url: '/master/screening-questions',
      },
    ],
  },
]
