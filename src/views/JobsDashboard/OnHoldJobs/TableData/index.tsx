import { useSelector } from 'react-redux'
import type { ColumnsType } from 'antd/es/table'
import { AllJobsDataType } from 'interfaces'
import AddIcon from 'assets/svg/AddIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import CandidatesNumberIcon from 'assets/svg/CandidatesNumberIcon'
import { JobTitleWrapper, JobSubTitle, Candidates, Date } from 'styles/pages/DashboardJob'

const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

export const columns: ColumnsType<AllJobsDataType> = [
  {
    title: 'Job Title',
    dataIndex: 'title',
    // render: (text: string) => <a>{text}</a>,
  },

  {
    title: 'Created',
    dataIndex: 'created',
  },
  {
    title: 'Openings',
    dataIndex: 'openings',
  },
  {
    title: 'Candidates',
    dataIndex: 'candidate',
  },
  {
    title: 'Hiring Lead',
    dataIndex: 'hiringLead',
  },
  {
    title: 'Timeline',
    dataIndex: 'timeline',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
]

export const data: AllJobsDataType[] = [
  {
    key: 1,
    title: (
      <JobTitleWrapper color={activeColor}>
        Finance Analyst
        <JobSubTitle>JobSubTitle</JobSubTitle>
      </JobTitleWrapper>
    ),
    created: '21 feb 2023',
    openings: 3,
    candidate: (
      <Candidates color={activeColor}>
        <CandidatesNumberIcon />2
      </Candidates>
    ),
    hiringLead: 'amaya',
    timeline: <Date> 21 Feb - 21 Mar</Date>,
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
    openings: 3,
    candidate: (
      <Candidates color={activeColor}>
        <CandidatesNumberIcon />2
      </Candidates>
    ),
    hiringLead: 'amaya',
    timeline: <Date> 21 Feb - 21 Mar</Date>,
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
    openings: 2,
    candidate: (
      <Candidates color={activeColor}>
        <CandidatesNumberIcon />2
      </Candidates>
    ),
    hiringLead: 'amaya',
    timeline: <Date> 21 Feb - 21 Mar</Date>,
    actions: (
      <Candidates color={activeColor}>
        <AddIcon />
        <DeleteIcon />
      </Candidates>
    ),
  },
]
