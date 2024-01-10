import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { DatePicker } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { removeJob } from 'store/slice/jobDashboard'
import { resetLocationFilter, updateAssignedTimeline } from 'store/slice/jobApplicationSwitch'
import useDelete from 'hooks/useDelete'
import Modal from 'components/Modal'
import TableSection from 'components/Table'
import SearchInput from 'components/SearchInput'
import JobDeleteModal from 'views/Modals/DeleteJobModal'
import SuccessModal from 'views/Modals/SuccessModal'
import { AllJobsDataType } from 'interfaces'
import FilterIcon from 'assets/svg/FilterIcon'
import SearchIcon from 'assets/svg/SearchIcon'
import AddIcon from 'assets/svg/AddIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import CandidatesNumberIcon from 'assets/svg/CandidatesNumberIcon'
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

const OnHoldJobsContainer = () => {
  const [searchedText, setSearchedText] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [filterButtonClicked, setFilterButtonClicked] = useState(false)
  const [modal, setModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [jobId, setJobId] = useState()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const toggleTab = (text: any) => {
    setModal(!modal)
    setJobId(text)
  }
  const assignedTimeline = useSelector((state: any) => state.jobApplicationSwitch.assignedTimeline)
  const { mutateAsync } = useDelete()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allJobs = useSelector((state: any) => state.JobDashBoardData.allJobsData)

  const [startDate, setStartDate] = useState('')
  const test = allJobs?.data?.map((item: any) => item.result)
  const resetFilter = () => {
    dispatch(resetLocationFilter())
  }
  const deleteJob = async (text: any) => {
    try {
      await mutateAsync({
        url: '/job',
        payload: { jobPostId: text },
        token: true,
      })
      dispatch(removeJob({ text }))
      setModal(false)
      setSuccessModal(true)
    } catch (error: any) {
      return { error: error?.response?.data?.message }
    }
  }

  const columns: ColumnsType<AllJobsDataType> = [
    {
      title: 'Job Title',
      key: 'jobTitle',
      dataIndex: 'jobTitle',
      render: (jobTitle: any, data: any) => (
        <JobTitleWrapper
          color={activeColor}
          onClick={() => {
            navigate(`/jobs/view/${data?.id}`)
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
      render: (item: any, data: any) => (
        <Candidates
          color={activeColor}
          onClick={() => {
            navigate(`/jobs/job-description/candidate/${data?.id}`, {
              state: { date: data?.createdAt, jobTitle: data?.jobTitle },
            })
          }}
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
      render: (id, recode: any) => (
        <Candidates color={activeColor}>
          {recode.status === 'Open' ? null : <AddIcon onClick={() => navigate(`/jobs/create-job/${id}`)} />}
          <DeleteIcon onClick={() => toggleTab(id)} />
        </Candidates>
      ),
    },
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
        <WrapperTitle>My On-Hold Jobs</WrapperTitle>
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
      <TableSection dataSource={test?.reverse()} columns={columns} total={allJobs?.jobCount} />
      <Modal isOpen={modal} className="modal">
        <JobDeleteModal deleteJob={deleteJob} text={jobId} toggle={() => setModal(!modal)} />
      </Modal>
      <Modal isOpen={successModal} className="modal">
        <SuccessModal successtoggle={() => setSuccessModal(!successModal)} />
      </Modal>
    </Wrapper>
  )
}

export default OnHoldJobsContainer
