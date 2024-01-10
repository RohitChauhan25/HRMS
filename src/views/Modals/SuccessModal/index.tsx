import Success from 'assets/images/tickSuccess.png'
import CrossIcon from 'assets/svg/CrossIcon'
import { ModalContainer, Cross, WarningTitle, ImageContainer } from 'styles/components/Modal'

const SuccessModal = ({ successtoggle }: any) => {
  return (
    <ModalContainer>
      <Cross onClick={successtoggle}>
        <CrossIcon />
      </Cross>
      <ImageContainer>
        <img src={Success} alt="success" width={100} />
      </ImageContainer>
      <WarningTitle>Success</WarningTitle>
    </ModalContainer>
  )
}

export default SuccessModal
