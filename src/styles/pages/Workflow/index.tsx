import { getTabColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'
import styled from 'styled-components'

interface IProps {
  isClicked?: boolean
}

export const ApprovalMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px 0;
  gap: 40px;
`
export const ApprovalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`
export const ApprovalHeading = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: #1d1d1d;
`
export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  border-bottom: 1px solid #e8e8e8;
`
export const BoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Wrapper = styled.div`
  display: flex;
  gap: 12px;
`
export const ProfileWrapper = styled.div`
  img {
    width: 48px;
    height: 48px;
  }
`
export const ProfileDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const AssigneeName = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1d1d1d;
`
export const Designation = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #686868;
`
export const ActionWrapper = styled.div<IProps & TabProps>`
  button {
    background: ${(props) => (props?.isClicked ? getTabColor(props) : null)};
    color: ${(props) => (props?.isClicked ? 'rgb(255, 255, 255)' : null)};
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    width: 150px;
  }
`
export const OptionWrapper = styled.div<TabProps>`
  display: flex;
  gap: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1d1d1d;

  svg > path {
    fill: ${(props) => getTabColor(props)};
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  button {
    max-width: 150px;
  }
`
export const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;
  button {
    width: 150px;
  }
  .preview-button {
    background: #f9c51c;
    color: #000;
  }
`

export const PublishModalContainer = styled.div`
  margin: 0 auto;
  background: #ffffff;
  padding: 30px;
  position: relative;
  border-radius: 10px;
  width: 672px;
`
