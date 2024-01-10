import Error from 'assets/images/errorWarning.png'
import CrossIcon from 'assets/svg/CrossIcon'
import { ModalContainer, Cross, WarningTitle, ImageContainer } from 'styles/components/Modal'

interface IErrors {
  errortoggle: () => void
  message: string
}

const ErrorModal = ({ errortoggle, message }: IErrors) => {
  return (
    <ModalContainer>
      <Cross onClick={errortoggle}>
        <CrossIcon />
      </Cross>
      <ImageContainer>
        <img src={Error} alt="success" width={100} />
      </ImageContainer>
      <WarningTitle>{message}</WarningTitle>
    </ModalContainer>
  )
}

export default ErrorModal
