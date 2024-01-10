import styled from 'styled-components'
export const PreviewWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: scroll;
`
export const PreviewNavbar = styled.div`
  width: 750px;
`
export const FormHeading = styled.div`
  font-weight: 400;
  font-size: 24px;
`
export const Wrapper = styled.div`
  display: 'flex';
  width: 100%;
  gap: '30px';
`

export const PreviewHeading = styled.div`
  background-color: #f9c51c;
  padding: 20px 50px;
  display: flex;
  align-items: center;
`
export const OkButton = styled.button<Props>`
  width: 100%;
  height: 50px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color};
  background-color: ${(props) => (props.background ? props.background : '#1d2e88')};
`

export const PreviewHeadingText = styled.h3`
  font-weight: 700;
  font-size: 32px;
`
interface Props {
  background?: string
  color?: string
}
export const Button = styled.button<Props>`
  width: 306px;
  height: 50px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color};
  background-color: ${(props) => (props.background ? props.background : '#1d2e88')};
`
export const ButttonWrapper = styled.div`
  display: flex;
  /* gap: 10px; */
  justify-content: space-between;
`
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
`

export const Form = styled.form`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const Uploader = styled.div``

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .ant-space-item {
    width: 100%;
  }
  .radio {
    flex-direction: row !important;
    display: flex;
  }
`
export const DescriptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #b9b9b9;
  min-height: 40px;
  border-radius: 7px;
  margin-top: 10px;
  padding: 10px 0 0 10px;
`

export const RadioWrapper = styled.div`
  display: flex;
  gap: 10px;
`
export const UploadResume = styled.div`
  width: 100%;
  padding: 20px 0;
  border: 1px dashed #b9b9b9;
  border-radius: 5px;
  display: grid;
  align-items: center;
  justify-items: center;
  margin-top: 10px;
  input {
    border-color: #b9b9b9 !important;
    box-shadow: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 176px;
    text-align: center;
  }
`
