import { getTabColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'
import styled from 'styled-components'

interface IProps {
  length?: number
}
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

export const CheckBox = styled.input`
  width: 18px;
  cursor: pointer;
  /* height: 18px; */
`
export const FormContainer = styled.div`
  padding: 10px 0;
  width: 100%;
  max-width: 1020px;
`
export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const ScreeningFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 10px 0;
  width: 100%;
  max-width: 1020px;
`
export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  width: 100%;
  max-width: 320px;
`

export const ApprovalSection = styled.div<IProps>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: end;
  min-height: ${(props) => (props.length === 0 ? '468px' : props.length === 1 ? '296px' : '')};
  .formSubmit {
    max-width: 188px;
    height: 44px;
  }
  .delete {
    max-width: 188px;
  }
`
export const ApprovalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
export const ApprovalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* min-height: 74vh; */
  position: relative;
  justify-content: flex-end;
  border: 2px solid;
  border-style: dashed;
  border-color: #e8e8e8;
  border-radius: 8px;
  padding: 10px;
  margin-top: 29px;
`
export const FormText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 30px;
  color: #e8e8e8;
  text-transform: capitalize;
`

export const DescriptionContainer = styled.div`
  margin: 12px 0 10px 0;
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
  /* width: 100%;
  max-width: 320px; */
  padding: 20px;
  margin-top: 38px;

  @media (max-width: 1068px) {
    width: -webkit-fill-available;
    max-width: 100%;
  }
`

export const JobTitleContent = styled.div<TabProps>`
  color: ${(props) => getTabColor(props)};
`
export const ScreeningFormLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-transform: capitalize;
`

export const CheckboxQuestionQrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const Label = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-transform: capitalize;
  margin-top: 28px;
`

export const TextLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-transform: capitalize;
`
export const JobInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  .apply-textarea {
    height: 100px;
  }
`

export const UserListWrapper = styled.div`
  .ant-input {
    min-width: 350px;
  }

  @media (max-width: 1000px) {
    .ant-select {
      min-width: 0 !important;
    }
  }
`

export const SalaryWrapper = styled.div`
  /* display: grid; */
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const SalaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media (max-width: 968px) {
    display: flex;
    flex-direction: column;
  }
  .ant-input {
    min-width: 160px;
    height: 44px;
  }
  .ant-select {
    min-width: 73px;
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
  /* max-width: 302px; */
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
  display: flex;
  justify-content: center;
  button {
    width: 100%;
    max-width: 400px;
  }
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
export const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .ant-checkbox-wrapper {
    font-weight: 600;
  }
`
export const LocationWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`
export const LocationLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
`
export const AssigneeWrapper = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
`
export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
export const PrivateContainer = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
  width: 100%;
  align-items: center;
  .ant-select {
    min-width: 430px !important;
  }
`
