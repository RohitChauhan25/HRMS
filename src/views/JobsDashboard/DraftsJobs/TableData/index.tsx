import { useSelector } from 'react-redux'
import type { ColumnsType } from 'antd/es/table'
import { DraftsJobsDataType } from 'interfaces'
import AddIcon from 'assets/svg/AddIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import { JobTitleWrapper, JobSubTitle, Candidates } from 'styles/pages/DashboardJob'

const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

export const columns: ColumnsType<DraftsJobsDataType> = [
  {
    title: 'Job Title',
    dataIndex: 'title',
  },
  {
    title: 'Created',
    dataIndex: 'created',
  },
  {
    title: 'Hiring Lead',
    dataIndex: 'hiringLead',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
]

export const data: DraftsJobsDataType[] = [
  {
    key: 1,
    title: (
      <JobTitleWrapper color={activeColor}>
        Finance Analyst
        <JobSubTitle>JobSubTitle</JobSubTitle>
      </JobTitleWrapper>
    ),
    created: '21 feb 2023',
    hiringLead: 'amaya',

    actions: (
      <Candidates color={activeColor}>
        <AddIcon />
        <DeleteIcon />
      </Candidates>
    ),
  },
  {
    key: 2,
    title: (
      <JobTitleWrapper color={activeColor}>
        Finance Analyst
        <JobSubTitle>JobSubTitle</JobSubTitle>
      </JobTitleWrapper>
    ),
    created: '21 feb 2023',
    hiringLead: 'amaya',

    actions: (
      <Candidates color={activeColor}>
        <AddIcon />
        <DeleteIcon />
      </Candidates>
    ),
  },
  {
    key: 3,
    title: (
      <JobTitleWrapper color={activeColor}>
        Finance Analyst
        <JobSubTitle>JobSubTitle</JobSubTitle>
      </JobTitleWrapper>
    ),
    created: '21 feb 2023',
    hiringLead: 'amaya',

    actions: (
      <Candidates color={activeColor}>
        <AddIcon />
        <DeleteIcon />
      </Candidates>
    ),
  },
]
