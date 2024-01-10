import { useNavigate } from 'react-router-dom'
import { JobRoute } from 'constants/routes'
import error from 'assets/images/error.png'
import { ImageContainer, Container, ButtonContainer } from 'styles/pages/404'
import { ModalTitle, ViewButton } from 'styles/components/Modal'

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <ImageContainer>
        <img src={error} alt="error" />
      </ImageContainer>
      <ModalTitle>Oops Page Not Found</ModalTitle>
      <ButtonContainer>
        <ViewButton
          onClick={() => {
            navigate(JobRoute.path)
          }}
        >
          View Job
        </ViewButton>
      </ButtonContainer>
    </Container>
  )
}

export default ErrorPage
