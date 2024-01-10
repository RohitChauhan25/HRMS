import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import useGet from 'hooks/useGet'
import usePost from 'hooks/usePost'
import { Reject } from 'constants/labels'
import { JobDashboardRoute } from 'constants/routes'
import Modal from 'components/Modal'
import CheckboxContainer from 'components/Checkbox'
import Button from 'components/Button'
import ReasonRejectModal from 'views/Modals/ReasonRejectModal'
import PublishJobModal from 'views/Modals/PublishJobModal'
import JobSuccessfulModal from 'views/Modals/JobSuccesfulModal'
import Witslab from 'assets/images/logoLogin.png'
import { CancelButton, MainContainer, SaveButton, ValidationContainer } from 'styles/views/Jobs/JobPostForm'
import {
  PublishFlowContainer,
  JobTitle,
  JobHeading,
  Description,
  Buttons,
  GetText,
  JobPlatform,
  IconContainer,
} from 'styles/views/Jobs/PublishJob'

const PublishJob = ({ prev }: any) => {
  const { mutateAsync } = usePost()
  const navigate = useNavigate()
  const [jobData, setJobData] = useState<any>()
  const [modal, setModal] = useState(false)
  const [publishModal, setPublishModal] = useState(false)
  const [reject, setreject] = useState(false)
  // const [role, setRole] = useState(false)
  const jobPostId = localStorage.getItem('postId')
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const user = useSelector((state: any) => state.user?.user)
  const { data: getJobData, refetch: refetchJobData } = useGet('getJobData', `/job/jobPost/${jobPostId}`, {
    token: true,
  })

  // const { data: getRoleName, refetch: refetchRoleProfile } = useGet('getRoleName', `auth/user/profile`, {
  //   token: true,
  // })

  useEffect(() => {
    setJobData(getJobData)
  }, [getJobData])

  useEffect(() => {
    // refetchRoleProfile()
    refetchJobData()
  }, [])

  // useEffect(() => {
  //   if (getRoleName?.roles[0]?.roleName === 'Super Admin' || getRoleName?.roles[0]?.roleName === 'User L2') {
  //     setRole(true)
  //   }
  // }, [getRoleName])

  const toggleTab = () => {
    setModal(!modal)
  }

  const handleOpen = async () => {
    const payload = {
      jobPostId: jobPostId,
    }
    try {
      const response = await mutateAsync({
        url: 'job/publish/sendforApproval',
        payload: payload,
        token: true,
      })
      if (response) {
        notification.success({
          message: '',
          description: 'Approval Send Successfully!',
        })
        navigate(JobDashboardRoute?.path)
      }
    } catch (error) {
      return { error: error }
    }
  }

  const handleOpenPublish = () => {
    setPublishModal(true)
  }

  return (
    <>
      <MainContainer>
        <PublishFlowContainer>
          <JobTitle onClick={prev}>{jobData?.jobTitle}</JobTitle>
          <JobHeading>Employment Type</JobHeading>
          <Description>{jobData?.employmentType?.name}</Description>
          <JobHeading>Department</JobHeading>
          <Description>{jobData?.department?.name}</Description>
          <JobHeading>Number of Positions</JobHeading>
          <Description>{jobData?.numberOfPositions}</Description>
          <JobHeading>Minimum Experience</JobHeading>
          <Description>
            {jobData?.minExperience?.start} - {jobData?.minExperience?.end} {jobData?.minExperience?.type}
          </Description>
          <JobHeading>About Us</JobHeading>
          <Description>
            Our mission is simple: we want to set people free to do meaningful work. People love our software--and it
            turns out that people love working here too. We&apos;ve been recognized as a “Best Company to Work For”, and
            we&apos;re proud of our team for receiving awards for workplace effectiveness and flexibility.
          </Description>

          <Description dangerouslySetInnerHTML={{ __html: jobData?.jobDescription?.toString() || '' }}></Description>
          <JobHeading>Location</JobHeading>
          <Description>{jobData?.location?.name}</Description>

          <Buttons>
            <CancelButton onClick={prev}>Back</CancelButton>
            <SaveButton
              type="submit"
              onClick={
                user?.Role === 'Level 1' || user?.Role === 'Level 2' || user?.Role === 'Super Admin'
                  ? handleOpenPublish
                  : handleOpen
              }
              style={{ backgroundColor: activeColor }}
            >
              {user?.Role === 'Level 1' || user?.Role === 'Level 2' || user?.Role === 'Super Admin'
                ? 'Publish'
                : 'Send For Approval'}
            </SaveButton>

            {(user?.Role === 'Level 1' || user?.Role === 'Level 2' || user?.Role === 'Super Admin') && (
              <Button
                className="deleteButton"
                label={Reject}
                variant="text"
                onClick={() => {
                  setreject(!reject)
                }}
              />
            )}
          </Buttons>
          <Modal isOpen={publishModal} className="modal" hideModal={() => setPublishModal(false)}>
            <PublishJobModal
              id={jobPostId}
              setPublishModal={setPublishModal}
              setModal={setModal}
              rejectToggle={() => setPublishModal(!publishModal)}
            />
          </Modal>

          <Modal isOpen={reject}>
            <ReasonRejectModal id={jobPostId} setreject={setreject} rejectToggle={() => setreject(!reject)} />
          </Modal>
        </PublishFlowContainer>
        <ValidationContainer>
          <GetText>Get The Word Out</GetText>
          <Description>You can choose auto-post jobs.</Description>

          <JobPlatform>
            <CheckboxContainer
              label={
                <IconContainer>
                  <img src={Witslab} alt="Platform" width={85} height={44} />
                </IconContainer>
              }
            />
          </JobPlatform>
        </ValidationContainer>
      </MainContainer>
      <Modal isOpen={modal} className="modal">
        <JobSuccessfulModal toggle={toggleTab} hasRole={user?.Role} id={jobPostId} title={getJobData?.jobTitle} />
      </Modal>
    </>
  )
}

export default PublishJob
