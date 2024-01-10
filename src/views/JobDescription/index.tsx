import Button from 'components/Button'
import Witslab from 'assets/images/logoLogin.png'
import Avatar from 'assets/images/Avatar.png'
import { MainContainer, ValidationContainer } from 'styles/views/Jobs/JobPostForm'
import {
  FlowContainer,
  JobTitle,
  JobLocation,
  Heading,
  Description,
  GetText,
  JobPlatform,
} from 'styles/views/Jobs/PublishJob'
import { SideContainer, PreviewButton } from 'styles/pages/JobDescription'
import { ImageWrap, Name, Profile, ProfileImage, Username, Details } from 'styles/components/Modal'

const JobDescriptionDetails = (detail: any) => {
  const redirectToWebsite = () => {
    window.open(process.env.REACT_APP_BASE_URL, '_blank')
  }

  return (
    <>
      <MainContainer>
        <FlowContainer>
          <JobTitle>{detail?.detail?.data?.jobTitle}</JobTitle>
          <JobLocation>{detail?.detail?.data?.department}</JobLocation>
          <Heading>Employment Type</Heading>
          <Description>{detail?.detail?.data?.employmentType}</Description>
          <Heading>Minimum Experience</Heading>
          <Description>{detail?.detail?.data?.minimumExperience}</Description>

          <Heading>About Us</Heading>
          <Description>
            Our mission is simple: we want to set people free to do meaningful work. People love our software--and it
            turns out that people love working here too. We&apos;ve been recognized as a “Best Company to Work For”, and
            we&apos;re proud of our team for receiving awards for workplace effectiveness and flexibility.
          </Description>
          <Heading>Job Description</Heading>
          <Description
            dangerouslySetInnerHTML={{ __html: detail?.detail?.data?.jobDescription?.toString() || '' }}
          ></Description>

          <Heading> Location</Heading>
          {detail?.detail?.data?.location?.map((itm: any, index: number) => {
            return <Description key={index}>{itm?.locationName}</Description>
          })}

          <Heading>Salary Range</Heading>
          <Description>{detail?.detail?.data?.salaryRange}</Description>
        </FlowContainer>
        <SideContainer>
          <ValidationContainer>
            <GetText>Preview Job</GetText>
            <Description>Take a peek at your job listing.</Description>
            <PreviewButton>
              <Button type={'submit'} label={'Preview Job'} variant={'contained'} onClick={redirectToWebsite} />
            </PreviewButton>
          </ValidationContainer>

          <ValidationContainer>
            <GetText>Team Members</GetText>
            <Description>Here are all the team members.</Description>
            {detail?.detail?.teamMembers?.length &&
              detail?.detail?.teamMembers?.map((item: any, index: number) => {
                return (
                  <JobPlatform key={index}>
                    <Profile>
                      <ImageWrap>
                        <ProfileImage src={Avatar} />
                      </ImageWrap>
                      <Details>
                        <Name>{item?.userName}</Name>
                        <Username>{item?.recommendedRole}</Username>
                      </Details>
                    </Profile>
                  </JobPlatform>
                )
              })}
          </ValidationContainer>

          <ValidationContainer>
            <GetText>Active Sources</GetText>
            <Description>Here are all the sources.</Description>
            <JobPlatform onClick={redirectToWebsite}>
              <img src={Witslab} alt="Platform" width={85} height={44} />
            </JobPlatform>
          </ValidationContainer>
        </SideContainer>
      </MainContainer>
    </>
  )
}

export default JobDescriptionDetails
