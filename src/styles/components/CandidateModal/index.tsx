import styled from 'styled-components'

export const CandidateContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 28px;
  position: relative;
`
export const PreviewModalContainer = styled.div`
  max-width: 700px;
  margin-left: auto;
  background: #ffffff;
  overflow-y: scroll;
  padding: 20px;
`
export const CheckContainer = styled.div`
  margin: 10px 0;
`
export const ImageContainer = styled.div`
  width: 100%;
  text-align: center;
`
export const PreviewTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #1d1d1d;
  background: #f9c51c;
  padding: 20px;
`

export const Container = styled.div``

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between !important;
  grid-gap: 44px;
  justify-content: center;
  border-radius: 16px;
  background: #ffffff;
  margin: 20px 20px 20px 0;
`
export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px 24px 24px;
  border-bottom: 2px solid #bcc6fc;
  gap: 50px;
`
export const Header = styled.h2`
  margin: 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`
export const DataWrapper = styled.div`
  display: grid;
  padding: 20px 0;
  margin: 40px 0;
  border-top: 1px solid #bcc6fc;
  border-bottom: 1px solid #bcc6fc;
  .ant-picker-range {
    width: 100%;
  }
`
export const ImageWrap = styled.div`
  border: 3px solid #f9c51c;
  border-radius: 100%;
  height: 56px;
`
export const ProfileImage = styled.img`
  width: 56px;
  border-radius: 100%;
  height: 56px;
`
export const Profile = styled.div`
  display: flex;
  grid-gap: 16px;
`
export const ProfileWrapper = styled.div``
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1d;
`
export const Username = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: #686868;
`
export const AddButton = styled.button`
  padding: 10px 16px;
  width: 100%;
  border: 2px solid #1d2e88;
  border-radius: 8px;
  text-align: center;
  margin: 30px 0;
  color: #1d2e88;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  background: transparent;
  cursor: pointer;
`
export const Department = styled.p`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 20px;
  color: #686868;
`
export const Icons = styled.div`
  display: flex;
  grid-gap: 28px;
  justify-content: center;
  align-items: center;
`
export const Bar = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background: #e8e8e8;
`
export const FormWrapper = styled.div`
  display: flex;
  gap: 60px;
  justify-content: space-between;
`
export const Form = styled.form`
  display: grid;
  border-bottom: 2px solid #bcc6fc;
`
export const InputWrap = styled.div`
  width: 100%;
  min-width: 200px;
  label {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  input {
    height: 42px;
  }
`

export const ModalButtons = styled.div`
  display: flex;
  justify-content: end;
  align-self: center;
  grid-gap: 20px;
`
export const ModalTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #1d1d1d;
  text-align: center;
  margin: 20px auto;
`
export const WarningTitle = styled.div`
  font-weight: 700;
  font-size: 34px;
  line-height: 32px;
  color: #1d1d1d;
  text-align: center;
  margin: 20px auto;
`
export const DateContainer = styled.div`
  width: 100%;
`
export const TimelineModalTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 32px;
  color: #1d1d1d;
`
export const DateLabel = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 32px;
  color: #1d1d1d;
`
export const HeadSection = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 5;
`
export const TimelineModalContainer = styled.div`
  margin: 0 auto;
  background: #ffffff;
  padding: 30px;
  position: relative;
  border-radius: 10px;
`
export const Cross = styled.div`
  width: max-content;
  margin-left: auto;
  cursor: pointer;
`
export const Description = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #4a4a4a;
  text-align: center;
  margin: 10px auto 20px auto;
`
export const ViewButton = styled.div`
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  padding: 15px 16px;
  background: #1d2e88;
  border-radius: 8px;
  cursor: pointer;
  color: #ffffff;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
`
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 279px;
  margin: 20px 18px 20px auto;
  padding-bottom: 20px;
`
export const ErrorMessage = styled.div`
  font-size: 12px;
  margin: 8px 0;
  color: #f40012;
`
export const InputContainer = styled.div`
  margin-top: 10px;
  input {
    width: 100%;
  }
`
export const UserWrapper = styled.div`
  max-height: 90px;
  overflow-y: scroll;
`
export const AutoSuggest = styled.div`
  margin-top: 0;
`
export const SaveButton = styled.button`
  background: #1d2e88;
  color: #ffffff;
  width: 100%;
  margin: 0 auto;
  height: 56px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-weight: 600;
  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
export const ReasonWrapper = styled.div`
  display: grid;
  padding: 20px 0;
  margin: 25px 0;
  border-top: 1px solid #bcc6fc;
  border-bottom: 1px solid #bcc6fc;
`

export const Section = styled.div`
  display: flex;
  border-bottom: 1px solid #bcc6fc;
  padding: 30px;
`

export const Heading = styled.div`
  font-weight: 700;
  font-size: 24px;
`
export const FormContainer = styled.div`
  padding: 10px 0;
  width: 100%;
  max-width: 700px;
`
export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-top: 28px;
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
export const SalaryWrapper = styled.div`
  display: grid;
`

export const FirstField = styled.div`
  width: 100%;
  max-width: 350px;
  input {
    ::-webkit-input-placeholder {
      /* Edge */
      color: #b9b9b9;
      font-size: 16px;
      font-weight: 400;
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #b9b9b9;
      font-size: 16px;
      font-weight: 400;
    }

    ::placeholder {
      color: #b9b9b9;
      font-size: 16px;
      font-weight: 400;
    }
  }
`

export const SecondField = styled.div`
  width: 100%;
  max-width: 350px;
  .ant-select-selection-placeholder {
    padding-inline-end: 18px;
    color: #1d1d1d;
    font-size: 16px;
    font-weight: 400;
  }
`

export const Field = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 14px;
`

export const ThirdField = styled.div`
  padding: 4px 42px;

  .ant-select-selection-placeholder {
    padding-inline-end: 18px;
    color: #1d1d1d;
    font-size: 16px;
    font-weight: 400;
  }
`
export const FourthField = styled.div`
  display: flex;
  padding: 4px 42px;
  gap: 20px;
`

export const SalarySection = styled.div`
  width: 100%;
  max-width: 393px;

  input {
    ::-webkit-input-placeholder {
      /* Edge */
      color: #b9b9b9;
      font-size: 16px;
      font-weight: 400;
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #b9b9b9;
      font-size: 16px;
      font-weight: 400;
    }

    ::placeholder {
      color: #b9b9b9;
      font-size: 16px;
      font-weight: 400;
    }
  }
`

export const SalaryLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin: 23px 0 0 42px;
  .ant-select-selection-placeholder {
    padding-inline-end: 18px;
    color: #1d1d1d;
    font-size: 16px;
    font-weight: 400;
  }
`

export const AnnualSection = styled.div`
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  max-width: 87px;
  .ant-select-selection-placeholder {
    padding-inline-end: 18px;
    color: #1d1d1d;
    font-size: 16px;
    font-weight: 400;
  }
`

export const AnnualSecondSection = styled.div`
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  max-width: 210px;
  .ant-select-selection-placeholder {
    padding-inline-end: 18px;
    color: #1d1d1d;
    font-size: 16px;
    font-weight: 400;
  }
`
