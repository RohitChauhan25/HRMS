import styled from 'styled-components'

export const SignUpContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: 100vh;
`
export const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 180px;
  width: 50%;
  margin: 60px;

  @media (max-width: 1068px) {
    width: 100%;
  }
`
export const LogoWrapper = styled.div`
  display: flex;
`
export const Logo = styled.img`
  max-width: 150px;
  min-height: 76px;
  cursor: pointer;
`
export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 430px;
  width: 100%;
  margin: 0 auto;
  gap: 20px;
`
export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const MainHeading = styled.div`
  font-size: 32px;
  font-weight: 700;
`
export const SubHeading = styled.div`
  font-size: 14px;
  font-weight: 400;
`
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 83px;
`
export const FieldLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`
export const ErrorMessage = styled.p`
  color: #f40012;
  font-size: 12px;
  font-weight: 400;
`
export const ButtonWrapper = styled.div`
  display: flex;
`
export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  gap: 100px;
  background: #1d2e88;
  width: 50%;
  position: relative;
  min-height: calc(100vh - 200px);
  @media (max-width: 1068px) {
    display: none;
  }
`
export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const Wallpaper = styled.img`
  max-width: clamp(300px, 33.333vw, 600px);
  min-height: clamp(150px, 22.917vw, 300px);
`

//Forgot Email Page CSS

export const EmailMainContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`
export const EmailRightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  padding: 46px 56px 0 0;
  @media (max-width: 1068px) {
    width: 100%;
    gap: 15px;
    padding: 10px;
  }
`

export const EmailSentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;

  button {
    width: 198px;
  }
`
export const MailSentImageWrapper = styled.div`
  width: 130px;
  height: 130px;
  svg {
    path {
      stroke: #1d2e88;
    }
    circle {
      stroke: #1d2e88;
    }
  }
`
export const TextInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  gap: 6px;
`
export const MailHeading = styled.h3`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
`
export const MailParagraph = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  max-width: 374px;
  text-align: center;
`
export const MobileLogoWrapper = styled.div`
  display: none;

  @media (max-width: 1068px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    img {
      width: 100%;
      max-width: 116.84px;
      height: 50px;
    }
  }
`
