import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Checkbox, Progress } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'
import { SIGNUP_VALIDATION_SCHEMA } from 'utils/validators/signUpSchema'
import { LoginRoute } from 'constants/routes'
import Button from 'components/Button'
import Inputs from 'components/Input'
import Wits from 'assets/images/logoLogin.png'
import Wall from 'assets/images/wallpaper.png'
import {
  Container,
  ErrorMessage,
  FieldContainer,
  Form,
  FormContainer,
  FormWrapper,
  Heading,
  HeadingContainer,
  ImageContainer,
  ImageWrapper,
  InputFields,
  LinkTag,
  LinkWrapper,
  Logo,
  SubTitle,
  Text,
  Title,
  TitleSection,
  Wallpaper,
  Wrapper,
} from 'styles/pages/auth/login'
import { Label, ButtonWrapper, ProgressBar, CheckboxLabel } from 'styles/pages/auth/StartTrial'

const StartTrial = () => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(SIGNUP_VALIDATION_SCHEMA),
    defaultValues: {
      name: '',
      company: '',
      role: '',
      email: '',
      phone: '',
      password: '',
    },
  })

  const calculateStrength = (password: string): number => {
    let strength = 0

    //check length of password
    if (password.length >= 8) {
      strength += 33.33
    }

    //check if Password contains minimum of one letter
    if (/[a-zA-Z]/.test(password)) {
      strength += 33.33
    }

    if (/\d/.test(password)) {
      strength += 33.33
    }

    return strength
  }

  const onSubmit = (data: any) => alert(data)

  return (
    <Container>
      <Wrapper>
        <FormContainer>
          <Logo src={Wits} />
          <FormWrapper>
            <HeadingContainer>
              <Heading>Start Your Free Trial</Heading>
              <Text>Let’s get started with your 7 day trial</Text>
            </HeadingContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputFields>
                <FieldContainer>
                  <Label htmlFor="email">Name*</Label>
                  <Inputs
                    autoComplete="off"
                    className="input-field"
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    control={control}
                  />
                  <ErrorMessage>{errors?.name && errors?.name?.message}</ErrorMessage>
                </FieldContainer>
                <FieldContainer>
                  <Label htmlFor="email">Company Name*</Label>
                  <Inputs
                    autoComplete="off"
                    className="input-field"
                    type="text"
                    placeholder="Enter Company Name"
                    name="company"
                    control={control}
                  />
                  <ErrorMessage>{errors?.company && errors?.company?.message}</ErrorMessage>
                </FieldContainer>
                <FieldContainer>
                  <Label htmlFor="email">Primary Role*</Label>
                  <Inputs
                    autoComplete="off"
                    className="input-field"
                    type="text"
                    placeholder="Enter Primary Role"
                    name="role"
                    control={control}
                  />
                  <ErrorMessage>{errors?.role && errors?.role?.message}</ErrorMessage>
                </FieldContainer>
                <FieldContainer>
                  <Label htmlFor="email">Email Address*</Label>
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
                  <Label htmlFor="email">Phone Number*</Label>
                  <Inputs
                    autoComplete="off"
                    className="input-field"
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phone"
                    control={control}
                  />
                  <ErrorMessage>{errors?.phone && errors?.phone?.message}</ErrorMessage>
                </FieldContainer>
                <FieldContainer>
                  <Label htmlFor="password">Password*</Label>
                  <Inputs
                    type="password"
                    className="input-field"
                    autoComplete="off"
                    name="password"
                    placeholder="Enter Password"
                    control={control}
                  />
                  <ProgressBar>
                    <Controller
                      control={control}
                      name="password"
                      defaultValue=""
                      render={({ field }) => <Progress percent={calculateStrength(field.value)} showInfo={false} />}
                    />
                    <Label htmlFor="password">Password Strength</Label>

                    <Controller
                      control={control}
                      name="password"
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <Checkbox className="checkbox" checked={field.value.length >= 8} disabled>
                            <CheckboxLabel>Minimum 8 characters</CheckboxLabel>
                          </Checkbox>
                          <Checkbox className="checkbox" checked={/[a-zA-z]/.test(field.value)} disabled>
                            <CheckboxLabel>Contains a letter</CheckboxLabel>
                          </Checkbox>
                          <Checkbox className="checkbox" checked={/\d/.test(field.value)} disabled>
                            <CheckboxLabel>Contains a number</CheckboxLabel>
                          </Checkbox>
                        </>
                      )}
                    />
                  </ProgressBar>
                </FieldContainer>
              </InputFields>
              <ButtonWrapper>
                <Button type={'submit'} label={'Create Account'} variant={'contained'} />
              </ButtonWrapper>
            </Form>
            <LinkWrapper>
              <Text>Already have an account? </Text>
              <LinkTag
                onClick={() => {
                  navigate(LoginRoute?.path)
                }}
              >
                Sign In
              </LinkTag>
            </LinkWrapper>
          </FormWrapper>
        </FormContainer>
        <ImageContainer>
          <TitleSection>
            <Title>WELCOME TO WIL HRMS</Title>
            <SubTitle>
              Discover the world&apos;s best HRMS tool you will ever need. Simplest way to manage your workforce.{' '}
            </SubTitle>
          </TitleSection>
          <ImageWrapper>
            <Wallpaper src={Wall} />
          </ImageWrapper>
        </ImageContainer>
      </Wrapper>
    </Container>
  )
}

export default StartTrial
