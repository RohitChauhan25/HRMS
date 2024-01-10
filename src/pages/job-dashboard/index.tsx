import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { TabsProps } from 'antd'
import { JobRoute } from 'constants/routes'
import { RootState } from 'store/store'
import { addJobDashBoardData } from 'store/slice/jobDashboard'
import { removeJobPostId } from 'store/slice/jobPost'
import { updateAssignedTimeline, updateCurrentPage, updatepageSize } from 'store/slice/jobApplicationSwitch'
import TabsContainer from 'components/Tabs'
import { items } from 'views/JobsDashboard/TabsData'
import { HeadSection, OpeningButton, Title, TabContainer } from 'styles/pages/DashboardJob'
import { Container, ContentWrapper } from 'styles/pages/CreateJob'

const DashboardJob = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    currentPage,
    pageSize,
    filterStatus,
    assignedTimeline,
    refetch,
    location,
    startDate,
    endDate,
    openJobsLocation,
  } = useSelector((state: RootState) => state.jobApplicationSwitch)
  localStorage.removeItem('postId')
  localStorage.removeItem('jobAppId')
  const user = useSelector((state: any) => state.user?.user)
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const [tabState, setTabState] = useState<TabsProps['items']>([])
  const [activeTab, setActiveTab] = useState('all')
  const [localTimeLine, setLocalTimeLine] = useState<any>('')
  const timeLine = assignedTimeline?.split(',')
  useEffect(() => {
    dispatch(removeJobPostId())
    const tabHeaders = items ? [...items] : []
    // eliminate all jobs in case of team members
    switch (user?.Role) {
      case 'Super Admin':
        tabHeaders?.splice(5, 1)
        break
      case 'Hiring Lead':
        tabHeaders?.splice(3, 3)
        tabHeaders?.splice(5, 1)
        break
      case 'Level 1':
        tabHeaders?.splice(5, 1)
        break
      case 'Level 2':
        tabHeaders?.splice(4, 1)
        break
      case 'Project Manager':
        tabHeaders?.splice(4, 1)
        break
      case 'Recruiter':
        tabHeaders?.splice(3, 3)
        // tabHeaders?.splice(4, 1)
        break
      default:
        tabHeaders?.splice(1, 6)
        break
    }

    setTabState(tabHeaders)
  }, [user])

  let payload: any
  payload

  useEffect(() => {
    if ((timeLine[0] && timeLine[1] === '') || (timeLine[0] && timeLine[1] === undefined)) {
      setLocalTimeLine('')
    } else setLocalTimeLine(assignedTimeline)
  }, [assignedTimeline])

  const getDashboard = async () => {
    switch (activeTab) {
      case 'all':
        payload = {
          status: 'all',
          page: currentPage,
          limit: pageSize,
          filterStatus: filterStatus,
          assignedTimeline: localTimeLine,
          location: location,
        }
        break
      case 'open':
        payload = {
          status: 'open',
          page: currentPage,
          limit: pageSize,
          assignedTimeline: localTimeLine,
          location: openJobsLocation,
        }
        break
      case 'closed':
        payload = {
          status: 'closed',
          page: currentPage,
          limit: pageSize,
          assignedTimeline: localTimeLine,
          location: location,
        }
        break
      case 'on-hold':
        payload = {
          status: 'on-hold',
          page: currentPage,
          limit: pageSize,
          assignedTimeline: localTimeLine,
          location: location,
        }
        break
      case 'draft':
        payload = { status: 'draft', page: currentPage, limit: pageSize, from: startDate, to: endDate }
        break
      case 'pending':
        payload = { status: 'pending', page: currentPage, limit: pageSize }
        break
      default:
        break
    }
  }

  useEffect(() => {
    getDashboard()
  }, [
    activeTab,
    currentPage,
    pageSize,
    refetch,
    filterStatus,
    localTimeLine,
    location,
    startDate,
    endDate,
    openJobsLocation,
    user,
  ])

  const onChange = (key: any) => {
    dispatch(addJobDashBoardData({ allJobsData: [] }))
    dispatch(updateCurrentPage(1))
    dispatch(updatepageSize(10))
    setActiveTab(key)
    dispatch(updateAssignedTimeline(''))
  }

  const handleCreateJob = () => {
    dispatch(removeJobPostId())
    localStorage.removeItem('postId')
    // const postId = localStorage.getItem('postId')
    // if (postId) {
    //   localStorage.removeItem('postId')
    // }

    navigate(JobRoute?.path)
  }

  return (
    <Container>
      <ContentWrapper>
        <HeadSection>
          <Title>Jobs</Title>
          {PermittedEndPoint['/job/jobPost']?.includes('CREATE') ? (
            <OpeningButton onClick={handleCreateJob} style={{ backgroundColor: activeColor }}>
              Create Job Opening
            </OpeningButton>
          ) : null}
        </HeadSection>
        <TabContainer color={activeColor}>
          <TabsContainer items={tabState} onChange={onChange} />
        </TabContainer>
      </ContentWrapper>
    </Container>
  )
}

export default DashboardJob
