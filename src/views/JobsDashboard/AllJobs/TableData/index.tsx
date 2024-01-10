import { useSelector } from 'react-redux'
import type { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import { AllJobsDataType } from 'interfaces'
import AddIcon from 'assets/svg/AddIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import CandidatesNumberIcon from 'assets/svg/CandidatesNumberIcon'
import { Candidates, JobTitleWrapper, JobSubTitle } from 'styles/pages/DashboardJob'

const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

export const columns: ColumnsType<AllJobsDataType> = [
  {
    title: 'Job Title',
    key: 'jobTitle',
    dataIndex: 'jobTitle',
    render: (text: any) => (
      <JobTitleWrapper color={activeColor}>
        {text} <JobSubTitle>{text}</JobSubTitle>
      </JobTitleWrapper>
    ),
  },
  {
    title: 'Created',
    key: 'createdAt',
    dataIndex: 'createdAt',
    render: (item: any) => {
      return <>{item ? moment(item).format('DD MMM YYYY') : <div className="">N/A</div>}</>
    },
  },
  {
    title: 'Openings',
    key: 'numberOfPositions',
    dataIndex: 'numberOfPositions',
  },
  {
    title: 'Candidates',
    key: 'candidatesCount',
    dataIndex: 'candidatesCount',
    render: (item: any) => (
      <Candidates color={activeColor}>
        <CandidatesNumberIcon />
        {item}
      </Candidates>
    ),
  },
  {
    title: 'Hiring Lead',
    key: 'hiringLead',
    dataIndex: 'hiringLead',
  },

  {
    title: 'Timeline',
    key: 'createdAt',
    dataIndex: 'jobTimeline',
    render: (jobTimeline) => {
      if (!jobTimeline) {
        return null
      }

      const [startDate, endDate] = jobTimeline.split(',')
      const formattedStartDate = moment(startDate).format('DD MMM')
      const formattedEndDate = moment(endDate).format('DD MMM')
      return `${formattedStartDate}-${formattedEndDate}`
    },
  },
  {
    title: 'Actions',
    dataIndex: 'id',

    render: () => (
      <Candidates color={activeColor}>
        <AddIcon />
        <DeleteIcon />
      </Candidates>
    ),
  },
]
