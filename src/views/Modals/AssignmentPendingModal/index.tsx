import { useNavigate } from 'react-router-dom'
import Assignment from 'assets/images/teamAssignment.png'
import CrossIcon from 'assets/svg/CrossIcon'
import { ModalContainer, Cross, ModalTitle, Description, ViewButton, ImageContainer } from 'styles/components/Modal'

const AssignmentPendingModal = ({ toggle, id }: any) => {
  const navigate = useNavigate()
  return (
    <ModalContainer>
      <Cross onClick={toggle}>
        <CrossIcon />
      </Cross>
      <ImageContainer>
        <img src={Assignment} alt="assignment" />
      </ImageContainer>
      <ModalTitle>Team Assignment Pending</ModalTitle>
      <Description>Your team assigning is pending, please assign your team members to publish this job.</Description>
      <ViewButton onClick={() => navigate(`/jobs/create-job/${id}`)}>Assign Team</ViewButton>
    </ModalContainer>
  )
}

export default AssignmentPendingModal
