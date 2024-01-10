import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import { updateRefetch } from 'store/slice/jobApplicationSwitch'
import usePut from 'hooks/usePut'
import { JobDashboardRoute } from 'constants/routes'
import { Cancel, Submit } from 'constants/labels'
import { REJECT_QUESTION } from 'utils/validators/screeningQuestionSchema'
import TextareaContainer from 'components/TextArea'
import Button from 'components/Button'
import CrossIcon from 'assets/svg/CrossIcon'
import {
  RejectModalContainer,
  Cross,
  ReasonWrapper,
  DateLabel,
  TimelineModalTitle,
  RejectHeadSection,
  Buttons,
  ErrorMessage,
} from 'styles/components/Modal'

const ReasonRejectModal = ({ rejectToggle, id, setreject }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(REJECT_QUESTION),
  })
  const { refetch } = useSelector((state: any) => state.jobApplicationSwitch)
  // const { mutateAsync: updateAsync } = usePost()
  const ShowError: any = errors
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mutateAsync } = usePut()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const formData = async (data: any) => {
    try {
      const res = await mutateAsync({
        url: 'job/jobpost/reject',
        payload: {
          jobPostId: id,
          remark: data.rejectReason,
          status: 'REJECTED',
          // subStatus: 'Rejected',
        },
        token: true,
      })
      if (res) {
        setreject(false)
        notification.success({
          message: '',
          description: 'Reason send successfully!',
        })
      }

      navigate(JobDashboardRoute?.path)
      dispatch(updateRefetch(!refetch))
    } catch (error: any) {
      return { error: error?.response?.data?.message }
    }
  }

  return (
    <RejectModalContainer>
      <form onSubmit={handleSubmit(formData)}>
        <RejectHeadSection>
          <TimelineModalTitle>Reason To Reject</TimelineModalTitle>
          <Cross onClick={rejectToggle}>
            <CrossIcon />
          </Cross>
        </RejectHeadSection>
        <ReasonWrapper>
          <DateLabel>Reason</DateLabel>
          <TextareaContainer
            placeholder="Please write down your reason to reject the job..."
            name="rejectReason"
            control={control}
          />
          <ErrorMessage>
            {errors.rejectReason && <span className="error">{ShowError?.rejectReason?.message}</span>}
          </ErrorMessage>
        </ReasonWrapper>
        <Buttons>
          <Button label={Cancel} variant="text" onClick={rejectToggle} />
          <Button label={Submit} variant="contained" type="submit" style={{ backgroundColor: activeColor }} />
        </Buttons>
      </form>
    </RejectModalContainer>
  )
}

export default ReasonRejectModal
