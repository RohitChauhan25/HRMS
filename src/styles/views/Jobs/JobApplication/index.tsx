import { getTabColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'
import styled from 'styled-components'

export const NameContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`
export const JobNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`
export const NameWrapper = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
`
export const UploadResume = styled.div`
  width: 100%;
  border: 2px dashed #b9b9b9;
  border-radius: 5px;
  display: grid;
  gap: 8px;
  align-items: center;
  justify-items: center;
  cursor: pointer;

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
export const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 28px 40px;
`
export const Click = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1a1a1a;
  text-align: center;
`
export const DescriptionUpload = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #b9b9b9;
  max-width: 400px;
  text-align: center;
`
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  @media (max-width: 1268px) {
    flex-direction: column;
    align-items: unset;
  }
`
export const BackButton = styled.div`
  border-radius: 8px;
  width: 100%;
  max-width: 172px;
  height: 53px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8e8e8;
  color: #1d1d1d;
  font-weight: 600;
  cursor: pointer;
`
export const PreviewButton = styled.div<TabProps>`
  background: #ffffff;
  border: 2px solid ${(props) => getTabColor(props)};
  border-radius: 8px;
  width: 100%;
  max-width: 162px;
  height: 51px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => getTabColor(props)};
  font-weight: 600;
  cursor: pointer;
`
export const FormTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #1d1d1d;
`
export const JobQuestionTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #1d1d1d;
  margin-bottom: 30px;
`
export const RightSideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .AddNewField {
    max-width: fit-content !important;
    padding: 10px;
  }
`
export const TabWrapper = styled.div<TabProps>`
  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${(props) => getTabColor(props)};
    font-weight: 600;
    font-size: 14px;
  }
  .ant-tabs .ant-tabs-ink-bar {
    background: ${(props) => getTabColor(props)};
  }
  .ant-tabs-nav-wrap {
    width: 100%;
    justify-content: center;
  }
  .ant-tabs-nav-list {
    width: 100%;
  }
`
export const QuestionsContainer = styled.div`
  background: #f3f5ff;
  border-radius: 12px;
  width: 100%;
  max-width: 320px;
  padding: 20px;
  margin-top: 38px;
`
export const TextField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;
`
export const LabelAndCrossWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`
export const WrapperCheck = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0px;
`
export const Label2 = styled.div`
  /* padding-top: 10px; */
`
