import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import CrossIcon from 'assets/svg/CrossIcon'
import {
  RejectModalContainer,
  Cross,
  RejectReasonWrapper,
  TimelineModalTitle,
  RejectHeadSection,
  ButtonWrapper,
} from 'styles/components/Modal'

const ReasonToRejectModal = ({ rejectToggle, rejectJobData }: any) => {
  const navigate = useNavigate()
  return (
    <RejectModalContainer>
      <RejectHeadSection>
        <TimelineModalTitle>Reason To Reject</TimelineModalTitle>
        <Cross>
          <CrossIcon onClick={rejectToggle} />
        </Cross>
      </RejectHeadSection>
      <RejectReasonWrapper>{rejectJobData?.JobStatus?.remark}</RejectReasonWrapper>
      <ButtonWrapper
        onClick={() => {
          localStorage.removeItem('postId')
          localStorage.removeItem('jobAppId')
          navigate(`/jobs/edit/${rejectJobData?.id}`)
        }}
      >
        <Button label="Edit Job" variant="contained" />
      </ButtonWrapper>
    </RejectModalContainer>
  )
}

export default ReasonToRejectModal
