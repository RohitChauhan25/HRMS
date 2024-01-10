import { getCollapseColor, getTabColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'
import styled from 'styled-components'

export const PreviewModalContainer = styled.div`
  max-width: 700px;
  margin-left: auto;
  background: #ffffff;
  overflow-y: scroll;
  /* padding: 20px; */
`

export const PreviewTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #1d1d1d;
  background: #f9c51c;
  padding: 20px;
`

export const ModalContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: #ffffff;
  /* overflow-y: scroll; */
  padding: 30px;
  position: relative;
  border-radius: 10px;
  z-index: 1;
`

export const CandidateContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: #ffffff;
  overflow-y: scroll;

  position: relative;
`
export const SignOffModalContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: #ffffff;
  padding: 30px;
  position: relative;
  border-radius: 10px;
`

export const CheckContainer = styled.div`
  margin: 10px 0;
`
export const ImageContainer = styled.div`
  width: 100%;
  text-align: center;
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
export const JobDetailWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between !important;
  grid-gap: 44px;
  justify-content: center;
  border-radius: 16px;
  background: #ffffff;
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
  padding: 24px 0px;
  margin: 30px 0px;
  border-top: 1px solid #bcc6fc;
  border-bottom: 1px solid #bcc6fc;
  .ant-picker-range {
    width: 100%;
  }
`
export const ImageWrap = styled.div`
  border: 3px solid #f9c51c;
  border-radius: 100%;
  height: 48px;
`
export const ProfileImage = styled.img`
  width: 48px;
  border-radius: 100%;
  height: 48px;
`
export const Profile = styled.div`
  display: flex;
  grid-gap: 16px;
`
export const MemberProfile = styled.div`
  display: flex;
  grid-gap: 16px;
  padding: 8px;
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
export const AddButton = styled.button<TabProps>`
  padding: 10px 16px;
  width: 100%;
  border: 2px solid ${(props) => getTabColor(props)};
  border-radius: 8px;
  text-align: center;
  margin: 30px 0;
  color: ${(props) => getTabColor(props)};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  background: transparent;
  cursor: pointer;
  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg > path {
    fill: ${(props) => getTabColor(props)};
    cursor: pointer;
  }
`
export const AddTeamMemberButton = styled.button<TabProps>`
  border: 2px solid ${(props) => getTabColor(props)};
  color: ${(props) => getTabColor(props)};
  width: 100%;
  height: 48px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color: transparent;
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
export const Form = styled.form<TabProps>`
  display: grid;
  border-bottom: 2px solid ${(props) => getCollapseColor(props)};
`
export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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
  text-transform: capitalize;
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
  font-size: 24px;
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
`

export const PublishHeadSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px;
`
export const RejectHeadSection = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 5;
  padding: 24px;
`
export const TimelineFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const TimelineModalContainer = styled.div`
  margin: 0 auto;
  background: #ffffff;
  padding: 30px;
  position: relative;
  border-radius: 10px;
`

export const RejectModalContainer = styled.div`
  margin: 0 auto;
  background: #ffffff;
  position: relative;
  border-radius: 10px;
  width: 672px;
`

export const PublishModalContainer = styled.div`
  margin: 0 auto;
  background: #ffffff;
  position: relative;
  border-radius: 10px;
  width: 650px;
`

export const JobTimelineModalContainer = styled.div`
  margin: 0 auto;
  background: #ffffff;
  padding: 30px;
  position: relative;
  border-radius: 10px;
  width: 672px;
`
export const Cross = styled.div`
  width: max-content;
  margin-left: auto;
  cursor: pointer;
`
export const Description = styled.div`
  font-weight: 600;
  font-size: 24px;
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
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin-left: auto;
  padding: 20px 24px;
  button {
    max-width: 120px;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin-left: auto;
  padding: 20px 24px;
`
export const ErrorMessage = styled.div`
  font-size: 12px;
  display: flex;
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
  padding: 24px;
  gap: 10px;
  border-top: 1px solid #bcc6fc;
  border-bottom: 1px solid #bcc6fc;
  height: auto;

  textarea {
    height: 100px !important;
  }
`
export const RejectReasonWrapper = styled.div`
  display: grid;
  padding: 24px;
  gap: 10px;
  border-top: 1px solid #bcc6fc;
  border-bottom: 1px solid #bcc6fc;
  height: auto;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #1d1d1d;
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
export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #1d1d1d;
  text-align: left;
`
export const CrossModal = styled.div`
  text-align: right;
  margin-top: -20px;
  cursor: pointer;
`
export const Line = styled.div`
  border-bottom: 1px solid #bcc6fc;
  padding: 15px;
  max-width: 700px;
`
export const LeadInformation = styled.div`
  margin-top: 20px;
`
export const PrivateWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  /* margin-top: 20px; */
  align-items: center;
  min-height: 55px;
  @media (max-width: 968px) {
    display: flex;
    flex-direction: column;
    align-items: normal;
  }
  .ant-input {
    min-width: 160px;
  }
  .ant-select {
    min-width: 160px;
  }
`
