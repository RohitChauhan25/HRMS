import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DatePicker, notification } from 'antd'
import { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import { useSelector } from 'react-redux'
import useGet from 'hooks/useGet'
import usePost from 'hooks/usePost'
import useDelete from 'hooks/useDelete'
import TableSection from 'components/Table'
import SearchInput from 'components/SearchInput'
import Modal from 'components/Modal'
import JobDeleteModal from 'views/Modals/DeleteJobModal'
import { AllJobsDataType } from 'interfaces'
import AddIcon from 'assets/svg/AddIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import FilterIcon from 'assets/svg/FilterIcon'
import SearchIcon from 'assets/svg/SearchIcon'
import {
  TitleSection,
  Wrapper,
  WrapperTitle,
  SearchSection,
  FilterButton,
  FilterContainer,
  FilterTwinSection,
  FilterTitleSection,
  Hide,
  DateWrapper,
  DateTitle,
  Candidates,
  JobSubTitle,
  JobTitleWrapper,
  Border,
  Filter,
  Reset,
  SearchButton,
} from 'styles/pages/DashboardJob'

const DraftsContainer = () => {
  // const [successModal, setSuccessModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [filterButtonClicked, setFilterButtonClicked] = useState(false)
  const [searchedText, setSearchedText] = useState('')
  const { mutateAsync: mutateAsyncPost } = usePost()
  const [startDate, setStartDate] = useState<any>('')
  const [startingDate, setStartingDate] = useState(null)
  const [endDate, setEndDate] = useState('')
  const [EndDateData, setEndDateDate] = useState(null)
  const [AllDraftsJobs, setAllDraftsJobs] = useState([])
  const [modal, setModal] = useState(false)
  const [jobId, setJobId] = useState()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const navigate = useNavigate()
  const { mutateAsync } = useDelete()

  const user = useSelector((state: any) => state.user?.user)
  const isSuperAdmin = user?.Role === 'Super Admin'

  const { data: getDraftJobs, refetch: refetchJob } = useGet(
    'job/Draft/job',
    `/job/publish/jobsByStatus?status=DRAFT`,
    {
      token: true,
    },
  )

  useEffect(() => {
    refetchJob()
  }, [])

  useEffect(() => {
    setAllDraftsJobs(getDraftJobs)
  }, [getDraftJobs])

  const resetFilter = () => {
    setStartingDate(null)
    setEndDateDate(null)
    setEndDate('')
    setIsOpen(false)
    setAllDraftsJobs(getDraftJobs)
  }
  const filterJobs = async () => {
    const payload = {
      status: 'DRAFT',
      startDate: startDate,
      endDate: endDate,
    }
    try {
      const res = await mutateAsyncPost({
        url: `/job/jobpost/search`,
        payload: payload,
        token: true,
      })
      if (res) {
        if (res?.message) {
          setAllDraftsJobs([])
          setIsOpen(false)
        } else {
          setAllDraftsJobs(res)
          setIsOpen(false)
        }
      }
    } catch (error: any) {
      if (error?.response?.data?.statusCode) {
        notification.error({
          message: '',
          description: error?.response?.data?.message,
          duration: 2,
        })
      }
    }
  }
  //deleting jobpost
  const deleteJOb = async (id: string) => {
    try {
      const res = await mutateAsync({
        url: `/job/jobpost/${id}`,
        token: true,
      })

      if (res) {
        notification.success({
          message: '',
          description: 'Job is deleted successfully!',
        })
        refetchJob()
        setModal(false)
      }
    } catch (error: any) {
      if (error?.response?.data?.statusCode) {
        notification.error({
          message: '',
          description: error?.response?.data?.message,
          duration: 2,
        })
        setModal(false)
      }
    }
  }
  const toggleTab = (text: any) => {
    setModal(!modal)
    setJobId(text)
  }

  const columns: ColumnsType<AllJobsDataType> = [
    {
      title: 'Job Title',
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
      title: 'Created',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (item: any) => {
        return <>{item ? moment(item).format('DD MMM YYYY') : <div className="">N/A</div>}</>
      },
    },
    isSuperAdmin
      ? {
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
        }
      : {},
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (id: string, recode: any) => {
        return (
          <Candidates color={activeColor}>
            {recode.status === 'Open' ? null : (
              <AddIcon
                onClick={() => {
                  localStorage.removeItem('postId')
                  localStorage.removeItem('jobAppId')
                  navigate(`/jobs/edit/${id}`)
                }}
              />
            )}
            <DeleteIcon className="deleteIcon" onClick={() => toggleTab(id)} />
          </Candidates>
        )
      },
    },
  ]

  const handleStartData = (value: any) => {
    if (value != null) {
      setStartingDate(value)
      const date = moment(value.$d).format('YYYY-MM-DD')
      setStartDate(date + 'T00:00:00.000Z')
    } else {
      setStartingDate(null)
      setStartDate('')
    }
  }

  const handleEndDate = (value: any) => {
    if (value != null) {
      setEndDateDate(value)
      const date = moment(value.$d).format('YYYY-MM-DD')
      setEndDate(date + 'T00:00:00.000Z')
    } else {
      setEndDateDate(null)
      setEndDate('')
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
        <WrapperTitle>My Drafts</WrapperTitle>
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
            <>
              <FilterContainer className="FilterContainer">
                <FilterTwinSection>
                  <Filter>Filter</Filter>
                  <Reset color={activeColor} onClick={resetFilter}>
                    Reset
                  </Reset>
                </FilterTwinSection>
                <Border />
                <FilterTwinSection>
                  <FilterTitleSection>Created</FilterTitleSection>
                </FilterTwinSection>
                <FilterTwinSection>
                  <DateWrapper>
                    <DateTitle>From</DateTitle>
                    <div onClick={(e) => e.stopPropagation()}>
                      <DatePicker value={startingDate} onChange={(value: any) => handleStartData(value)} />
                    </div>
                  </DateWrapper>
                  <DateWrapper>
                    <DateTitle>To</DateTitle>
                    <div onClick={(e) => e.stopPropagation()}>
                      <DatePicker
                        value={EndDateData}
                        disabledDate={(d) => !d || d.isBefore(startDate)}
                        onChange={(value: any) => handleEndDate(value)}
                      />
                    </div>
                  </DateWrapper>
                </FilterTwinSection>
                <FilterTwinSection>
                  <FilterTitleSection>Hiring Manager</FilterTitleSection>
                  <Hide color={activeColor}>Hide All</Hide>
                </FilterTwinSection>
                <SearchButton
                  onClick={filterJobs}
                  disabled={startDate && endDate ? false : true}
                  style={{ backgroundColor: activeColor }}
                >
                  Ok
                </SearchButton>
              </FilterContainer>
            </>
          )}
        </SearchSection>
      </TitleSection>

      <TableSection dataSource={AllDraftsJobs} columns={columns} total={getDraftJobs?.jobCount} />

      <Modal isOpen={modal} className="modal">
        {/* <SuccessModal successtoggle={() => setSuccessModal(!successModal)} /> */}
        <JobDeleteModal text={jobId} toggle={() => setModal(!modal)} deleteJOb={deleteJOb} />
      </Modal>
    </Wrapper>
  )
}

export default DraftsContainer
