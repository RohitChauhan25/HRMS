import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { TabsProps } from 'antd'
import moment from 'moment'
import SelectContainer from 'components/Select'
import TabsContainer from 'components/Tabs'
import ClosedJobsContainer from 'views/JobsDashboard/ClosedJobs'
import CandidateInfoIcon from 'assets/svg/CandidatesInfoIcon'
import JobWorkflowIcon from 'assets/svg/JobWorkFlowIcon'
import EmailIcon from 'assets/svg/EmailIcon'
import JobWorkflow from 'pages/job-dashboard/candidates/job-workflow'
import RightIcon from 'assets/svg/RightArrowIcon'
import { TabContainer } from 'styles/pages/DashboardJob'
import { TabLabel } from 'styles/pages/DashboardJob'
import { Container, ContentWrapper, TitleSection, JobCreateTitle, JobTitle } from 'styles/pages/CreateJob'
import {
  JobTitleContainer,
  JobNameContainer,
  JobName,
  JobType,
  TimelineContainer,
  JobStatusContainer,
  StatusTypeSelect,
  JobStatus,
} from 'styles/pages/JobDescription'
import CandidateInfoContainer from 'views/CandidateDetails/CandidateInfo'

const CandidateDetails = () => {
  const { state } = useLocation()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const onChange = (key: string) => {
    return key
  }

  const items: TabsProps['items'] = [
    {
      key: 'info',
      label: (
        <TabLabel>
          <CandidateInfoIcon />
          Candidate Info
        </TabLabel>
      ),
      children: <CandidateInfoContainer />,
    },
    {
      key: 'workflow',
      label: (
        <TabLabel>
          <JobWorkflowIcon />
          Job Workflow
        </TabLabel>
      ),
      children: <JobWorkflow />,
    },
    {
      key: 'email',
      label: (
        <TabLabel>
          <EmailIcon />
          Email
        </TabLabel>
      ),
      children: <ClosedJobsContainer />,
    },
  ]

  const { control } = useForm()

  return (
    <Container>
      <ContentWrapper>
        <TitleSection>
          <JobTitle color={activeColor}>Jobs </JobTitle>
          <RightIcon />
          <JobTitle color={activeColor}>Job: Financial Analyst</JobTitle>
          <RightIcon />
          <JobTitle color={activeColor}>Candidates</JobTitle>
          <RightIcon />
          <JobCreateTitle color={activeColor}>
            Candidate: {state?.firstName} {state?.lastName}
          </JobCreateTitle>
        </TitleSection>
        <JobTitleContainer>
          <JobNameContainer>
            <JobName>
              {state?.firstName} {state?.lastName}
            </JobName>
            <JobType>
              Applied on{' '}
              {state?.appliedDate ? moment(state?.appliedDate).format('DD MMM YYYY') : <div className="">N/A</div>}, (17
              Days ago)
            </JobType>
          </JobNameContainer>
          <TimelineContainer>
            <JobStatusContainer>
              <JobStatus>Stage: </JobStatus>
              <StatusTypeSelect>
                <SelectContainer control={control} name="statusType" placeholder="Type" />
              </StatusTypeSelect>
            </JobStatusContainer>
          </TimelineContainer>
        </JobTitleContainer>
        <TabContainer color={activeColor}>
          <TabsContainer items={items} onChange={onChange} />
        </TabContainer>
      </ContentWrapper>
      {/* <Feedback /> */}
    </Container>
  )
}

export default CandidateDetails
