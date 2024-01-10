import Button from 'components/Button'
import DownArrowIcon from 'assets/svg/DownArrowIcon'
import Wits from 'assets/images/logoLogin.png'
import Success from 'assets/images/submitSuccess.png'
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

const VerificationComplete = () => {
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
            <Logo src={Success} />
            <ContentTitle>Verification Completed Successfully!</ContentTitle>
            <ContentDescription>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            </ContentDescription>
            <Button type={'submit'} label={'Invite Your Team'} variant={'contained'} />
          </ContentWrapper>
        </FormContainer>
        <ImageContainer>
          <Wallpaper src={Wall} />
        </ImageContainer>
      </Wrapper>
    </Container>
  )
}

export default VerificationComplete
