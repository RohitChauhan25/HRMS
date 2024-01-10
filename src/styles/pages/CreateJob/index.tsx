import { getCollapseColor, getTabColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'
import styled from 'styled-components'

export const Container = styled.div`
  background: #f3f5ff;
  min-height: 100vh;
  overflow-x: hidden;
  width: 100%;
`
export const ContentWrapper = styled.div`
  margin: 20px 60px;
`
export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
export const JobTitle = styled.div<TabProps>`
  padding: 10px;
  border: 1px solid ${(props) => getCollapseColor(props)};
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`
export const JobHeading = styled.div<TabProps>`
  padding: 10px;
  border: 1px solid ${(props) => getCollapseColor(props)};
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`
export const JobCreateTitle = styled.div<TabProps>`
  background: ${(props) => getTabColor(props)};
  border-radius: 6px;
  padding: 12px;
  color: rgb(255, 255, 255);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`
export const MainHeading = styled.div`
  color: #1d1d1d;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  margin-top: 40px;
  text-transform: capitalize;
`
export const StepperContainer = styled.div`
  padding: 40px;
  background: #ffffff;
  margin-top: 30px;
  border-radius: 16px;
  overflow-x: auto;
  .ant-steps-item-container {
    display: flex;
    align-items: center;
  }
`
export const StepTitleContainer = styled.div``
export const StepNumber = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #686868;
`
export const StepTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1d1d1d;
  @media (max-width: 1500px) {
    font-size: 12px;
  }
`

export const StepsContainer = styled.div`
  display: block;
  align-items: center;
  gap: 20px;
  width: 100%;
  .ant-steps-item-title::after {
    display: none;
  }
  .ant-steps-item-container {
    padding: 5px 0 12px 0;
    border-bottom: 3px solid #b9b9b9;
    font-weight: bold;
    min-width: 180px;
    max-width: 250px;
    height: 78px;
    /* opacity: 0.7; */
  }

  .ant-steps-item-process .ant-steps-item-icon {
    background: #f9c51c !important;
    border: none;
  }
  .ant-steps-item-finish {
    opacity: 1;
    > div {
      border-bottom: 3px solid #419e6a;
    }
  }
  .ant-steps-item-process {
    opacity: 1;

    > div {
      border-bottom: 3px solid #f9c51c;
    }
  }
  .ant-steps-item-wait {
    opacity: 0.6;
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    background: #419e6a !important;
    border: none;
  }
  .ant-steps-finish-icon {
    > svg {
      fill: #ffffff !important;
    }
  }
  .ant-steps.ant-steps-horizontal:not(.ant-steps-label-vertical) .ant-steps-item-description {
    max-width: unset;
    font-size: 12px;
  }
`

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: #ffffff;
  margin-top: 30px;
  border-radius: 16px;
  overflow-x: auto;
`
