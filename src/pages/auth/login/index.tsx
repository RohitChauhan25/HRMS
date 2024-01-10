import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
import { VALIDATION_SCHEMA } from 'utils/validators/LoginSchema'
import {
  JobDashboardRoute,
  StartTrialRoute,
  SignUpRoute,
  ForgotPasswordRoute,
  ExploreCareerRoute,
} from 'constants/routes'
import Inputs from 'components/Input'
import Button from 'components/Button'
import Modal from 'components/Modal'
import ErrorModal from 'views/Modals/ErrorModal'
import { ILogin } from 'interfaces/login'
import Wits from 'assets/images/logoLogin.png'
import Wall from 'assets/images/wallpaper.png'
import {
  Container,
  ErrorMessage,
  FieldContainer,
  Form,
  FormContainer,
  CareerWrapper,
  FormWrapper,
  Heading,
  HeadingContainer,
  ImageContainer,
  ImageWrapper,
  InputFields,
  LinkTag,
  SignUpLinkTag,
  LinkContainer,
  LinkWrapper,
  AccountWrapper,
  Logo,
  SubTitle,
  Text,
  Title,
  TitleSection,
  Wallpaper,
  Wrapper,
} from 'styles/pages/auth/login'

const Login = () => {
  const navigate = useNavigate()
  const { mutateAsync } = usePost()
  const [errorModal, setErrorModal] = useState(false)
  const [error, setError] = useState('')
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(VALIDATION_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<any> = async (data: ILogin) => {
    try {
      const res = await mutateAsync({
        url: 'auth/login',
        payload: data,
      })
      if (res) {
        localStorage.setItem('token', res?.access_token)
        // const user = jwt(token);
        navigate(JobDashboardRoute?.path)
      }
    } catch (error: any) {
      setError(error?.response?.data?.message)
      setErrorModal(true)
      return { error: error }
    }
  }

  return (
    <Container>
      <Wrapper>
        <FormContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Logo src={Wits} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', margin: ' 0 30px 30px 0' }}>
              <CareerWrapper onClick={() => navigate(ExploreCareerRoute?.path)}>
                <Button label="Career" variant="contained" type="submit" />
              </CareerWrapper>
            </div>
          </div>
          <FormWrapper>
            <HeadingContainer>
              <Heading>Sign In</Heading>
            </HeadingContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputFields>
                <FieldContainer>
                  <label htmlFor="email">Email Address*</label>
                  <Inputs
                    autoComplete="off"
                    className="input-field"
                    type="text"
                    placeholder="Enter Email Address"
                    name="email"
                    control={control}
                  />
                  <ErrorMessage>{errors?.email && errors?.email?.message}</ErrorMessage>
                </FieldContainer>
                <FieldContainer>
                  <label htmlFor="password">Password*</label>
                  <Inputs
                    type="password"
                    className="input-field"
                    autoComplete="off"
                    name="password"
                    placeholder="Enter Password"
                    control={control}
                  />
                  <ErrorMessage>{errors?.password && errors?.password?.message}</ErrorMessage>
                </FieldContainer>
              </InputFields>
              <LinkWrapper className="forgot-password">
                <SignUpLinkTag
                  onClick={() => {
                    navigate(ForgotPasswordRoute?.path)
                  }}
                >
                  Forgot Password?
                </SignUpLinkTag>
              </LinkWrapper>
              <Button label="Sign In" variant="contained" type="submit" />

              <LinkContainer>
                <LinkWrapper className="register-user">
                  <Text>Not registered yet?</Text>
                  <SignUpLinkTag
                    onClick={() => {
                      navigate(SignUpRoute?.path)
                    }}
                  >
                    Register
                  </SignUpLinkTag>
                </LinkWrapper>
              </LinkContainer>
            </Form>
            <AccountWrapper>
              <Text>Don&apos;t have an account?</Text>
              <LinkTag
                onClick={() => {
                  navigate(StartTrialRoute?.path)
                }}
              >
                Start Your Free Trial
              </LinkTag>
            </AccountWrapper>
          </FormWrapper>
        </FormContainer>
        <ImageContainer>
          <TitleSection>
            <Title>Welcome Back</Title>
            <SubTitle>Log in to your account - enjoy exclusive features and much more. </SubTitle>
          </TitleSection>
          <ImageWrapper>
            <Wallpaper src={Wall} />
          </ImageWrapper>
        </ImageContainer>
      </Wrapper>
      <Modal isOpen={errorModal} className="modal">
        <ErrorModal message={error} errortoggle={() => setErrorModal(!errorModal)} />
      </Modal>
    </Container>
  )
}

export default Login
