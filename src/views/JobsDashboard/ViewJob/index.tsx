import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import useGet from 'hooks/useGet'
import { JobDashboardRoute } from 'constants/routes'
import { PlaceHolder } from 'constants/placeholderData'
import { EditJobOpening, PreviewJob } from 'constants/labels'
import Button from 'components/Button'
import SelectContainer from 'components/Select'
import Modal from 'components/Modal'
import AddMemberModal from 'views/Modals/AddMemeberModal'
import EditJobTimeLineModal from 'views/Modals/EditJobTimeLineModal'
import RightIcon from 'assets/svg/RightArrowIcon'
import Avatar from 'assets/images/Avatar.png'
import {
  ViewJobRightWrapper,
  JobDataWrapper,
  Description,
  JobFlowWrapper,
  Heading,
  JobInfo,
  JobTitle,
} from 'styles/views/Jobs/PublishJob'
import {
  Container,
  ContentWrapper,
  TitleSection,
  JobCreateTitle,
  JobHeading,
  DetailContainer,
} from 'styles/pages/CreateJob'
import {
  JobTitleContainer,
  JobNameContainer,
  JobName,
  JobType,
  EditJobWrapper,
  TimelineContainer,
  TypeName,
  DaysNumber,
  PreviewJobWrapper,
  PreviewTitle,
  PreviewHeading,
  PreviewWrapper,
  TeamMemberDetailWrapper,
  ButtonWrapper,
  PreviewButtonWrapper,
} from 'styles/pages/JobDescription'
import {
  Details,
  ImageWrap,
  Name,
  MemberProfile,
  ProfileImage,
  Username,
  JobDetailWrapper,
  AddTeamMemberButton,
} from 'styles/components/Modal'

const ViewJob = () => {
  const [jobData, setJobData] = useState<any>()
  const [addModal, setaddModal] = useState(false)
  const [publishedJob, setPublishedJob] = useState(false)
  const [timeLineModal, setTimeLineModal] = useState(false)
  const activeColor = useSelector((state: RootState) => state?.colorSlice?.activeColor)
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)
  const navigate = useNavigate()
  const { id } = useParams()
  const { control } = useForm()

  const status = [
    { value: 'Open', label: 'Open' },
    { label: 'Closed', value: 'Closed' },
  ]

  const { data: getJobData, refetch: refetchJobData } = useGet('getJobData', `/job/jobPost/${id}`, {
    token: true,
  })

  const { data: users, refetch: refetchUsers } = useGet('users', `job/hiringStageUsers?jobPostId=${id}`, {
    token: true,
  })

  useEffect(() => {
    setJobData(getJobData)
  }, [getJobData])

  useEffect(() => {
    refetchJobData()
    refetchUsers()
  }, [])

  const toggleAdd = () => {
    setaddModal(!addModal)
  }

  const toggleTimeLineModal = () => {
    setTimeLineModal(!timeLineModal)
  }

  return (
    <>
      <Container>
        <ContentWrapper>
          <TitleSection>
            <JobHeading
              color={activeColor}
              onClick={() => {
                localStorage.removeItem('postId')
                navigate(JobDashboardRoute?.path)
              }}
            >
              Jobs
            </JobHeading>
            <RightIcon />
            <JobCreateTitle color={activeColor}>Job: {jobData?.jobTitle}</JobCreateTitle>
          </TitleSection>
          <JobTitleContainer>
            <JobNameContainer>
              <JobName>{jobData?.jobTitle}</JobName>
              <JobType>Finance. Remote Worker</JobType>
            </JobNameContainer>
            <EditJobWrapper>
              <TimelineContainer>
                <TypeName>Job Status:</TypeName>
              </TimelineContainer>
              <TimelineContainer>
                <SelectContainer
                  control={control}
                  name="employmentType"
                  placeholder={PlaceHolder?.defaultOption}
                  options={status}
                  defaultValue="Open"
                />
              </TimelineContainer>
            </EditJobWrapper>
          </JobTitleContainer>
          <JobTitleContainer>
            <TimelineContainer>
              <TypeName>Open:</TypeName>
              <DaysNumber>24 Days</DaysNumber>
            </TimelineContainer>

            <EditJobWrapper>
              {PermittedEndPoint['/job/hiringStageUsers']?.includes('CREATE') ? (
                <TimelineContainer>
                  <AddTeamMemberButton onClick={() => setaddModal(!addModal)} color={activeColor}>
                    Add Team Member
                  </AddTeamMemberButton>
                </TimelineContainer>
              ) : null}
              {PermittedEndPoint['/job/jobPost']?.includes('UPDATE') && (
                <TimelineContainer>
                  <Button
                    label={EditJobOpening}
                    variant="contained"
                    onClick={() => {
                      localStorage.removeItem('postId')
                      localStorage.removeItem('jobAppId')
                      jobData.JobStatus.status === 'PUBLISHED'
                        ? (setPublishedJob(jobData), toggleTimeLineModal())
                        : navigate(`/jobs/edit/${id}`)
                    }}
                    style={{ backgroundColor: activeColor }}
                  />
                </TimelineContainer>
              )}
            </EditJobWrapper>
          </JobTitleContainer>
          <DetailContainer>
            <JobFlowWrapper>
              <JobDataWrapper className="viewJobDetail">
                <JobTitle className="viewJobTitle">{jobData?.jobTitle}</JobTitle>
                <JobInfo>
                  <Heading>Employment Type</Heading>
                  <Description>{jobData?.employmentType?.name}</Description>
                </JobInfo>
                <JobInfo>
                  <Heading>Department</Heading>
                  <Description>{jobData?.department?.name}</Description>
                </JobInfo>
                <JobInfo>
                  <Heading>Number of Positions</Heading>
                  <Description>{jobData?.numberOfPositions}</Description>
                </JobInfo>
                <JobInfo>
                  <Heading>Minimum Experience</Heading>
                  <Description>
                    {jobData?.minExperience?.name}({jobData?.minExperience?.start}-{jobData?.minExperience?.end})
                    {jobData?.minExperience?.type}
                  </Description>
                </JobInfo>
                <JobInfo>
                  <Heading>About Us</Heading>
                  <Description>
                    Our mission is simple: we want to set people free to do meaningful work. People love our
                    software--and it turns out that people love working here too. We&apos;ve been recognized as a “Best
                    Company to Work For”, and we&apos;re proud of our team for receiving awards for workplace
                    effectiveness and flexibility.
                  </Description>
                </JobInfo>
                <JobInfo>
                  <Heading>What will you do</Heading>
                  <Description
                    dangerouslySetInnerHTML={{ __html: jobData?.jobDescription?.toString() || '' }}
                  ></Description>
                </JobInfo>
                <JobInfo>
                  <Heading>Location</Heading>
                  <Description>{jobData?.location?.name}</Description>
                </JobInfo>
                {jobData?.JobPostSalary?.length > 0 && (
                  <JobInfo>
                    <Heading>Salary Range</Heading>
                    <Description>
                      ({jobData?.JobPostSalary[0]?.salarystartvalue}-{jobData?.JobPostSalary[0]?.salaryendvalue})
                      {' ' + jobData?.JobPostSalary[0]?.currency}
                    </Description>
                  </JobInfo>
                )}
              </JobDataWrapper>
              <ViewJobRightWrapper>
                <PreviewJobWrapper>
                  <ButtonWrapper>
                    <PreviewTitle>Preview Job</PreviewTitle>
                    <PreviewHeading>Take a peek at your job listing.</PreviewHeading>
                    <Button
                      label={PreviewJob}
                      variant="contained"
                      onClick={() => {
                        navigate(`/jobs/job-description/candidate/${id}`)
                      }}
                      style={{ backgroundColor: activeColor }}
                    />
                  </ButtonWrapper>
                </PreviewJobWrapper>
                {users?.length > 0 && (
                  <PreviewJobWrapper>
                    <PreviewButtonWrapper>
                      <PreviewWrapper>
                        <PreviewTitle>Team Members</PreviewTitle>
                        <PreviewHeading>Here are all the team members.</PreviewHeading>
                      </PreviewWrapper>
                      <TeamMemberDetailWrapper>
                        {users?.map((member: any, index: number) => {
                          return (
                            <JobDetailWrapper key={index}>
                              <MemberProfile>
                                <ImageWrap>
                                  <ProfileImage src={Avatar} />
                                </ImageWrap>
                                <Details>
                                  <Name> {member?.userName}</Name>
                                  <Username> {member?.roleName}</Username>
                                </Details>
                              </MemberProfile>
                            </JobDetailWrapper>
                          )
                        })}
                      </TeamMemberDetailWrapper>
                    </PreviewButtonWrapper>
                  </PreviewJobWrapper>
                )}
              </ViewJobRightWrapper>
            </JobFlowWrapper>
          </DetailContainer>
        </ContentWrapper>
      </Container>
      <Modal isOpen={addModal} className="modal">
        <AddMemberModal toggleadd={toggleAdd} refetchUsers={refetchUsers} id={id} usersList={users} />
      </Modal>
      <Modal isOpen={timeLineModal} className="timeline_modal">
        <EditJobTimeLineModal toggleTimeLineModal={toggleTimeLineModal} jobTimeline={publishedJob} />
      </Modal>
    </>
  )
}

export default ViewJob
