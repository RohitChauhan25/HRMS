import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Witslab from 'assets/images/logoLogin.png'
import Wits from 'assets/images/logoLogin.png'
import JobsIcon from 'assets/svg/JobsIcon'
import LocationIcon from 'assets/svg/LocationIcon'
import { SaveButton } from 'styles/components/Modal'
import { ValidationContainer } from 'styles/views/Jobs/JobPostForm'
import { LogoSection } from 'styles/views/Navbar'
import { FlowContainer, Heading, Description, GetText, IconContainer } from 'styles/views/Jobs/PublishJob'
import {
  Container,
  NavWrapper,
  VisitWebsite,
  ContentWrapper,
  JobNameWrapper,
  JobTitle,
  JobTypeDetails,
  Type,
  DetailsContainer,
  JobShare,
  ShareContainer,
} from 'styles/pages/Careers/Apply-Now'

const JobDetails = () => {
  const { id } = useParams()
  const source = window.location.href.split('?')
  const [data, setData] = useState<any>()
  const navigate = useNavigate()
  const getData = async () => {
    const res = await axios.get(`http://sql-dev-india.thewitslab.com:6100/job/details/${id}`)
    setData(res?.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      <NavWrapper>
        <LogoSection>
          <img src={Wits} alt="logo" />
        </LogoSection>
        <VisitWebsite>Visit Our Website</VisitWebsite>
      </NavWrapper>
      <ContentWrapper>
        <JobNameWrapper>
          <JobTitle>{data?.data?.jobTitle}</JobTitle>
          <JobTypeDetails>
            <Type>
              <JobsIcon />
              {data?.data?.employmentType}
            </Type>
            <Type>
              <LocationIcon />
              {data?.data?.location.map((location: any) => {
                return <>{location?.locationName}</>
              })}
            </Type>
          </JobTypeDetails>
        </JobNameWrapper>
        <DetailsContainer>
          <FlowContainer>
            <Heading>Employment Type</Heading>
            <Description>{data?.data?.employmentType}</Description>
            <Heading>Department</Heading>
            <Description>{data?.data?.department}</Description>
            <Heading>Number of Positions</Heading>
            <Description>{data?.data?.numberOfPositions}</Description>
            <Heading>Minimum Experience</Heading>
            <Description>{data?.data?.minimumExperience}</Description>
            <Heading>About Us</Heading>
            <Description dangerouslySetInnerHTML={{ __html: data?.data?.jobDescription }} />

            <Heading>Location</Heading>
            {data?.data?.location.map((location: any) => {
              return <Description key={location?.id}>{location?.locationName}</Description>
            })}

            <Heading>Salary Range</Heading>
            <Description>
              {data?.data?.salaryRange} {data?.data?.salaryTime}
            </Description>
          </FlowContainer>
          <ShareContainer>
            <SaveButton
              onClick={() => {
                navigate(`/careers/apply-now/${data?.data?.id}?${source[source.length - 1]}`, {
                  state: {
                    questions: data?.data?.jobApplication,
                    jobTitle: data?.data?.jobTitle,
                    employmentType: data?.data?.employmentType,
                    location: data?.data?.location,
                  },
                })
              }}
            >
              Apply
            </SaveButton>
            <ValidationContainer>
              <GetText>Share</GetText>
              <Description>Share the jobs with your network</Description>
              <JobShare>
                <IconContainer>
                  <img src={Witslab} alt="Platform" width={85} height={44} />
                </IconContainer>
              </JobShare>
            </ValidationContainer>
          </ShareContainer>
        </DetailsContainer>
      </ContentWrapper>
    </Container>
  )
}

export default JobDetails
