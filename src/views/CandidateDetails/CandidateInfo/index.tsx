import {
  Container,
  InfoRightSection,
  TitleLabel,
  // DetailsText,
  DetailsWrapper,
  PdfContainer,
} from 'styles/pages/Candidates/CandidateDetails/CandidateInfo'
import { ValidationContainer } from 'styles/views/Jobs/JobPostForm'
import { Description, GetText, IconContainer } from 'styles/views/Jobs/PublishJob'
import { JobShare } from 'styles/pages/Careers/Apply-Now'
import Witslab from 'assets/images/logoLogin.png'
// import { useParams } from 'react-router-dom'
// import { useEffect } from 'react'
// import useGet from 'hooks/useGet'
import PDFViewer from 'components/PDFViewer'

const CandidateInfoContainer = () => {
  // const { id, jobPostId } = useParams()
  // const { data: getCandidateInfo, refetch: refetchCandidateInfo } = useGet(
  //   'candidate-info',
  //   `/job/candidate/detail?jobId=${jobPostId}&candidateId=${id}`,
  //   {
  //     token: true,
  //   },
  // )

  // useEffect(() => {
  //   refetchCandidateInfo()
  // }, [])

  return (
    <Container>
      <PdfContainer>
        <PDFViewer url={'https://www.africau.edu/images/default/sample.pdf'} />
      </PdfContainer>
      <InfoRightSection>
        <ValidationContainer>
          <GetText>Source</GetText>
          <Description>Source of application.</Description>
          <JobShare>
            <IconContainer>
              <img src={Witslab} alt="Platform" width={85} height={44} />
            </IconContainer>
          </JobShare>
        </ValidationContainer>
        <ValidationContainer>
          <GetText>Candidate Details</GetText>
          <Description>All the details given by candidate.</Description>
          <DetailsWrapper>
            <TitleLabel>Email ID</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.emailID}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>Phone</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.phoneNumber}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>Address</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.address}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>LinkedIn Profile</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.linkedInProfile}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>Highest Education Attained</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.highestEducationAttained}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>College/University</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.collegeUniversity}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>GPA</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.gpa}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>Employment Status</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.employmentStatus}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>Desired Salary</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.desiredSalary}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>Earliest Start Date</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.earliestStartDate}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>Willing To Relocate</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.willingToRelocate}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>Languages Spoked</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.languagesSpoken}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>Felony Conviction (Y/N) + Explanation</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.felonyConviction}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>What are your strengths?</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.strengths}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>What are your achievements?</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.achievements}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>How many years of experience do you have?</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.experience}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>Do You have a driving license?</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.drivingLicense}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>Can travel for work?</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.travel}</DetailsText> */}
          </DetailsWrapper>
          <DetailsWrapper>
            <TitleLabel>Employment Status</TitleLabel>
            {/* <DetailsText>{getCandidateInfo?.data?.employmentStatus}</DetailsText> */}
          </DetailsWrapper>
        </ValidationContainer>
      </InfoRightSection>
    </Container>
  )
}

export default CandidateInfoContainer
