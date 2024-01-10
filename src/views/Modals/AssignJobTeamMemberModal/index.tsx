import { useState } from 'react'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import { toggleLoader } from 'store/slice/loader'
import usePost from 'hooks/usePost'
import { Assign, Cancel } from 'constants/labels'
import Button from 'components/Button'
import { GrantRoleData } from 'interfaces/job'
import AvatarImage from 'assets/images/avatar-image.png'
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

const hadleAssignJobModal = ({ isClose, teamMembers, jobId, jobPostUsers }: any) => {
  const [teamMembersData, setTeamMembersData] = useState<any>([])
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const [buttonStates, setButtonStates] = useState<{ [key: number]: boolean }>([])
  const { mutateAsync } = usePost()

  //Handling the team Members
  const handleTeamMembers = (id: GrantRoleData, email: string, index: number) => {
    //userData
    const assignedUsers = { userId: id, email: email }

    // Check if the user is already in teamMembersData
    const isUserInTeam = teamMembersData?.some((user: any) => user?.userId === id)

    if (isUserInTeam) {
      // If the user is already in teamMembersData, remove them
      setTeamMembersData((prev: any) => prev?.filter((user: any) => user?.userId !== id))
    } else {
      // If the user is not in teamMembersData, add them
      setTeamMembersData((prev: any) => [...prev, assignedUsers])
    }

    // Toggle the button state
    setButtonStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }))
  }

  const isSendButtonDisabled = teamMembersData?.length === 0

  //Assignment Of jobs To Teams
  const handleAssignJob = async () => {
    const payload = {
      jobPostId: jobId,
      assignedUsers: teamMembersData,
    }
    toggleLoader(true)
    try {
      const response = await mutateAsync({
        url: 'job/jobpost/assignJob',
        payload: payload,
        token: true,
      })
      if (response) {
        toggleLoader(false)
        notification.success({
          message: '',
          description: 'Job Assigned Successfully',
          duration: 1,
        })
        isClose()
      }
    } catch (error: any) {
      toggleLoader(false)
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
          <ApprovalHeading>Assign Job To Team Members</ApprovalHeading>
          <BoxContainer>
            {teamMembers?.map((item: any, index: number) => {
              const isAssigned = jobPostUsers?.some((jobUser: any) => jobUser?.userId === item.id)
              const isButtonClicked = buttonStates[index] || false
              return (
                <CardContainer key={index}>
                  <BoxWrapper>
                    <Wrapper>
                      <ProfileWrapper>
                        <img src={AvatarImage} alt="profile" />
                      </ProfileWrapper>
                      <ProfileDetailsWrapper>
                        <AssigneeName>
                          {item?.userName ? item?.userName : item?.email?.split('@')[0]?.split('.')[0]}
                        </AssigneeName>
                        <Designation>{item?.email}</Designation>
                      </ProfileDetailsWrapper>
                    </Wrapper>
                    <ActionWrapper isClicked={isButtonClicked} color={activeColor}>
                      {isAssigned ? (
                        <Button
                          label="Assigned"
                          variant="contained"
                          disabled
                          style={{ backgroundColor: activeColor }}
                        />
                      ) : (
                        <Button
                          label={Assign}
                          variant="text"
                          onClick={() => handleTeamMembers(item.id, item.email, index)}
                        />
                      )}
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
              label={Assign}
              variant="contained"
              type="submit"
              onClick={handleAssignJob}
              disabled={isSendButtonDisabled}
              style={{ backgroundColor: activeColor }}
            />
          </ButtonContainer>
        </ButtonWrapper>
      </PublishModalContainer>
    </ApprovalMainWrapper>
  )
}

export default hadleAssignJobModal
