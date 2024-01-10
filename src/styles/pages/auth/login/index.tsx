import styled from 'styled-components'

export const Container = styled.div`
  /* width: 100%; */
`
export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: 100vh;
`
export const FormContainer = styled.div`
  width: 50%;
  margin: 60px auto;

  @media (max-width: 1068px) {
    width: 100%;
  }
`

export const CareerWrapper = styled.div`
  width: 100%;
  max-width: 200px;
  cursor: pointer;
`
export const Logo = styled.img`
  max-width: 150px;
  min-height: 76px;
  margin: 0 60px 60px 60px;
`
export const HeadingContainer = styled.div`
  margin-bottom: 40px;
`
export const Heading = styled.div`
  font-size: 32px;
  font-weight: 700;
`

export const SubHeading = styled.p`
  font-size: clamp (12px, 1.111vw, 20px);
  line-height: 24px;
  font-weight: 400;
  color: #4a4a4a;
`
export const FormWrapper = styled.div`
  max-width: 430px;
  margin: 0 auto;
  .forgot-password {
    justify-content: end;
    margin-top: 10px;
  }
  .register-user {
    justify-content: end;
    margin-top: 10px;
  }
`
export const Form = styled.form`
  button {
    height: 56px;
    margin-top: 20px;
  }
`
export const FieldContainer = styled.div`
  display: grid;
  grid-template-rows: 20px auto;
  gap: 8px;
  min-height: 68px;
  position: relative;
  label {
    font-weight: 600;
  }
  .input-field {
    min-height: 44px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #b9b9b9;
    outline: none;
    padding: 0 10px;
    :focus {
      background-color: #ffffff;
    }
    :active {
      background-color: none;
    }
  }
`
export const Input = styled.input`
  min-height: 44px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #b9b9b9;
  outline: none;
  padding: 0 30px 0 10px;
  width: -webkit-fill-available;
  :focus {
    background-color: #ffffff;
  }
  :hover {
    cursor: pointer;
  }
  :active {
    background-color: none;
  }
  ::placeholder {
    font-size: 14px;
  }
`
export const ErrorMessage = styled.p`
  color: #f40012;
  font-size: 12px;
  margin: 0;
  font-weight: 600;
  position: absolute;
  bottom: -20px;
  left: 5px;
`
export const InputFields = styled.div`
  display: grid;
  grid-gap: 17px;
  width: 100%;
`
export const LinkContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`
export const LinkWrapper = styled.div`
  display: flex;
  grid-gap: 10px;
  align-items: center;
  justify-content: center;
`
export const AccountWrapper = styled.div`
  display: flex;
  grid-gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
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
export const SignUpLinkTag = styled.div`
  display: flex;
  justify-content: end;
  color: #1d2e88;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
`
export const Text = styled.div`
  color: #475569;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
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

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
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
export const Wallpaper = styled.img`
  max-width: clamp(300px, 33.333vw, 600px);
  min-height: clamp(150px, 22.917vw, 300px);
`
