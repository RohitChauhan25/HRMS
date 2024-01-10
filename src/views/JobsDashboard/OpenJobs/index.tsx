import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { DatePicker } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { removeJob } from 'store/slice/jobDashboard'
import { resetLocationFilter, updateAssignedTimeline } from 'store/slice/jobApplicationSwitch'
import useGet from 'hooks/useGet'
import useDelete from 'hooks/useDelete'
import TableSection from 'components/Table'
import Modal from 'components/Modal'
import SearchInput from 'components/SearchInput'
import JobDeleteModal from 'views/Modals/DeleteJobModal'
import SuccessModal from 'views/Modals/SuccessModal'
import { AllJobsDataType } from 'interfaces'
import FilterIcon from 'assets/svg/FilterIcon'
import SearchIcon from 'assets/svg/SearchIcon'
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

const OpenJobsContainer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [filterButtonClicked, setFilterButtonClicked] = useState(false)
  const [modal, setModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [searchedText, setSearchedText] = useState('')
  const [jobId] = useState()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const resetFilter = () => {
    dispatch(resetLocationFilter())
    setIsCheckedMap({})
  }
  const assignedTimeline = useSelector((state: any) => state.jobApplicationSwitch.assignedTimeline)
  const { mutateAsync } = useDelete()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState('')
  const [, setIsCheckedMap] = useState<{ [key: string]: boolean }>({})

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
      render: (jobTitle: any, record: any) => (
        <JobTitleWrapper
          color={activeColor}
          onClick={() => {
            navigate(`/jobs/view/${record?.id}`)
          }}
        >
          {jobTitle}
          <JobSubTitle>{jobTitle}</JobSubTitle>
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
      title: 'Hiring Lead',
      key: 'hiringLead',
      dataIndex: 'hiringLead',
      render: (_hiringLead, record: any) => {
        // const [startDate, endDate] = jobTimeline.split(',')
        if (record?.hiringLead) {
          return <span>{record?.hiringLead}</span>
        } else {
          return <span>NA</span>
        }
      },
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
  ]

  // const { data: getOpenJobs, refetch: refetchJob } = useGet(
  //   'job/Draft/job',
  //   `/job/publish/jobsByStatus?status=PUBLISHED`,
  //   {
  //     token: true,
  //   },
  // )
  const { data: getOpenJobs, refetch: refetchOpenJobs } = useGet('getOpenJobs', `job/jobpost/openJobs`, {
    token: true,
  })

  useEffect(() => {
    refetchOpenJobs()
  }, [])

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
        <WrapperTitle>My Open Jobs</WrapperTitle>
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
        dataSource={getOpenJobs?.length > 0 ? getOpenJobs?.reverse() : []}
        columns={columns}
        total={getOpenJobs?.length > 0 ? getOpenJobs?.length : 0}
      />
      <Modal isOpen={modal} className="modal">
        <JobDeleteModal deleteJob={deleteJob} text={jobId} toggle={() => setModal(!modal)} />
      </Modal>
      <Modal isOpen={successModal} className="modal">
        <SuccessModal successtoggle={() => setSuccessModal(!successModal)} />
      </Modal>
    </Wrapper>
  )
}

export default OpenJobsContainer
