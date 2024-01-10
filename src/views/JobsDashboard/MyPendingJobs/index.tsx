import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { ColumnsType } from 'antd/es/table'
import { RootState } from 'store/store'
import useGet from 'hooks/useGet'
import TableSection from 'components/Table'
import Modal from 'components/Modal'
import SearchInput from 'components/SearchInput'
import ReasonToRejectModal from 'views/Modals/ReasonToRejectModal'
import { AllJobsDataType } from 'interfaces'
import SearchIcon from 'assets/svg/SearchIcon'
import AddIcon from 'assets/svg/AddIcon'

import {
  TitleSection,
  Wrapper,
  WrapperTitle,
  SearchSection,
  JobSubTitle,
  JobTitleWrapper,
  ActionIconWrapper,
  ViewRejectedReason,
  ViewReason,
} from 'styles/pages/DashboardJob'

const MyPendingJobsContainer = () => {
  const [searchedText, setSearchedText] = useState('')
  const [rejectModal, setRejectModal] = useState(false)
  const [rejectJobData, setRejectJobData] = useState({})
  const navigate = useNavigate()
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)
  const activeColor = useSelector((state: RootState) => state?.colorSlice?.activeColor)

  const toggleRejectTab = () => {
    setRejectModal(!rejectModal)
  }

  const { data: getMyPendingJobs, refetch: refetchMyPendingJob } = useGet('mypendingjobs', `/job/jobpost`, {
    token: true,
  })
  useEffect(() => {
    refetchMyPendingJob()
  }, [])

  const columns: ColumnsType<AllJobsDataType> = [
    {
      title: 'Job Role',
      key: 'jobTitle',
      dataIndex: 'jobTitle',
      render: (jobTitle: string, record: any) => (
        <JobTitleWrapper
          color={activeColor}
          onClick={() => {
            navigate(`/jobs/view/${record?.id}`)
          }}
        >
          {jobTitle} <JobSubTitle>{jobTitle}</JobSubTitle>
        </JobTitleWrapper>
      ),
      filteredValue: [searchedText],
      onFilter: (value: any, record: any) => {
        return String(record.jobTitle).toLowerCase()?.includes(value.toLowerCase())
      },
    },
    {
      title: 'Created On',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (item: any) => {
        return <>{item ? moment(item).format('DD MMM YYYY') : <div>N/A</div>}</>
      },
    },
    {
      title: 'Submitted On',
      key: 'submittedAt',
      dataIndex: 'JobStatus',
      render: (item: any) => {
        return <>{item ? moment(item?.statusUpdateDate).format('DD MMM YYYY') : <div>N/A</div>}</>
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'JobStatus',
      render: (value: any) => {
        return <>{value?.status}</>
      },
    },
    {
      title: 'Reason',
      key: 'remark',
      dataIndex: 'JobStatus',
      render: (item: any, record: any) => {
        return (
          <>
            {item?.status === 'REJECTED' ? (
              <ViewRejectedReason
                onClick={() => {
                  setRejectJobData(record)
                  toggleRejectTab()
                }}
              >
                View Reason
              </ViewRejectedReason>
            ) : (
              <ViewReason>View Reason</ViewReason>
            )}
          </>
        )
      },
    },
    {
      title: 'Actions',
      dataIndex: 'id',

      render: (id: string) => {
        return (
          <ActionIconWrapper color={activeColor}>
            <AddIcon
              onClick={() => {
                localStorage.removeItem('postId')
                localStorage.removeItem('jobAppId')
                navigate(`/jobs/edit/${id}`)
              }}
            />
          </ActionIconWrapper>
        )
      },
    },
  ]

  if (
    !PermittedEndPoint['/job/jobPost']?.includes('UPDATE') &&
    !PermittedEndPoint['/job/jobPost']?.includes('DELETE')
  ) {
    columns.pop()
  }

  return (
    <Wrapper color={activeColor}>
      <TitleSection>
        <WrapperTitle>My Jobs For Approval</WrapperTitle>
        <SearchSection>
          <SearchInput
            placeholder="Search Jobs"
            prefix={<SearchIcon />}
            onChange={(e) => {
              setSearchedText(e.target.value)
            }}
          />

          {/* <FilterButton
 onClick={() => {
 setIsopen(!isOpen)
 }}
 >
 <FilterIcon />
 Filter
 </FilterButton>
 {isOpen && (
 <FilterContainer>
 <FilterTwinSection>
 <Filter>Filter</Filter>
 <Reset>Reset</Reset>
 </FilterTwinSection>
 <Border />
 <FilterTwinSection>
 <FilterTitleSection>Filter</FilterTitleSection>
 <Hide>Hide All</Hide>
 </FilterTwinSection>
 <FilterTwinSection>
 <FilterType>Open</FilterType>
 <Hide>
 <EyeIcon />
 </Hide>
 </FilterTwinSection>
 <FilterTwinSection>
 <FilterType>Closed</FilterType>
 <Hide>
 <EyeIcon />
 </Hide>
 </FilterTwinSection>
 <FilterTwinSection>
 <FilterType>Hold</FilterType>
 <Hide>
 <EyeIcon />
 </Hide>
 </FilterTwinSection>
 <FilterTwinSection>
 <FilterTitleSection>Location</FilterTitleSection>
 <Hide>Hide All</Hide>
 </FilterTwinSection>
 <FilterTwinSection>
 <FilterType>Mohali,India</FilterType>
 <Hide>
 <EyeIcon />
 </Hide>
 </FilterTwinSection>
 <FilterTwinSection>
 <FilterType>USA</FilterType>
 <Hide>
 <EyeIcon />
 </Hide>
 </FilterTwinSection>
 <FilterTwinSection>
 <FilterTitleSection>Hiring Manager</FilterTitleSection>
 <Hide>Hide All</Hide>
 </FilterTwinSection>
 <FilterTwinSection>
 <FilterType>Priyanka</FilterType>
 <Hide>
 <EyeIcon />
 </Hide>
 </FilterTwinSection>
 <FilterTwinSection>
 <FilterTitleSection>Assigned Timeline</FilterTitleSection>
 </FilterTwinSection>
 <FilterTwinSection>
 <DateWrapper>
 <DateTitle>Start Date</DateTitle>
 <DatePicker />
 </DateWrapper>
 <DateWrapper>
 <DateTitle>End Date</DateTitle>
 <DatePicker />
 </DateWrapper>
 </FilterTwinSection>
 </FilterContainer>
 )} */}
        </SearchSection>
      </TitleSection>
      <TableSection dataSource={getMyPendingJobs} columns={columns} total={getMyPendingJobs} />

      <Modal isOpen={rejectModal}>
        <ReasonToRejectModal rejectToggle={toggleRejectTab} rejectJobData={rejectJobData} />
      </Modal>
    </Wrapper>
  )
}

export default MyPendingJobsContainer
