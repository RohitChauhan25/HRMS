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
  gap: 50px;
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
`
export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 430px;
  width: 100%;
  margin: 0 auto;
  gap: 20px;
`
export const HeadingWrapper = styled.div``
export const MainHeading = styled.div`
  font-size: 32px;
  font-weight: 700;
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
  position: relative;
  svg {
    height: 18px;
    position: absolute;
    right: 10px;
    top: 35px;
  }
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
export const LinkWrapper = styled.div`
  display: flex;
  grid-gap: 10px;
  align-items: center;
  justify-content: center;
`
export const Text = styled.div`
  color: #475569;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
`
export const LinkTag = styled.div`
  display: flex;
  justify-content: end;
  color: #1d2e88;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
`
export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
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
export const TitleSection = styled.div`
  color: #fefefe;
`
export const Title = styled.h1`
  margin: 0;
  line-height: 60px;
  font-weight: 700;
`
export const SubTitle = styled.p`
  max-width: clamp(300px, 27.82vw, 500px);
  line-height: 24px;
  font-weight: 400;
`
export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const Wallpaper = styled.img`
  max-width: clamp(300px, 33.333vw, 600px);
  min-height: clamp(150px, 22.917vw, 300px);
`
