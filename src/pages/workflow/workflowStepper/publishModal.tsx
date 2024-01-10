import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import usePost from 'hooks/usePost'
import Button from 'components/Button'
import AvatarImage from 'assets/images/avatar-image.png'
import { GrantRoleData } from 'interfaces/job'
import { Approval, ApprovalTitle, Cancel } from 'constants/labels'
import {
  ApprovalMainWrapper,
  ApprovalContainer,
  PublishModalContainer,
  ApprovalHeading,
  BoxContainer,
  CardContainer,
  BoxWrapper,
  Wrapper,
  ProfileWrapper,
  ProfileDetailsWrapper,
  AssigneeName,
  Designation,
  ActionWrapper,
  ButtonWrapper,
  ButtonContainer,
} from 'styles/pages/Workflow'

const PublishModal = ({ isClose, publishUsers }: any) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<any>([])
  const [buttonStates, setButtonStates] = useState<{ [key: number]: boolean }>({})
  const jobPostId = window.localStorage.getItem('postId')
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const { mutateAsync } = usePost()

  const handleClick = (email: GrantRoleData, id: GrantRoleData, index: number) => {
    const newData = {
      approverUserId: id,
      approverEmail: email,
      jobPostId: jobPostId,
    }

    setUserData((prev: any) => [...prev, newData])
    setButtonStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }))
  }

  const isSendButtonDisabled = userData.length === 0

  const SendForApproval = async () => {
    const payload = userData

    try {
      const response = await mutateAsync({
        url: 'job/publish/approve',
        payload: payload,
        token: true,
      })

      if (response) {
        notification.success({
          message: '',
          description: 'Approval Send Successfully',
          duration: 1, // Duration in seconds
        })
        navigate('/jobs')
        localStorage.removeItem('postId')
        isClose
      }
    } catch (error: any) {
      notification.error({
        message: '',
        description: error?.response?.data?.message,
        duration: 2,
      })
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  return (
    <ApprovalMainWrapper>
      <PublishModalContainer>
        <ApprovalContainer>
          <ApprovalHeading>Get the approval from the below users</ApprovalHeading>
          <BoxContainer>
            {publishUsers?.map((item: any, index: any) => {
              const isButtonClicked = buttonStates[index] || false
              return (
                <CardContainer key={index}>
                  <BoxWrapper>
                    <Wrapper>
                      <ProfileWrapper>
                        <img src={AvatarImage} alt="profile" />
                      </ProfileWrapper>
                      <ProfileDetailsWrapper>
                        <AssigneeName>Super Admin</AssigneeName>
                        <Designation>{item?.userName}</Designation>
                      </ProfileDetailsWrapper>
                    </Wrapper>
                    <ActionWrapper isClicked={isButtonClicked} color={activeColor}>
                      <Button
                        label={ApprovalTitle}
                        variant="outline"
                        onClick={() => handleClick(item.email, item.id, index)}
                      />
                    </ActionWrapper>
                  </BoxWrapper>
                </CardContainer>
              )
            })}
          </BoxContainer>
        </ApprovalContainer>
        <ButtonWrapper>
          <Button label={Cancel} variant="text" onClick={isClose} />
          <ButtonContainer>
            <Button
              label={Approval}
              variant="contained"
              type="submit"
              onClick={SendForApproval}
              disabled={isSendButtonDisabled}
            />
          </ButtonContainer>
        </ButtonWrapper>
      </PublishModalContainer>
    </ApprovalMainWrapper>
  )
}

export default PublishModal
