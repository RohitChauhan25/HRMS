import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import usePost from 'hooks/usePost'
import { LoginRoute } from 'constants/routes'
import { UserSignUpSchema } from 'utils/validators/userSignUpSchema'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import WitsLogo from 'assets/images/logoLogin.png'
import Wall from 'assets/images/wallpaper.png'
import CloseEyeIcon from 'assets/svg/CloseEyeIcon'
import PasswordEyeIcon from 'assets/svg/PasswordEyeIcon'
import {
  SignUpContainer,
  SignUpWrapper,
  MainWrapper,
  HeadingWrapper,
  MainHeading,
  LogoWrapper,
  Logo,
  FormWrapper,
  FormContainer,
  FormFields,
  FieldLabel,
  ButtonWrapper,
  LinkWrapper,
  Text,
  LinkTag,
  ImageContainer,
  TitleSection,
  Title,
  SubTitle,
  ImageWrapper,
  Wallpaper,
  ErrorMessage,
} from 'styles/pages/auth/signup'

interface ISignUpPayload {
  email?: string
  username?: string
  token?: string
  password?: string
}

const UserSignUp = () => {
  const { mutateAsync } = usePost()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(UserSignUpSchema),
    defaultValues: {
      email: '',
      username: '',
      token: '',
      password: '',
    },
  })
  const onSubmit = async (data: ISignUpPayload) => {
    const payload = {
      email: data?.email,
      userName: data?.username,
      token: data?.token,
      password: data?.password,
    }
    try {
      const response = await mutateAsync({
        url: 'auth/signup',
        payload,
      })
      if (response?.success) {
        navigate(LoginRoute?.path)
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
      <SignUpWrapper>
        <LogoWrapper>
          <Logo src={WitsLogo} alt="Wits Innovation Logo" />
        </LogoWrapper>
        <MainWrapper>
          <HeadingWrapper>
            <MainHeading>Sign Up</MainHeading>
          </HeadingWrapper>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <FormContainer>
              <FormFields>
                <FieldLabel>Email</FieldLabel>
                <TextinputContainer placeholder="Please enter email address" control={control} name="email" />
                <ErrorMessage>{errors?.email && errors?.email?.message}</ErrorMessage>
              </FormFields>
              <FormFields>
                <FieldLabel>Username</FieldLabel>
                <TextinputContainer placeholder="Please enter username" control={control} name="username" />
                <ErrorMessage>{errors?.username && errors?.username?.message}</ErrorMessage>
              </FormFields>
              <FormFields>
                <FieldLabel>Token</FieldLabel>
                <TextinputContainer placeholder="Please enter token received in email" control={control} name="token" />
                <ErrorMessage>{errors?.token && errors?.token?.message}</ErrorMessage>
              </FormFields>
              <FormFields>
                <FieldLabel>Password</FieldLabel>
                <TextinputContainer
                  placeholder="Please enter password"
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
              <Button label="Register" variant="contained" type="submit" />
            </ButtonWrapper>
            <LinkWrapper>
              <Text>Already have an account ?</Text>
              <LinkTag
                onClick={() => {
                  navigate(LoginRoute?.path)
                }}
              >
                Sign In
              </LinkTag>
            </LinkWrapper>
          </FormWrapper>
        </MainWrapper>
      </SignUpWrapper>
      <ImageContainer>
        <TitleSection>
          <Title>WELCOME TO WIL HRMS</Title>
          <SubTitle>
            Discover the world&apos;s best HRMS tool you will ever need. Simplest way to manage your workforce.{' '}
          </SubTitle>
        </TitleSection>
        <ImageWrapper>
          <Wallpaper src={Wall} alt="background-image" />
        </ImageWrapper>
      </ImageContainer>
    </SignUpContainer>
  )
}

export default UserSignUp
