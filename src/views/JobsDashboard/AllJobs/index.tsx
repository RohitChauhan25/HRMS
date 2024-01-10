import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker, notification } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import useDelete from 'hooks/useDelete'
import useGet from 'hooks/useGet'
import usePost from 'hooks/usePost'
import { resetFilterStatus, resetLocationFilter, updateAssignedTimeline } from 'store/slice/jobApplicationSwitch'
import { RootState } from 'store/store'
import { CandidateRoute } from 'constants/routes'
import SearchInput from 'components/SearchInput'
import TableSection from 'components/Table'
import Modal from 'components/Modal'
import EditJobTimeLineModal from 'views/Modals/EditJobTimeLineModal'
import JobDeleteModal from 'views/Modals/DeleteJobModal'
import { AllJobsDataType, ILocation } from 'interfaces'
import SearchIcon from 'assets/svg/SearchIcon'
import AddIcon from 'assets/svg/AddIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import CandidatesNumberIcon from 'assets/svg/CandidatesNumberIcon'
import FilterIcon from 'assets/svg/FilterIcon'
import hideEye from 'assets/images/hideEye.png'
import EyeIcon from 'assets/svg/EyeIcon'
import {
  Candidates,
  JobTitleWrapper,
  JobSubTitle,
  ActionIconWrapper,
  HideEye,
  SearchButton,
} from 'styles/pages/DashboardJob'
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
  FilterType,
  DateWrapper,
  DateTitle,
} from 'styles/pages/DashboardJob'

const AllJobsContainer = () => {
  const [searchedText, setSearchedText] = useState('')
  const [filterButtonClicked, setFilterButtonClicked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mutateAsync } = useDelete()
  const { mutateAsync: mutateAsyncPost } = usePost()
  const [modal, setModal] = useState(false)
  const [timeLineModal, setTimeLineModal] = useState(false)
  const [publishedJob, setPublishedJob] = useState(false)
  const [jobId, setJobId] = useState()
  const [startDate, setStartDate] = useState<any>('')
  const [startingDate, setStartingDate] = useState(null)
  const [endDate, setEndDate] = useState('')
  const [EndDateData, setEndDateDate] = useState(null)
  const [isCheckedMap, setIsCheckedMap] = useState<{ [key: string]: boolean }>({})
  const statusArray = ['Open', 'Closed']
  const allJobs = useSelector((state: any) => state.JobDashBoardData.allJobsData)
  const savedJobs = allJobs?.data?.map((item: any) => item.result)
  const [AllJObs, setAllJobs] = useState([])
  const [hideLocations, setHideLocations] = useState<boolean>(false)
  const [hideAll, setHideAll] = useState<boolean>(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)
  const [filterPayload, setFilterPayload] = useState<any>({
    status: {
      Open: true,
      Closed: true,
    },
    location: [],
  })
  const { data: getAllJobs, refetch: refetchJob } = useGet('job/alljobs', `/job/jobpost`, {
    token: true,
  })

  const { data: getLocation, refetch: refetchLocation } = useGet('job-location', `job/masters/location`, {
    token: true,
  })

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

  const toggleTimeLineModal = () => {
    setTimeLineModal(!timeLineModal)
  }

  const toggleTab = (text: any) => {
    setModal(!modal)
    setJobId(text)
  }

  const handelFilter = (info: string, type: string) => {
    type === 'location'
      ? setFilterPayload({
          ...filterPayload,
          location: filterPayload?.location?.filter((item: string) => item != info),
        })
      : setFilterPayload({
          ...filterPayload,
          status: {
            Open: info === 'Open' ? false : filterPayload.status.Open,
            Closed: info === 'Closed' ? false : filterPayload.status.Closed,
          },
        })
  }

  const removeFilter = (info: string, type: string) => {
    type === 'location'
      ? setFilterPayload({
          ...filterPayload,
          location: [...filterPayload.location, info],
        })
      : setFilterPayload({
          ...filterPayload,
          status: {
            Open: info === 'Open' ? true : filterPayload.status.Open,
            Closed: info === 'Closed' ? true : filterPayload.status.Closed,
          },
        })
  }

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

  const handleEndData = (value: any) => {
    if (value != null) {
      setEndDateDate(value)
      const date = moment(value.$d).format('YYYY-MM-DD')
      setEndDate(date + 'T00:00:00.000Z')
    } else {
      setEndDateDate(null)
      setEndDate('')
    }
  }

  const [allHiringLead, setAllHiringLead] = useState<string[]>([])
  const [, setFilteredTest] = useState<any[]>([])

  const handleHiringLead = (item: any) => {
    setIsCheckedMap((prevState) => ({
      ...prevState,
      [item]: true,
    }))
    const hiringLeadArr = []

    hiringLeadArr.push(item)
    setAllHiringLead([...allHiringLead, ...hiringLeadArr])
  }

  const RemoveHiringLead = (item: any) => {
    setIsCheckedMap((prevState) => ({
      ...prevState,
      [item]: false,
    }))
    const index = allHiringLead.indexOf(item)
    allHiringLead.splice(index, 1)
    filterData()
  }

  const filterData = () => {
    const filteredData = savedJobs?.filter((item: any) => allHiringLead.includes(item.hiringLead))
    setFilteredTest(filteredData)
  }

  useEffect(() => {
    filterData()
  }, [allHiringLead, allJobs])

  useEffect(() => {
    refetchJob()
    refetchLocation()
  }, [])

  useEffect(() => {
    setAllJobs(getAllJobs)
  }, [getAllJobs])

  useEffect(() => {
    setFilterPayload({
      ...filterPayload,
      location: getLocation?.map((location: any) => location.id),
    })
  }, [getLocation])

  const handleLocationHideAll = () => {
    setHideLocations(!hideLocations)
  }

  const handleHideAllClick = () => {
    setHideAll(!hideAll)
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
        return String(record.jobTitle).toLowerCase().includes(value.toLowerCase())
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
      render: (item: any, data: any) => {
        return (
          <Candidates
            color={activeColor}
            onClick={() => {
              navigate(CandidateRoute?.path)
              return data
            }}
          >
            <CandidatesNumberIcon />
            {item}
          </Candidates>
        )
      },
    },
    {
      title: 'Hiring Lead',
      key: 'hiringLead',
      dataIndex: 'hiringLead',
      render: (_hiringLead, record: any) => {
        if (record?.hiringLead) {
          return <span>{record?.hiringLead}</span>
        } else {
          return <span>Na</span>
        }
      },
    },

    {
      title: 'Timeline',
      key: 'createdAt',
      dataIndex: 'jobTimeline',
      render: (_jobTimeline, record: any) => {
        if (record?.startDate && record?.endDate) {
          const formattedStartDate = moment(record?.startDate)?.format('DD/MM/YY')
          const formattedEndDate = moment(record?.endDate)?.format('DD/MM/YY')
          return `${formattedStartDate}-${formattedEndDate}`
        } else {
          return <span>Na</span>
        }
      },
    },
    {
      title: 'Status',
      key: 'JobStatus',
      dataIndex: 'JobStatus',
      render: (item: any) => {
        return item.status
      },
    },

    {
      title: 'Actions',
      dataIndex: 'id',
      render: (id: string, record: any) => {
        return (
          <ActionIconWrapper color={activeColor}>
            {record.subStatus === 'Open'
              ? null
              : PermittedEndPoint['/job/jobPost']?.includes('UPDATE') && (
                  <AddIcon
                    onClick={() => {
                      localStorage.removeItem('postId')
                      localStorage.removeItem('jobAppId')
                      record.JobStatus.status === 'PUBLISHED'
                        ? (setPublishedJob(record), toggleTimeLineModal())
                        : navigate(`/jobs/edit/${id}`)
                    }}
                  />
                )}
            {record?.JobStatus?.status === 'DRAFT' ? (
              <DeleteIcon className="deleteIcon" onClick={() => toggleTab(id)} />
            ) : null}
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

  const resetFilter = () => {
    dispatch(resetFilterStatus())
    dispatch(resetLocationFilter())
    dispatch(updateAssignedTimeline(''))
    setAllHiringLead([])
    setFilteredTest([])
    setIsCheckedMap({})
    setStartingDate(null)
    setEndDateDate(null)
    setEndDate('')
    setAllJobs(getAllJobs)
    setIsOpen(false)
  }

  const filterJobs = async () => {
    const payload = {
      ...filterPayload,
      startDate: startDate,
      endDate: endDate,
    }
    try {
      const res = await mutateAsyncPost({
        url: `/job/jobpost/filter`,
        payload: payload,
        token: true,
      })
      if (res) {
        if (res?.message) {
          setAllJobs([])
          setIsOpen(false)
        } else {
          setAllJobs(res)
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
        setModal(false)
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

  const uniqueLead = savedJobs
    ?.map((item: any) => item?.hiringLead)
    ?.filter((hiringLead: any, index: number, currentVal: any) => currentVal?.indexOf(hiringLead) === index)

  // Use deboucing for search performance optimization
  const debounce = (func: any) => {
    let timeoutId: any
    return (...args: any) => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), 1000)
    }
  }

  const SearchJob = (e: any) => {
    setSearchedText(e.target.value)
  }

  const handleInputChange = debounce(SearchJob)

  return (
    <Wrapper color={activeColor}>
      <TitleSection>
        <WrapperTitle>All Jobs</WrapperTitle>
        <SearchSection>
          <SearchInput placeholder="Search Jobs" prefix={<SearchIcon />} onChange={handleInputChange} />
          <FilterButton
            id="filterButton"
            onClick={() => {
              setFilterButtonClicked(true)
              setIsOpen(!isOpen)
            }}
          >
            <FilterIcon />
            Filter
          </FilterButton>
          {isOpen && (
            <FilterContainer>
              <FilterTwinSection>
                <Filter>Filter</Filter>
                <Reset onClick={resetFilter} color={activeColor}>
                  Reset
                </Reset>
              </FilterTwinSection>
              <Border />
              <FilterTwinSection>
                <FilterTitleSection>Filter</FilterTitleSection>
                <Hide color={activeColor} onClick={handleHideAllClick}>
                  Hide All
                </Hide>
              </FilterTwinSection>
              {!hideAll && (
                <>
                  {statusArray.map((item, index) => {
                    return (
                      <FilterTwinSection key={index}>
                        <FilterType>{item}</FilterType>
                        <Hide color={activeColor}>
                          {filterPayload?.status[`${item}`] ? (
                            <EyeIcon onClick={() => handelFilter(item, 'status')} />
                          ) : (
                            <HideEye src={hideEye} alt="no" onClick={() => removeFilter(item, 'status')} />
                          )}
                        </Hide>
                      </FilterTwinSection>
                    )
                  })}
                  <FilterTwinSection>
                    <FilterTitleSection>Location</FilterTitleSection>
                    <Hide color={activeColor} onClick={handleLocationHideAll}>
                      Hide All
                    </Hide>
                  </FilterTwinSection>
                  {getLocation?.map((data: ILocation, index: number) => {
                    return (
                      <FilterTwinSection key={index} style={{ marginBottom: hideLocations ? '0' : '10px' }}>
                        <FilterType style={{ display: hideLocations ? 'none' : 'block' }}>{data?.name}</FilterType>
                        <Hide color={activeColor} style={{ display: hideLocations ? 'none' : 'block' }}>
                          {filterPayload?.location?.includes(data?.id) ? (
                            <EyeIcon
                              onClick={() => {
                                handelFilter(data?.id, 'location')
                              }}
                            />
                          ) : (
                            <HideEye src={hideEye} alt="no" onClick={() => removeFilter(data?.id, 'location')} />
                          )}
                        </Hide>
                      </FilterTwinSection>
                    )
                  })}

                  {uniqueLead?.map((item: any, index: number) => {
                    if (item === undefined) {
                      return null
                    } else
                      return (
                        <FilterTwinSection key={index}>
                          <FilterType>{item}</FilterType>
                          <Hide color={activeColor}>
                            {!isCheckedMap[item] ? (
                              <EyeIcon
                                onClick={() => {
                                  handleHiringLead(item)
                                  setIsOpen(true)
                                }}
                              />
                            ) : (
                              <HideEye
                                src={hideEye}
                                onClick={() => {
                                  RemoveHiringLead(item)
                                  setIsOpen(true)
                                }}
                              />
                            )}
                          </Hide>
                        </FilterTwinSection>
                      )
                  })}
                </>
              )}
              <FilterTwinSection>
                <FilterTitleSection>Assigned Timeline</FilterTitleSection>
              </FilterTwinSection>
              <FilterTwinSection>
                <DateWrapper>
                  <DateTitle>Start Date</DateTitle>
                  <div onClick={(e) => e.stopPropagation()}>
                    <DatePicker value={startingDate} onChange={(value: any) => handleStartData(value)} />
                  </div>
                </DateWrapper>
                <DateWrapper>
                  <DateTitle>End Date</DateTitle>
                  <div onClick={(e) => e.stopPropagation()}>
                    <DatePicker
                      value={EndDateData}
                      disabledDate={(d) => !d || d.isBefore(startDate)}
                      onChange={(value: any) => handleEndData(value)}
                    />
                  </div>
                </DateWrapper>
              </FilterTwinSection>
              <SearchButton
                onClick={filterJobs}
                disabled={(startDate && !endDate) || (!startDate && endDate) ? true : false}
                style={{ backgroundColor: activeColor }}
              >
                Ok
              </SearchButton>
            </FilterContainer>
          )}
        </SearchSection>
      </TitleSection>
      <TableSection dataSource={AllJObs} columns={columns} />
      <Modal isOpen={modal} className="modal" hideModal={() => setModal(false)}>
        <JobDeleteModal text={jobId} toggle={() => setModal(!modal)} deleteJOb={deleteJOb} />
      </Modal>
      <Modal isOpen={timeLineModal} className="timeline_modal">
        <EditJobTimeLineModal toggleTimeLineModal={toggleTimeLineModal} jobTimeline={publishedJob} />
      </Modal>
    </Wrapper>
  )
}

export default AllJobsContainer
