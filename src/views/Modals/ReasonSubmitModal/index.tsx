import Success from 'assets/images/submitSuccess.png'
import CrossIcon from 'assets/svg/CrossIcon'
import { ModalContainer, Cross, ModalTitle, Description, ImageContainer } from 'styles/components/Modal'

const ReasonSubmitModal = ({ toggle }: any) => {
  return (
    <ModalContainer>
      <Cross onClick={toggle}>
        <CrossIcon />
      </Cross>
      <ImageContainer>
        <img src={Success} alt="success" />
      </ImageContainer>
      <ModalTitle>Submitted Successfully</ModalTitle>
      <Description>Your reason has been submitted successfully.</Description>
    </ModalContainer>
  )
}

export default ReasonSubmitModal
