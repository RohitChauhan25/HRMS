import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGet from 'hooks/useGet'
import { ApplyForThisJob } from 'constants/labels'
import Button from 'components/Button'
import logo from 'assets/images/WitsLogo.png'
import EmploymenttypeIcon from 'assets/svg/EmploymentTypeIcon'
import LocationIcon from 'assets/svg/LocationIcon'
import {
  ApplyJobWrapper,
  JobDataWrapper,
  Description,
  FlowContainer,
  Heading,
  JobTitle,
  HeadingDescription,
  JobInfo,
} from 'styles/views/Jobs/PublishJob'
import {
  Container,
  Img,
  NavWrapper,
  VisitSection,
  ContainerWrapper,
  MainHeading,
  HybridSection,
  ContentSection,
} from 'styles/pages/Feedback'

const ApplyJob = () => {
  const [jobData, setJobData] = useState<any>()
  const { id } = useParams()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const navigate = useNavigate()

  const { data: getJobData, refetch: refetchJobData } = useGet('getJobData', `job/jobpost/career/${id}`, {
    token: true,
  })
  useEffect(() => {
    setJobData(getJobData)
  }, [getJobData])

  useEffect(() => {
    refetchJobData()
  }, [])

  const handleApplyJob = () => {
    navigate(`/job/apply/details/${id}`, {
      state: {
        jobTitle: jobData ? jobData?.jobTitle : '',
        employmentType: jobData ? jobData?.employmentType?.name : '',
        location: jobData ? jobData?.location?.name : '',
      },
    })
  }

  return (
    <>
      <Container>
        <NavWrapper>
          <Img src={logo} alt="witslogo" />
          <VisitSection color={activeColor}>Visit out website</VisitSection>
        </NavWrapper>
        <ContainerWrapper>
          <ContentSection>
            <MainHeading color={activeColor}>
              <JobTitle>{jobData?.jobTitle}</JobTitle>
              <HybridSection>
                <EmploymenttypeIcon />
                <HeadingDescription>{jobData?.employmentType?.name}</HeadingDescription>
                <LocationIcon />
                <HeadingDescription>{jobData?.location?.name}</HeadingDescription>
              </HybridSection>
            </MainHeading>
            <FlowContainer>
              <JobDataWrapper>
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
                <JobInfo>
                  <Heading>Salary Range</Heading>
                  <Description>
                    ({jobData?.JobPostSalary[0]?.salarystartvalue}-{jobData?.JobPostSalary[0]?.salaryendvalue})
                    {' ' + jobData?.JobPostSalary[0]?.currency}
                  </Description>
                </JobInfo>
              </JobDataWrapper>
              <ApplyJobWrapper>
                <Button label={ApplyForThisJob} variant="contained" onClick={handleApplyJob} />
              </ApplyJobWrapper>
            </FlowContainer>
          </ContentSection>
        </ContainerWrapper>
      </Container>
    </>
  )
}

export default ApplyJob
