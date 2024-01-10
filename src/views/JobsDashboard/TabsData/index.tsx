import type { TabsProps } from 'antd'
import AllJobsContainer from 'views/JobsDashboard/AllJobs'
import OpenJobsContainer from 'views/JobsDashboard/OpenJobs'
import ClosedJobsContainer from 'views/JobsDashboard/ClosedJobs'
// import OnHoldJobsContainer from 'views/JobsDashboard/OnHoldJobs'
import DraftsContainer from 'views/JobsDashboard/DraftsJobs'
import PendingContainer from 'views/JobsDashboard/PendingJobs'
import AssignJobs from 'views/JobsDashboard/AssignJobs'
import MyPendingJobsContainer from 'views/JobsDashboard/MyPendingJobs'
import AllJobsIcon from 'assets/svg/AllJobsIcon'
import OpenJobsIcon from 'assets/svg/OpenJobsIcon'
import ClosedJobsIcon from 'assets/svg/ClosedJobsIcon'
// import OnHoldJobsIcon from 'assets/svg/OnHoldJobsIcon'
import MyDraftsIcon from 'assets/svg/MyDraftsIcon'
import ApproveSvg from 'assets/svg/approveJobIcon'
import { TabLabel } from 'styles/pages/DashboardJob'

export const items: TabsProps['items'] = [
  {
    key: 'all',
    label: (
      <TabLabel>
        <AllJobsIcon />
        All Jobs
      </TabLabel>
    ),
    children: <AllJobsContainer />,
  },
  {
    key: 'open',
    label: (
      <TabLabel>
        <OpenJobsIcon />
        My Open Jobs
      </TabLabel>
    ),
    children: <OpenJobsContainer />,
  },
  {
    key: 'closed',
    label: (
      <TabLabel>
        <ClosedJobsIcon />
        My Closed Jobs
      </TabLabel>
    ),
    children: <ClosedJobsContainer />,
  },
  {
    key: 'draft',
    label: (
      <TabLabel>
        <MyDraftsIcon />
        My Drafts
      </TabLabel>
    ),
    children: <DraftsContainer />,
  },
  {
    key: 'pending',
    label: (
      <TabLabel>
        <ApproveSvg />
        Jobs For Approval
      </TabLabel>
    ),
    children: <PendingContainer />,
  },
  {
    key: 'mypendingjobs',
    label: (
      <TabLabel>
        <ApproveSvg />
        My Jobs For Approval
      </TabLabel>
    ),
    children: <MyPendingJobsContainer />,
  },
  {
    key: 'assign-jobs',
    label: (
      <TabLabel>
        <ApproveSvg />
        Assign Jobs
      </TabLabel>
    ),
    children: <AssignJobs />,
  },
]
