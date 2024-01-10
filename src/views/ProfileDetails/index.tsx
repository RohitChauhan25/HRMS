import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import useGet from 'hooks/useGet'
import usePatch from 'hooks/usePatch'
import { yupResolver } from '@hookform/resolvers/yup'
import { Cancel, Submit } from 'constants/labels'
import { UserProfileSchema } from 'utils/validators/userProfileSchema'
import TextinputContainer from 'components/TextInput'
import Button from 'components/Button'
import { UserProfileInfo } from 'interfaces/job'
import { ErrorMessage } from 'styles/components/Modal'
import {
  ProfileContainer,
  ProfileDetailWrapper,
  TitleWrapper,
  DetailWrapper,
  ProfileWrapper,
  Heading,
  ProfileButttonwrapper,
} from 'styles/views/ProfileDetails'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const { mutateAsync } = usePatch()
  const navigate = useNavigate()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(UserProfileSchema),
    defaultValues: {
      username: '',
      email: '',
      location: '',
      phone: '',
    },
  })
  const handleCancel = () => {
    navigate('/jobs')
  }
  const { data: getUserData, refetch: refetchUser } = useGet('auth-rolee', `/auth/user/profile`, {
    token: true,
  })

  useEffect(() => {
    refetchUser()
  }, [])

  useEffect(() => {
    setValue('username', getUserData?.userName)
    setValue('email', getUserData?.email)
    setValue('location', getUserData?.location)
    setValue('phone', getUserData?.phone)
  }, [getUserData])

  const userProfile = async (data: UserProfileInfo) => {
    const payload = {
      // email: data?.email,
      userName: data?.username,
      location: data?.location,
      phone: data?.phone,
    }
    try {
      const res = await mutateAsync({
        url: `auth/user`,
        payload: payload,
        token: true,
      })

      if (res) {
        notification.success({
          message: '',
          description: 'User Detail updated Successfully!',
        })
      }
    } catch (error: any) {
      if (error?.response?.data?.statusCode) {
        notification.error({
          message: '',
          description: error?.response?.data?.message,
          duration: 2,
        })
      }
    }
  }

  return (
    <ProfileContainer>
      <ProfileDetailWrapper onSubmit={handleSubmit(userProfile)}>
        <TitleWrapper>User Details</TitleWrapper>
        <DetailWrapper>
          <ProfileWrapper>
            <Heading>User Name</Heading>
            <TextinputContainer placeholder="Enter User Name" control={control} name="username" />
            <ErrorMessage>
              {errors?.username && <span className="error">{errors?.username?.message}</span>}
            </ErrorMessage>
          </ProfileWrapper>
          <ProfileWrapper>
            <Heading>Email ID</Heading>
            <TextinputContainer placeholder="Enter Email" control={control} name="email" disabled />
            <ErrorMessage>{errors?.email && <span className="error">{errors?.email?.message}</span>}</ErrorMessage>
          </ProfileWrapper>
          <ProfileWrapper>
            <Heading>Location</Heading>
            <TextinputContainer placeholder="Enter Location" control={control} name="location" />
            <ErrorMessage>
              {errors?.location && <span className="error">{errors?.location?.message}</span>}
            </ErrorMessage>
          </ProfileWrapper>
          <ProfileWrapper>
            <Heading>Phone Number</Heading>
            <TextinputContainer placeholder="Enter Phone Number" control={control} name="phone" />
            <ErrorMessage>{errors?.phone && <span className="error">{errors?.phone?.message}</span>}</ErrorMessage>
          </ProfileWrapper>
          <ProfileButttonwrapper>
            <Button label={Cancel} variant="text" onClick={handleCancel} />
            <Button label={Submit} variant="contained" type="submit" style={{ backgroundColor: activeColor }} />
          </ProfileButttonwrapper>
        </DetailWrapper>
      </ProfileDetailWrapper>
    </ProfileContainer>
  )
}

export default UserProfile
