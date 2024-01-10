import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { DatePicker } from 'antd'
import { ColumnsType } from 'antd/es/table'
import useGet from 'hooks/useGet'
// import { removeJob } from 'store/slice/jobDashboard'
import { resetLocationFilter, updateAssignedTimeline } from 'store/slice/jobApplicationSwitch'
// import useDelete from 'hooks/useDelete'
import TableSection from 'components/Table'
import Modal from 'components/Modal'
import SearchInput from 'components/SearchInput'
// import JobDeleteModal from 'views/Modals/DeleteJobModal'
import SuccessModal from 'views/Modals/SuccessModal'
import { AllJobsDataType } from 'interfaces'
import FilterIcon from 'assets/svg/FilterIcon'
import SearchIcon from 'assets/svg/SearchIcon'
// import AddIcon from 'assets/svg/AddIcon'
import CandidatesNumberIcon from 'assets/svg/CandidatesNumberIcon'
// import DeleteIcon from 'assets/svg/DeleteIcon'
import {
  TitleSection,
  Wrapper,
  WrapperTitle,
  SearchSection,
  FilterButton,
  FilterContainer,
  FilterTwinSection,
  Filter,
  Reset,
  Border,
  FilterTitleSection,
  Hide,
  DateWrapper,
  DateTitle,
  Candidates,
  JobSubTitle,
  JobTitleWrapper,
} from 'styles/pages/DashboardJob'

const ClosedJobsContainer = () => {
  const [searchedText, setSearchedText] = useState('')
  const assignedTimeline = useSelector((state: any) => state.jobApplicationSwitch.assignedTimeline)
  const [successModal, setSuccessModal] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const [startDate, setStartDate] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [filterButtonClicked, setFilterButtonClicked] = useState(false)
  const dispatch = useDispatch()
  const [, setIsCheckedMap] = useState<{ [key: string]: boolean }>({})
  const resetFilter = () => {
    dispatch(resetLocationFilter())
    setIsCheckedMap({})
  }

  const { data: getClosedJobs, refetch: refetchClosedJobs } = useGet('getClosedJobs', 'job/jobpost/closedJobs', {
    token: true,
  })

  useEffect(() => {
    refetchClosedJobs()
  }, [])

  const columns: ColumnsType<AllJobsDataType> = [
    {
      title: 'Job Title',
      key: 'jobTitle',
      dataIndex: 'jobTitle',
      render: (jobTitle: string) => (
        <JobTitleWrapper color={activeColor}>
          {jobTitle} <JobSubTitle>{jobTitle}</JobSubTitle>
        </JobTitleWrapper>
      ),
      filteredValue: [searchedText],
      onFilter: (value: any, record: any) => {
        return String(record.jobTitle).toLowerCase()?.includes(value.toLowerCase())
      },
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
        <Candidates
          color={activeColor}
          // onClick={() => {
          //   navigate(`/jobs/job-description/candidate/${data?.id}`, {
          //     state: { date: data?.createdAt, jobTitle: data?.jobTitle },
          //   })
          // }}
        >
          <CandidatesNumberIcon />
          {item}
        </Candidates>
      ),
    },
    {
      title: 'Assigned Timeline',
      key: 'createdAt',
      dataIndex: 'jobTimeline',
      render: (_jobTimeline, record: any) => {
        // const [startDate, endDate] = jobTimeline.split(',')
        if (record?.startDate && record?.endDate) {
          const formattedStartDate = moment(record?.startDate)?.format('DD/MM/YY')
          const formattedEndDate = moment(record?.endDate)?.format('DD/MM/YY')
          return `${formattedStartDate}-${formattedEndDate}`
        } else {
          return <span>NA</span>
        }
      },
    },
    // {
    //   title: 'Actions',
    //   dataIndex: 'id',

    //   render: (text, recode: any) => (
    //     <Candidates>
    //       {recode.status === 'Open' ? null : <AddIcon onClick={() => navigate(`/jobs/create-job/${text}`)} />}
    //       <DeleteIcon onClick={() => toggleTab(text)} />
    //     </Candidates>
    //   ),
    // },
  ]
  const handleStartData = (value: any) => {
    if (value != null) {
      const date = moment(value.$d).format('YYYY-MM-DD')
      setStartDate(date)
      if (assignedTimeline.length > 0) {
        const test = assignedTimeline.split(',')
        test[0] = date
        if (test[1]) {
          dispatch(updateAssignedTimeline(test[0] + ',' + test[1]))
        } else {
          dispatch(updateAssignedTimeline(test[0]))
        }
      } else {
        dispatch(updateAssignedTimeline(date + ','))
      }
    } else {
      setStartDate('')
      const test = assignedTimeline?.split(',')
      if (test[1]) {
        dispatch(updateAssignedTimeline(',' + test[1]))
      } else {
        dispatch(updateAssignedTimeline(''))
      }
    }
  }

  const handleEndData = (value: any) => {
    if (value != null) {
      const date = moment(value.$d).format('YYYY-MM-DD')
      if (date && startDate) {
        dispatch(updateAssignedTimeline(startDate + ',' + date))
      } else if (date) {
        dispatch(updateAssignedTimeline(',' + date))
      }
    } else {
      const test = assignedTimeline?.split(',')
      if (test[0]) {
        dispatch(updateAssignedTimeline(test[0] + ','))
      } else {
        dispatch(updateAssignedTimeline(''))
      }
    }
  }

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (isOpen && !filterButtonClicked) {
        const filterContainer = document.querySelector('.FilterContainer')
        if (filterContainer && !filterContainer.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      setFilterButtonClicked(false)
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [isOpen, filterButtonClicked])

  return (
    <Wrapper color={activeColor}>
      <TitleSection>
        <WrapperTitle>My Closed Jobs</WrapperTitle>
        <SearchSection>
          <SearchInput
            placeholder="Search Jobs"
            prefix={<SearchIcon />}
            onChange={(e) => {
              setSearchedText(e.target.value)
            }}
          />
          <FilterButton
            onClick={() => {
              setFilterButtonClicked(true)
              setIsOpen(!isOpen)
            }}
          >
            <FilterIcon />
            Filter
          </FilterButton>
          {isOpen && (
            <FilterContainer className="FilterContainer">
              <FilterTwinSection>
                <Filter>Filter</Filter>
                <Reset color={activeColor} onClick={resetFilter}>
                  Reset
                </Reset>
              </FilterTwinSection>
              <Border />
              <FilterTwinSection>
                <FilterTitleSection>Location</FilterTitleSection>
                <Hide color={activeColor}>Hide All</Hide>
              </FilterTwinSection>

              <FilterTwinSection>
                <FilterTitleSection>Assigned Timeline</FilterTitleSection>
              </FilterTwinSection>
              <FilterTwinSection>
                <DateWrapper>
                  <DateTitle>Start Date</DateTitle>
                  <div onClick={(e) => e.stopPropagation()}>
                    <DatePicker onChange={(value: any) => handleStartData(value)} />
                  </div>
                </DateWrapper>
                <DateWrapper>
                  <DateTitle>End Date</DateTitle>
                  <div onClick={(e) => e.stopPropagation()}>
                    <DatePicker
                      disabledDate={(d) => !d || d.isBefore(startDate)}
                      onChange={(value: any) => handleEndData(value)}
                    />
                  </div>
                </DateWrapper>
              </FilterTwinSection>
            </FilterContainer>
          )}
        </SearchSection>
      </TitleSection>
      <TableSection
        dataSource={getClosedJobs?.length > 0 ? getClosedJobs?.reverse() : []}
        columns={columns}
        total={getClosedJobs?.length > 0 ? getClosedJobs?.length : 0}
      />
      {/* <Modal isOpen={modal} className="modal">
        <JobDeleteModal deleteJob={deleteJob} text={jobId} toggle={() => setModal(!modal)} />
      </Modal> */}
      <Modal isOpen={successModal} className="modal">
        <SuccessModal successtoggle={() => setSuccessModal(!successModal)} />
      </Modal>
    </Wrapper>
  )
}

export default ClosedJobsContainer
