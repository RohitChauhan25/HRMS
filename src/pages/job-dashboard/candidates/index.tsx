import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useDelete from 'hooks/useDelete'
import useGet from 'hooks/useGet'
import { JobDashboardRoute } from 'constants/routes'
import CandidateRecord from 'views/JobsDashboard/CandidateRecord'
import CandidateTable from 'views/JobsDashboard/CandidateRecordTable'
import RightIcon from 'assets/svg/RightArrowIcon'
import {
  Container,
  ContentWrapper,
  TitleSection,
  JobCreateTitle,
  JobTitle,
  DetailContainer,
} from 'styles/pages/CreateJob'
import {
  JobTitleContainer,
  JobNameContainer,
  JobName,
  JobType,
  TimelineContainer,
  TypeName,
  DaysNumber,
} from 'styles/pages/JobDescription'

const CandidateContainer = () => {
  const [jobData, setJobData] = useState<any>()
  const { mutateAsync } = useDelete()
  const navigate = useNavigate()
  const { id } = useParams()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const { data: getJobData, refetch: refetchJobData } = useGet('getJobData', `/job/jobPost/${id}`, {
    token: true,
  })

  useEffect(() => {
    setJobData(getJobData)
  }, [getJobData])

  useEffect(() => {
    refetchJobData()
  }, [])

  const deleteCandidate = async (text: any, jobPostId: number) => {
    try {
      await mutateAsync({
        url: `/job/candidate`,
        payload: { id: text, jobPostId: jobPostId },
        token: true,
      })
    } catch (error: any) {
      return { error: error?.response?.data?.message }
    }
  }

  deleteCandidate

  return (
    <Container>
      <ContentWrapper>
        <TitleSection>
          <JobTitle
            color={activeColor}
            onClick={() => {
              localStorage.removeItem('postId')
              navigate(JobDashboardRoute?.path)
            }}
          >
            Jobs
          </JobTitle>
          <RightIcon />
          <JobCreateTitle
            onClick={() => {
              navigate(-1)
            }}
            color={activeColor}
          >
            Job: {jobData?.jobTitle}
          </JobCreateTitle>
          <RightIcon />
          <JobCreateTitle color={activeColor}>Candidates</JobCreateTitle>
        </TitleSection>
        <JobTitleContainer>
          <JobNameContainer>
            <JobName>{jobData?.jobTitle}</JobName>
            <JobType>Finance. Remote Worker</JobType>
          </JobNameContainer>
          <TimelineContainer>
            <TypeName>Open:</TypeName>
            <DaysNumber>24 Days</DaysNumber>
          </TimelineContainer>
        </JobTitleContainer>
        <DetailContainer>
          <CandidateRecord />
          <CandidateTable />
        </DetailContainer>
      </ContentWrapper>
    </Container>
  )
}

export default CandidateContainer
