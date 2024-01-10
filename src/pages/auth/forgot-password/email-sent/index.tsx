import { useNavigate } from 'react-router-dom'
import { ResetPasswordRoute } from 'constants/routes'
import Button from 'components/Button'
import WitsLogo from 'assets/images/logoLogin.png'
import Wall from 'assets/images/wallpaper.png'
import SuccessfullIcon from 'assets/svg/SuccessfullIcon'
import {
  EmailMainContainer,
  EmailRightSection,
  EmailSentContainer,
  MailSentImageWrapper,
  TextInformationWrapper,
  MailHeading,
  MailParagraph,
  MobileLogoWrapper,
  ImageContainer,
  ImageWrapper,
  Wallpaper,
} from 'styles/pages/auth/forgot-password'

const ForgotEmailSent = () => {
  const navigate = useNavigate()

  const onHandleClick = () => {
    navigate(ResetPasswordRoute?.path)
  }

  return (
    <EmailMainContainer>
      <EmailRightSection>
        <EmailSentContainer>
          <MobileLogoWrapper>
            <img src={WitsLogo} alt="WITS INNOVATION LAB" />
          </MobileLogoWrapper>
          <MailSentImageWrapper>
            <SuccessfullIcon />
          </MailSentImageWrapper>
          <TextInformationWrapper>
            <MailHeading>We have sent an email.</MailHeading>

            <MailParagraph>Please check your email and enter the code</MailParagraph>
          </TextInformationWrapper>
          <Button type="submit" label="Okay" variant="contained" onClick={onHandleClick} />
        </EmailSentContainer>
      </EmailRightSection>
      <ImageContainer>
        <ImageWrapper>
          <Wallpaper src={Wall} alt="background-image" />
        </ImageWrapper>
      </ImageContainer>
    </EmailMainContainer>
  )
}

export default ForgotEmailSent
