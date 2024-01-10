import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 70px;
  width: 100%;
  @media (max-width: 1068px) {
    flex-direction: column;
    gap: 20px;
  }
`
export const FormContainer = styled.div`
  padding: 10px 0;
  width: 100%;
  max-width: 700px;
`

export const AadhaarSection = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  gap: 15px;
`
export const LogoSection = styled.div`
  img {
    height: 60px;
  }
`
export const UploadSection = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  gap: 10px;
  border: 1px solid rgb(185, 185, 185);
  border-radius: 10px;
  padding: 5px 10px;
  justify-content: space-between;
  Button {
    width: 75px;
    height: 31px;
    font-size: 13px;
    background: #1d2e88;
    color: #fff;
  }
`
export const DescriptionContainer = styled.div`
  margin: 20px 0 10px 0;
  .ql-toolbar.ql-snow {
    border-radius: 10px 10px 0 0;
  }
  .ql-container {
    height: 100px;
    border-radius: 0 0 10px 10px;
  }
`
export const ValidationContainer = styled.div`
  background: #f3f5ff;
  border-radius: 12px;
  width: 100%;
  max-width: 320px;
  padding: 20px;
  margin-top: 38px;

  @media (max-width: 1068px) {
    width: -webkit-fill-available;
    max-width: 100%;
  }
`
export const Label = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-top: 28px;
`
export const JobInputWrapper = styled.span``
export const SalaryWrapper = styled.div`
  display: grid;
`
export const SalaryConatainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 15px;
  @media (max-width: 968px) {
    display: grid;
  }
  .ant-input {
    min-width: 160px;
  }
  .ant-select {
    min-width: 160px;
  }
`
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  margin: 20px 0;
`
export const CancelButton = styled.div`
  width: 100%;
  max-width: 302px;
  height: 56px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8e8e8;
  color: #1d1d1d;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
`
export const ModalButtonWrapper = styled.div`
  margin-top: 20px;
`
export const SaveButton = styled.button`
  background: #1d2e88;
  color: #ffffff;
  width: -webkit-fill-available;
  margin: 0 auto;
  height: 56px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 15px;
  border: none;
  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  font-size: 16px;
  font-weight: 600;
`
export const CorrectField = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 15px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`
export const WarningField = styled.div`
  padding: 15px;
  color: #1d1d1d;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`
export const WaitingField = styled.div`
  padding: 15px;
  color: #1d1d1d;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`
export const TabWrapper = styled.div`
  color: #1d2e88;
`
