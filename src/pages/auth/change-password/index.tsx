import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import usePatch from 'hooks/usePatch'
import { JobDashboardRoute } from 'constants/routes'
import { ChangePasswordSchema } from 'utils/validators/changePasswordSchema'
import TextinputContainer from 'components/TextInput'
import Button from 'components/Button'
import { IPayloadData } from 'interfaces'
import CloseEyeIcon from 'assets/svg/CloseEyeIcon'
import PasswordEyeIcon from 'assets/svg/PasswordEyeIcon'
import {
  ChangePasswordWrapper,
  ChangePasswordContainer,
  TitleWrapper,
  PasswordWrapper,
  PasswordContainer,
  FieldsWrapper,
  FieldTitle,
  DetailWrapper,
  ErrorMessage,
} from 'styles/pages/auth/change-password'

const ChangePassword = () => {
  const { mutateAsync } = usePatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })
  const onSubmit = async (data: IPayloadData) => {
    const payload = {
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword,
    }
    try {
      const response = await mutateAsync({
        url: 'auth/user/v/pass',
        payload,
        token: true,
      })
      if (response) {
        notification.success({
          message: 'Password Changed',
          description: 'Your password has been changed successfully!',
        })
        navigate(JobDashboardRoute?.path)
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
    <ChangePasswordWrapper>
      <ChangePasswordContainer>
        <TitleWrapper>Change Password</TitleWrapper>
        <PasswordWrapper onSubmit={handleSubmit(onSubmit)}>
          <PasswordContainer>
            <FieldsWrapper>
              <FieldTitle>Old Password</FieldTitle>
              <DetailWrapper>
                <TextinputContainer
                  placeholder="Enter old password"
                  control={control}
                  name="oldPassword"
                  type={showPassword ? 'text' : 'password'}
                />
                {showPassword ? (
                  <CloseEyeIcon onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <PasswordEyeIcon onClick={() => setShowPassword(!showPassword)} />
                )}
                <ErrorMessage>{errors?.oldPassword && errors?.oldPassword?.message}</ErrorMessage>
              </DetailWrapper>
            </FieldsWrapper>
            <FieldsWrapper>
              <FieldTitle>New Password</FieldTitle>
              <DetailWrapper>
                <TextinputContainer
                  placeholder="Enter new password"
                  control={control}
                  name="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                />
                {showNewPassword ? (
                  <CloseEyeIcon onClick={() => setShowNewPassword(!showNewPassword)} />
                ) : (
                  <PasswordEyeIcon onClick={() => setShowNewPassword(!showNewPassword)} />
                )}
                <ErrorMessage>{errors?.newPassword && errors?.newPassword?.message}</ErrorMessage>
              </DetailWrapper>
            </FieldsWrapper>
            <FieldsWrapper>
              <FieldTitle>Confirm Password</FieldTitle>
              <DetailWrapper>
                <TextinputContainer
                  placeholder="Enter new password"
                  control={control}
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                />
                {showConfirmPassword ? (
                  <CloseEyeIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                ) : (
                  <PasswordEyeIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                )}
                <ErrorMessage>{errors?.confirmPassword && errors?.confirmPassword?.message}</ErrorMessage>
              </DetailWrapper>
            </FieldsWrapper>
          </PasswordContainer>
          <Button label="Change Password" variant="contained" type="submit" style={{ backgroundColor: activeColor }} />
        </PasswordWrapper>
      </ChangePasswordContainer>
    </ChangePasswordWrapper>
  )
}

export default ChangePassword
