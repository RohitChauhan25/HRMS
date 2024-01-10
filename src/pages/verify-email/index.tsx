import Button from 'components/Button'
import DownArrowIcon from 'assets/svg/DownArrowIcon'
import Wits from 'assets/images/logoLogin.png'
import Verify from 'assets/images/verifyEmail.png'
import Wall from 'assets/images/verifySideWrapper.png'
import { Container, Wallpaper, Wrapper } from 'styles/pages/auth/login'
import {
  LogoContainer,
  Logo,
  FormContainer,
  Back,
  ContentWrapper,
  ContentTitle,
  ContentDescription,
  ImageContainer,
} from 'styles/pages/VerifyEmail'

const VerifyEmail = () => {
  return (
    <Container>
      <Wrapper>
        <FormContainer>
          <LogoContainer>
            <Logo src={Wits} />
            <Back>
              <DownArrowIcon />
              Back
            </Back>
          </LogoContainer>
          <ContentWrapper>
            <Logo src={Verify} />
            <ContentTitle>Verify Email</ContentTitle>
            <ContentDescription>
              We have shared an email verification link to your email. Please verify you email to continue.
            </ContentDescription>
            <Button type={'submit'} label={'Resend Link'} variant={'contained'} />
          </ContentWrapper>
        </FormContainer>
        <ImageContainer>
          <Wallpaper src={Wall} />
        </ImageContainer>
      </Wrapper>
    </Container>
  )
}

export default VerifyEmail
