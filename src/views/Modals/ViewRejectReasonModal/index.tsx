import { useNavigate } from 'react-router-dom'
import CrossIcon from 'assets/svg/CrossIcon'
import {
  TimelineModalContainer,
  Cross,
  ReasonWrapper,
  DateLabel,
  TimelineModalTitle,
  HeadSection,
} from 'styles/components/Modal'
import { SaveButton } from 'styles/views/Jobs/JobPostForm'

const ViewReasonRejectModal = ({ rejectToggle, text, id }: any) => {
  const navigate = useNavigate()
  return (
    <TimelineModalContainer>
      <HeadSection>
        <TimelineModalTitle>Reason To Reject</TimelineModalTitle>
        <Cross onClick={rejectToggle}>
          <CrossIcon />
        </Cross>
      </HeadSection>
      <ReasonWrapper>
        <DateLabel>{text}</DateLabel>
      </ReasonWrapper>
      <>
        <SaveButton
          onClick={() => {
            navigate(`/jobs/create-job/${id}`)
          }}
        >
          Edit Job
        </SaveButton>
      </>
    </TimelineModalContainer>
  )
}

export default ViewReasonRejectModal
