import { useEffect, useState, useId } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import usePost from 'hooks/usePost'
import useGet from 'hooks/useGet'
import { teamAssignmentModalError } from 'constants/messages'
import { Cancel } from 'constants/labels'
import { ADD_MEMBER } from 'utils/validators/TeamMember'
import SelectContainer from 'components/Select'
import Button from 'components/Button'
import DeleteIcon from 'assets/svg/DeleteIcon'
import Avatar from 'assets/images/Avatar.png'
import AddMemberIcon from 'assets/svg/AddMemberIcon'
import CrossIcon from 'assets/svg/CrossIcon'
import { HiringStageDetails, IAddMemberModal, MemberDetails, User } from 'interfaces/job'
import {
  TimelineModalContainer,
  Cross,
  Buttons,
  Wrapper,
  Department,
  Details,
  Form,
  FormWrapper,
  Icons,
  ImageWrap,
  InputWrap,
  Name,
  Profile,
  ProfileImage,
  Username,
  AddButton,
  Bar,
  TimelineModalTitle,
  HeadSection,
  ErrorMessage,
  UserWrapper,
} from 'styles/components/Modal'
import { Label } from 'styles/views/Jobs/JobPostForm'

const AddMemberModal = ({ toggleadd, refetchUsers, id, usersList }: IAddMemberModal) => {
  const uniqueId = useId()
  const [roleId, setRoleId] = useState<any>()
  const [stageId, setStageId] = useState<any>()
  const { mutateAsync } = usePost()
  const jobPostID = window.localStorage.getItem('postId')
  const [memberDetails, setMemberDetails] = useState<any[]>([])
  const [userDetail, setUserDetail] = useState<any>()
  const [selectedUser, setSelectedUser] = useState('')
  const [users, setUsers] = useState<any>([])
  const [stageList, setStageList] = useState<any>([])
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const {
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(ADD_MEMBER),
    defaultValues: {
      email: '',
      teamRoleId: '',
    },
  })

  //hiring Stages
  const { data: roleSuggest, refetch: refetchStagesJobData } = useGet(
    `roleSuggestData${uniqueId}`,
    `/job/hiring-stage2-role?jobPostId=${jobPostID ? jobPostID : id}`,
    {
      token: true,
    },
  )

  useEffect(() => {
    refetchStagesJobData()

    return () => {
      setUsers([])
    }
  }, [])

  useEffect(() => {
    if (roleSuggest) {
      setStageList(
        roleSuggest.map((data: HiringStageDetails) => ({
          value: data?.hiringStage?.id,
          label: data?.hiringStage?.stageName,
          roleId: data?.roleId,
        })),
      )
    }
  }, [roleSuggest])

  //staging Users
  const { data: userSuggest, refetch: refetchUserSuggestData } = useGet(
    `userSuggestData${uniqueId}`,
    `/auth/role/users/${roleId}`,
    {
      token: true,
    },
  )

  useEffect(() => {
    if (roleId) refetchUserSuggestData()
    else setUsers([])
  }, [roleId, stageId])

  useEffect(() => {
    if (userSuggest?.allotedUsers?.length > 0) {
      const userList = userSuggest?.allotedUsers?.map((data: User) => ({
        value: data?.id,
        label: data?.userName ? data?.userName : data?.email,
        userId: data?.id,
      }))
      setUsers(userList)
    }
  }, [userSuggest])

  const handleOnclick = (data: MemberDetails) => {
    const matchedMember = memberDetails?.filter(function (item) {
      return item?.userDetail.id !== data?.userDetail?.id
    })
    setMemberDetails(matchedMember)
  }

  useEffect(() => {
    const newData = roleSuggest?.filter((item: HiringStageDetails) => item?.hiringStage?.id === stageId)
    if (newData) {
      setRoleId(newData[0]?.roleId)
    }
  }, [stageId])

  const handleAdd = async () => {
    const payLoad = memberDetails?.map((item) => {
      return {
        userId: item?.userDetail?.id,
        userName: item?.userDetail?.userName,
        userEmail: item?.userDetail?.email,
        hiringStageName: item?.stageDetails?.hiringStage?.stageName,
        roleName: item?.userDetail?.roleName,
        roleId: item?.stageDetails?.roleId,
        hiringStage2RoleHiringStageId: item?.stageDetails?.hiringStage?.id,
        hiringStage2RoleJobPostId: item?.stageDetails?.jobPostId,
      }
    })
    try {
      const res = await mutateAsync({
        url: '/job/hiringStageUsers',
        payload: payLoad,
        token: true,
      })
      if (res) {
        refetchUsers()
        toggleadd()
        setUsers([])
        setStageList([])
      }
    } catch (error: any) {
      return { error: error?.response?.data?.message }
    }
  }

  const handleUserClick = (e: any) => {
    const data = userSuggest?.allotedUsers?.filter((user: User) => user?.id === e)
    const userData = data[0]
    // Add the roleName to the userDetail object
    setSelectedUser(e)
    userData.roleName = userSuggest?.roleName
    setUserDetail(userData)
  }

  const handleSelectChange = (value: any, option: any) => {
    setStageId(value)
    setSelectedUser('')
    setUsers([])
    setRoleId(option?.roleId)
  }

  const handleAddMember = () => {
    const data = roleSuggest?.filter((stage: HiringStageDetails) => stage?.hiringStage?.id == stageId)
    if (data) {
      const stageDetails = data[0]
      const memberAlreadyAssigned = usersList?.some(
        (item: any) =>
          item?.hiringStage2RoleHiringStageId === stageDetails?.hiringStage?.id &&
          item.userName === userDetail?.userName,
      )

      const memberExists = memberDetails?.some(
        (item) =>
          item?.stageDetails?.hiringStage?.id === stageDetails?.hiringStage?.id &&
          item.userDetail.userName === userDetail?.userName,
      )

      if (memberAlreadyAssigned || memberExists) {
        notification?.error({
          message: teamAssignmentModalError,
          duration: 3,
        })
      } else {
        setMemberDetails((prevMemberDetails) => [...prevMemberDetails, { stageDetails, userDetail }])
      }
    }

    reset({ teamRoleId: '' })
  }

  return (
    <TimelineModalContainer>
      <HeadSection>
        <TimelineModalTitle>Add Team Member</TimelineModalTitle>
        <Cross
          onClick={() => {
            setRoleId('')
            toggleadd(), setUsers([]), setStageList([])
          }}
        >
          <CrossIcon />
        </Cross>
      </HeadSection>
      {memberDetails?.length ? (
        <UserWrapper>
          {memberDetails?.map((member, index) => {
            return (
              <Wrapper key={index}>
                <Profile>
                  <ImageWrap>
                    <ProfileImage src={Avatar} />
                  </ImageWrap>
                  <Details>
                    <Name> {member?.userDetail?.userName}</Name>
                    <Username> {member?.userDetail?.email}</Username>
                  </Details>
                </Profile>
                <Department>{member?.stageDetails?.hiringStage?.stageName}</Department>
                <Icons>
                  <DeleteIcon onClick={() => handleOnclick(member)} />
                </Icons>
              </Wrapper>
            )
          })}
        </UserWrapper>
      ) : (
        ''
      )}
      <Bar />
      <Form color={activeColor}>
        <FormWrapper>
          <InputWrap>
            <Label>Hiring Stage</Label>
            <SelectContainer
              control={control}
              name="teamRoleId"
              placeholder="Please select role"
              options={stageList}
              handleValue={handleSelectChange}
            />
            <ErrorMessage>{errors?.teamRoleId?.message}</ErrorMessage>
          </InputWrap>
          <InputWrap>
            <Label>Team Member</Label>
            <SelectContainer
              options={users}
              handleValue={(e: number) => handleUserClick(e)}
              name="userRoleId"
              control={control}
              value={selectedUser}
              placeholder="Please select name"
            />
            <ErrorMessage>{errors?.teamRoleId?.message}</ErrorMessage>
          </InputWrap>
        </FormWrapper>

        <AddButton type="button" disabled={!roleId || !userDetail} onClick={handleAddMember} color={activeColor}>
          <AddMemberIcon />
          Add Member
        </AddButton>
      </Form>
      <Buttons>
        <Button
          label={Cancel}
          variant="text"
          onClick={() => {
            toggleadd(), setUsers([]), setStageList([])
          }}
        />
        <Button
          label="Add"
          variant="contained"
          onClick={handleAdd}
          disabled={memberDetails?.length === 0}
          style={{ backgroundColor: activeColor }}
        />
        {/* <CancelButton onClick={toggleadd}>Cancel</CancelButton> */}
        {/* <SaveButton disabled={memberDetails?.length === 0} onClick={handleAdd}>
          Add
        </SaveButton> */}
      </Buttons>
    </TimelineModalContainer>
  )
}

export default AddMemberModal
