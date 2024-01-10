import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { ColumnsType } from 'antd/es/table'
import { notification } from 'antd'
import useGet from 'hooks/useGet'
import usePut from 'hooks/usePut'
import TableSection from 'components/Table'
import Modal from 'components/Modal'
import SearchInput from 'components/SearchInput'
import ReasonRejectModal from 'views/Modals/ReasonRejectModal'
import ReasonSubmitModal from 'views/Modals/ReasonSubmitModal'
import PublishJobModal from 'views/Modals/PublishJobModal'
import JobSuccessfulModal from 'views/Modals/JobSuccesfulModal'
import { AllJobsDataType } from 'interfaces'
import SearchIcon from 'assets/svg/SearchIcon'
import ThreeDotsIcon from 'assets/svg/ThreeDotsIcon'
import {
  TitleSection,
  Wrapper,
  WrapperTitle,
  SearchSection,
  JobSubTitle,
  JobTitleWrapper,
  DotsContainer,
  DotsWrapper,
  JobAction,
} from 'styles/pages/DashboardJob'

const PendingJobContainer = () => {
  const [publishModal, setPublishModal] = useState<boolean>(false)
  const [searchedText, setSearchedText] = useState('')
  const [reject, setreject] = useState(false)
  const [newId, setNewId] = useState()
  const [modal, setModal] = useState(false)
  const [jobId, setJobId] = useState('')
  const [approvalModal, setApprovalModal] = useState(false)
  const [isClickModal, setIsClickModal] = useState<{ [key: string]: boolean }>({})
  const [reasonSubmit, setReasonsubmit] = useState(false)
  const user = useSelector((state: any) => state.user?.user)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const navigate = useNavigate()
  const { mutateAsync: updateAsync } = usePut()
  const handleModal = (id: number) => {
    setApprovalModal(!approvalModal)
    setIsClickModal(() => ({
      [id]: !approvalModal,
    }))
  }

  const handleOpenPublish = (id: string) => {
    setJobId(id)
    setPublishModal(true)
  }

  const toggleTab = () => {
    setModal(!modal)
  }

  const ApproveJob = async (id: string) => {
    try {
      const response = await updateAsync({
        url: `job/jobpost/approve/${id}`,
        token: true,
      })
      if (response) {
        notification.success({
          message: 'Job Approve Successfully',
        })
        setIsClickModal(() => ({
          [id]: !approvalModal,
        }))
        refetchJob()
      }
    } catch (error: any) {
      notification.error({
        message: '',
        description: error?.message,
        duration: 2,
      })
      return { error: error?.response?.data?.message }
    }
  }

  const { data: getPendingJobs, refetch: refetchJob } = useGet(
    'job/Draft/PENDING',
    `/job/publish/jobsByStatus?status=PENDING`,
    {
      token: true,
    },
  )
  useEffect(() => {
    refetchJob()
  }, [])

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
      title: 'Created On',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (item: any) => {
        return <>{item ? moment(item).format('DD MMM YYYY') : <div>N/A</div>}</>
      },
    },

    {
      title: 'Openings',
      key: 'numberOfPositions',
      dataIndex: 'numberOfPositions',
    },
    {
      title: 'Actions',
      dataIndex: 'id',

      render: (id) => {
        return (
          <DotsContainer>
            <ThreeDotsIcon onClick={() => handleModal(id)} />
            {isClickModal[id] && (
              <DotsWrapper>
                <JobAction onClick={() => navigate(`/jobs/view/${id}`)}>View Job</JobAction>
                {user?.Role === 'Level1' ? (
                  <JobAction onClick={() => ApproveJob(id)}>Approve Job</JobAction>
                ) : (
                  <JobAction onClick={() => handleOpenPublish(id)}>Accept Job</JobAction>
                )}
                <JobAction
                  onClick={() => {
                    setNewId(id)
                    setreject(!reject)
                  }}
                >
                  Reject Job
                </JobAction>
              </DotsWrapper>
            )}

            <Modal isOpen={publishModal} className="modal">
              <PublishJobModal
                jobId={jobId}
                status={'PENDING'}
                setPublishModal={setPublishModal}
                setModal={setModal}
                rejectToggle={() => setPublishModal(!publishModal)}
              />
            </Modal>
            <Modal isOpen={reject}>
              <ReasonRejectModal
                id={newId}
                setreject={setreject}
                reasonSubmit={reasonSubmit}
                setReasonsubmit={setReasonsubmit}
                rejectToggle={() => setreject(!reject)}
              />
            </Modal>

            <Modal isOpen={reasonSubmit} className="modal">
              <ReasonSubmitModal toggle={() => setReasonsubmit(!reasonSubmit)} />
            </Modal>
          </DotsContainer>
        )
      },
    },
  ]

  return (
    <Wrapper color={activeColor}>
      <TitleSection>
        <WrapperTitle>Pending Jobs</WrapperTitle>
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
      <TableSection dataSource={getPendingJobs} columns={columns} total={getPendingJobs?.jobCount} />
      <Modal isOpen={modal} className="modal">
        <JobSuccessfulModal toggle={toggleTab} refetchJob={refetchJob} />
      </Modal>
    </Wrapper>
  )
}

export default PendingJobContainer
