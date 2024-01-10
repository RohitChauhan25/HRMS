import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetJobPostId } from 'store/slice/jobApplicationSwitch'
import { JobDashboardRoute } from 'constants/routes'
import Success from 'assets/images/success.png'
import CrossIcon from 'assets/svg/CrossIcon'
import { ModalContainer, Cross, ModalTitle, Description, ViewButton, ImageContainer } from 'styles/components/Modal'

const JobSuccessfulModal = ({ toggle, hasRole, id, title, refetchJob }: any) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  return (
    <ModalContainer>
      <Cross onClick={toggle}>
        <CrossIcon
          onClick={() => {
            navigate(JobDashboardRoute?.path)
          }}
        />
      </Cross>
      <ImageContainer>
        <img src={Success} alt="success" />
      </ImageContainer>
      <ModalTitle>{hasRole ? `${title}` + ' Job Published successfully' : 'Job Submitted For Approval'}</ModalTitle>
      <Description></Description>
      <ViewButton
        onClick={() => {
          dispatch(resetJobPostId())
          if (hasRole) {
            navigate(`/jobs/view/${id}`)
          } else {
            refetchJob()
            toggle()
          }
        }}
        style={{ backgroundColor: activeColor }}
      >
        {hasRole ? 'View Job' : 'OK'}
      </ViewButton>
    </ModalContainer>
  )
}

export default JobSuccessfulModal
