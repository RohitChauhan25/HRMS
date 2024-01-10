import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { JobDashboardRoute } from 'constants/routes'
import Stepper from 'components/Stepper'
import RightIcon from 'assets/svg/RightArrowIcon'
import {
  Container,
  ContentWrapper,
  TitleSection,
  JobCreateTitle,
  JobTitle,
  MainHeading,
  StepperContainer,
} from 'styles/pages/CreateJob'

const CreateJob = () => {
  const navigate = useNavigate()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

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
          <JobCreateTitle color={activeColor}>Create Job Opening</JobCreateTitle>
        </TitleSection>
        <MainHeading>Create Job Opening</MainHeading>
        <StepperContainer>
          <Stepper />
        </StepperContainer>
      </ContentWrapper>
    </Container>
  )
}

export default CreateJob
