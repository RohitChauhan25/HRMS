import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import usePost from 'hooks/usePost'
import { ForgotPasswordSchema } from 'utils/validators/forgotPasswordSchema'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import ForgotEmailSent from 'pages/auth/forgot-password/email-sent'
import WitsLogo from 'assets/images/logoLogin.png'
import Wall from 'assets/images/wallpaper.png'
import {
  SignUpContainer,
  SignUpWrapper,
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
} from 'styles/pages/auth/forgot-password'

interface IPayloadData {
  email?: string
}
const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false)
  const navigate = useNavigate()
  const { mutateAsync } = usePost()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })
  const onSubmit = async (data: IPayloadData) => {
    const payload = {
      email: data?.email,
    }
    try {
      const response = await mutateAsync({
        url: 'auth/forgot',
        payload,
      })
      if (response.msg) {
        setEmailSent(true)
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
    <>
      {!emailSent ? (
        <SignUpContainer>
          <SignUpWrapper>
            <LogoWrapper
              onClick={() => {
                navigate(-1)
              }}
            >
              <Logo src={WitsLogo} alt="Wits Innovation Logo" />
            </LogoWrapper>
            <MainWrapper>
              <HeadingWrapper>
                <MainHeading>Forgot Password?</MainHeading>
                <SubHeading>Please enter your registered email below </SubHeading>
              </HeadingWrapper>
              <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <FormContainer>
                  <FormFields>
                    <FieldLabel>Email</FieldLabel>
                    <TextinputContainer placeholder="Please enter email address" control={control} name="email" />
                    <ErrorMessage>{errors?.email && errors?.email?.message}</ErrorMessage>
                  </FormFields>
                </FormContainer>
                <ButtonWrapper>
                  <Button label="Submit" variant="contained" type="submit" />
                </ButtonWrapper>
              </FormWrapper>
            </MainWrapper>
          </SignUpWrapper>
          <ImageContainer>
            <ImageWrapper>
              <Wallpaper src={Wall} alt="background-image" />
            </ImageWrapper>
          </ImageContainer>
        </SignUpContainer>
      ) : (
        <ForgotEmailSent />
      )}
    </>
  )
}

export default ForgotPassword
