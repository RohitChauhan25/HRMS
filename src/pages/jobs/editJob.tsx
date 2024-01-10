import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { JobDashboardRoute } from 'constants/routes'
import EditJobStepper from 'components/EditJobStepper'
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

const EditJob = () => {
  const navigate = useNavigate()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  return (
    <Container>
      <ContentWrapper>
        <TitleSection>
          <JobTitle
            color={activeColor}
            onClick={() => {
              navigate(JobDashboardRoute?.path)
            }}
          >
            Jobs
          </JobTitle>
          <RightIcon />
          <JobCreateTitle color={activeColor}>Edit Job Opening</JobCreateTitle>
        </TitleSection>
        <MainHeading>Edit Job Opening</MainHeading>
        <StepperContainer>
          <EditJobStepper />
        </StepperContainer>
      </ContentWrapper>
    </Container>
  )
}

export default EditJob
