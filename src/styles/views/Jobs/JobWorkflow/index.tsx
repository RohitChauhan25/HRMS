import styled from 'styled-components'
import { getCollapseColor, getTabColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'

export const FlowContainer = styled.div`
  width: 100%;
  max-width: 650px;
`
export const StagesTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #1d1d1d;
  margin: 40px 0 20px 0;
`
export const StageType = styled.div`
  display: flex;
  align-items: center;
  /* gap: 10px; */
  /* svg {
    display: none;
  } */
`
export const StageName = styled.div<TabProps>`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  background: ${(props) => getCollapseColor(props)};
  border-radius: 12px;
  position: relative;
  height: 56px;
  margin: 16px 40px 16px 0;
  width: 100%;
  max-width: 520px;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  padding-left: 30px;
`
export const StageNameDesign = styled.div<TabProps>`
  background: ${(props) => getTabColor(props)};
  border-radius: 12px 0px 0px 12px;
  position: absolute;
  left: 0;
  height: 100%;
  width: 20px;
`
export const AddButton = styled.div`
  border: 2px solid #1d2e88;
  border-radius: 8px;
  width: 100%;
  max-width: 620px;
  margin-top: 10px;
  text-align: center;
  padding: 20px;
`
export const HiredStageName = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #1d1d1d;
  background: #e8fcf1;
  border-radius: 12px;
  position: relative;
  height: 56px;
  margin: 16px 40px 16px 0;
  width: 100%;
  max-width: 520px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  padding-left: 30px;
`
export const NotHiredStageName = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #1d1d1d;
  background: #e8e8e8;
  border-radius: 12px;
  position: relative;
  height: 56px;
  margin: 16px 40px 16px 0;
  width: 100%;
  max-width: 520px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  padding-left: 30px;
`
export const HiredStageNameDesign = styled.div`
  background: #419e6a;
  border-radius: 12px 0px 0px 12px;
  position: absolute;
  left: 0;
  height: 100%;
  width: 20px;
`
export const NotHiredStageNameDesign = styled.div`
  background: #686868;
  border-radius: 12px 0px 0px 12px;
  position: absolute;
  left: 0;
  height: 100%;
  width: 20px;
`
export const SelectRole = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 150px;
  padding: 0 10px;
  height: 37px;
  border-radius: 8px;
  color: #1d1d1d;
  font-size: 14px;
  border: none;
  .ant-select-single {
    font-size: 14px;
    max-width: 200px;
    width: 100% !important;
  }

  .ant-select-selector {
    height: 39px !important;
    margin-top: 1px;
    border: none;
    width: 100%;
    max-width: 150px;
  }
`

export const DroppableDiv = styled.div``
export const ProvidedDiv = styled.div``
