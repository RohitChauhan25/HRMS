import {
  ModalContainer,
  Cross,
  ModalTitle,
  Description,
  ImageContainer,
  SaveButton,
  ModalButtons,
} from 'styles/components/Modal'
import CrossIcon from 'assets/svg/CrossIcon'
import Delete from 'assets/images/deleteBin.png'
import { CancelButton } from 'styles/views/Jobs/JobPostForm'

const JobDeleteModal = ({ toggle, text, deleteJOb }: any) => {
  return (
    <ModalContainer>
      <Cross onClick={toggle}>
        <CrossIcon />
      </Cross>
      <ImageContainer>
        <img src={Delete} alt="Delete" />
      </ImageContainer>
      <ModalTitle>Delete Job</ModalTitle>
      <Description>Are you sure, you want to delete this job.</Description>
      <ModalButtons>
        <CancelButton onClick={toggle}>Cancel</CancelButton>
        <SaveButton onClick={() => deleteJOb(text)}>Delete</SaveButton>
      </ModalButtons>
    </ModalContainer>
  )
}

export default JobDeleteModal
