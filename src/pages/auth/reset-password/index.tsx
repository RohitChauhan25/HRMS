import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import usePost from 'hooks/usePost'
import { LoginRoute, SuccessEmailRoute } from 'constants/routes'
import { ResetPasswordSchema } from 'utils/validators/forgotPasswordSchema'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import WitsLogo from 'assets/images/logoLogin.png'
import Wall from 'assets/images/wallpaper.png'
import CloseEyeIcon from 'assets/svg/CloseEyeIcon'
import PasswordEyeIcon from 'assets/svg/PasswordEyeIcon'
import {
  SignUpContainer,
  ResetPasswordContainer,
  LogoWrapper,
  Logo,
  MainWrapper,
  HeadingWrapper,
  MainHeading,
  SubHeading,
  FormWrapper,
  FormContainer,
  FormFields,
  FieldLabel,
  ErrorMessage,
  ButtonWrapper,
  ImageContainer,
  ImageWrapper,
  Wallpaper,
} from 'styles/pages/auth/reset-password'

interface IPayloadData {
  email?: string
  verifyToken?: string
  password?: string
}
const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { mutateAsync } = usePost()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
      verifyToken: '',
      password: '',
    },
  })
  const onSubmit = async (data: IPayloadData) => {
    const payload = {
      email: data?.email,
      verifyToken: data?.verifyToken,
      password: data?.password,
    }
    try {
      const response = await mutateAsync({
        url: 'auth/recover',
        payload,
      })
      if (response?.access_token) {
        navigate(SuccessEmailRoute?.path)
      }
    } catch (error: any) {
      if (error?.response?.data?.statusCode) {
        notification.error({
          message: '',
          description: error?.response?.data?.message,
          duration: 2,
        })
        // showModal(false)
      }
    }
  }

  return (
    <SignUpContainer>
      <ResetPasswordContainer>
        <LogoWrapper
          onClick={() => {
            navigate(LoginRoute?.path)
          }}
        >
          <Logo src={WitsLogo} alt="Wits Innovation Logo" />
        </LogoWrapper>
        <MainWrapper>
          <HeadingWrapper>
            <MainHeading>Reset your Password</MainHeading>
            <SubHeading>Please enter your password below! </SubHeading>
          </HeadingWrapper>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <FormContainer>
              <FormFields>
                <FieldLabel>Email</FieldLabel>
                <TextinputContainer placeholder="Please enter email address" control={control} name="email" />
                <ErrorMessage>{errors?.email && errors?.email?.message}</ErrorMessage>
              </FormFields>
              <FormFields>
                <FieldLabel>Token</FieldLabel>
                <TextinputContainer
                  placeholder="Please enter token received on mail"
                  control={control}
                  name="verifyToken"
                />
                <ErrorMessage>{errors?.verifyToken && errors?.verifyToken?.message}</ErrorMessage>
              </FormFields>
              <FormFields>
                <FieldLabel>New Password</FieldLabel>
                <TextinputContainer
                  placeholder="Please enter new password"
                  control={control}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                />
                {showPassword ? (
                  <CloseEyeIcon onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <PasswordEyeIcon onClick={() => setShowPassword(!showPassword)} />
                )}
                <ErrorMessage>{errors?.password && errors?.password?.message}</ErrorMessage>
              </FormFields>
            </FormContainer>
            <ButtonWrapper>
              <Button label="Submit" variant="contained" type="submit" />
            </ButtonWrapper>
          </FormWrapper>
        </MainWrapper>
      </ResetPasswordContainer>
      <ImageContainer>
        <ImageWrapper>
          <Wallpaper src={Wall} alt="background-image" />
        </ImageWrapper>
      </ImageContainer>
    </SignUpContainer>
  )
}

export default ResetPassword
