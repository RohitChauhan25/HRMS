import styled from 'styled-components'
import { getTabColor, getTableColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'

export const HeadSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px 0;
`
export const Title = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #1d1d1d;
`
export const OpeningButton = styled.div`
  background: #1d2e88;
  border-radius: 8px;
  width: 100%;
  max-width: 170px;
  padding: 12px 16px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
`
export const TabLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
export const Wrapper = styled.div<TabProps>`
  a {
    color: #000000 !important;
    width: max-content;
    margin: 0 auto;
  }
  table {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #686868;
    text-align: center;

    th {
      text-align: center !important;
      font-size: 14px;
    }
  }
  .ant-pagination-item-link {
    color: #000000 !important;
  }
  .ant-table-wrapper .ant-table-thead > tr > th {
    background-color: ${(props) => getTableColor(props)} !important;
  }
`
export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`
export const WrapperTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #1d1d1d;
`
export const TabContainer = styled.div<TabProps>`
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  @media (max-width: 1300px) {
    overflow-x: auto;
  }
  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${(props) => getTabColor(props)} !important;
    font-weight: 600;
    font-size: 16px;

    path {
      fill: ${(props) => getTabColor(props)} !important;
    }
  }
  .ant-tabs .ant-tabs-tab.ant-tabs-tab .ant-tabs-tab-btn {
    color: #b9b9b9;
    font-weight: 600;
    font-size: 16px;
  }
  .ant-tabs .ant-tabs-ink-bar {
    background: ${(props) => getTabColor(props)} !important;
    height: 3px;
  }
  .ant-tabs-nav-wrap {
    width: 100%;
    justify-content: center;
  }
  .ant-tabs-nav-list {
    width: 100%;
  }
`
export const SearchSection = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #1d1d1d;
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    padding: 0 3px 0 5px !important;
  }
  .ant-input-affix-wrapper-focused {
    border: 1px solid #b9b9b9 !important;
    box-shadow: none;
  }
  .ant-input-prefix {
    height: 44px;
  }
`
export const SearchButton = styled.button`
  background: #1d2e88;
  color: #ffffff;
  width: -webkit-fill-available;
  margin: 0 auto;
  height: 36px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* padding: 0 10px; */
  border: none;
  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  font-size: 16px;
  font-weight: 600;
`

export const FilterButton = styled.div`
  background: #e8e8e8;
  position: relative;
  cursor: pointer;
  min-width: 100px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 13px 10px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #1d1d1d;
  margin-top: 8px;
`
export const JobTitleWrapper = styled.div<TabProps>`
  display: grid;
  gap: 5px;
  color: ${(props) => getTabColor(props)};
  cursor: pointer;
  text-transform: capitalize;
`
export const JobTitleWrapperDisabled = styled.div`
  display: grid;
  gap: 5px;
  color: #b9b9b9;
  cursor: pointer;
`
export const JobSubTitle = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #686868;
`
export const Candidates = styled.div<TabProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  svg > path {
    fill: ${(props) => getTabColor(props)};
  }

  .deleteIcon > path {
    fill: #d83232 !important;
    cursor: pointer;
  }
`

export const ActionIconWrapper = styled.div<TabProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  > svg > path {
    fill: ${(props) => getTabColor(props)};
    cursor: pointer;
  }
  > button {
    width: 100%;
    max-width: 150px;
  }
  > button:hover {
    cursor: pointer;
    color: #ffffff;
    background: ${(props) => getTabColor(props)};
  }
`

export const Date = styled.div``
export const FilterContainer = styled.div`
  width: 100%;
  max-width: 336px;
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 3px 24px -6px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  right: 0;
  padding: 20px;
  top: 60px;
  z-index: 4;
`
export const FilterTwinSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  gap: 10px;
`
export const Filter = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #1d1d1d;
`
export const Reset = styled.div<TabProps>`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => getTabColor(props)};
  cursor: pointer;
`
export const Border = styled.div`
  height: 0px;
  border: 1px solid #8896e1;
  margin: 16px 0;
  opacity: 0.5;
`
export const FilterTitleSection = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #979797;
`
export const Hide = styled.div<TabProps>`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => getTabColor(props)};
  cursor: pointer;

  svg > path {
    fill: ${(props) => getTabColor(props)};
    cursor: pointer;
  }
`
export const HideEye = styled.img`
  width: 18px;
  cursor: pointer;
`
export const FilterType = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #1d1d1d;
`
export const DateWrapper = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  gap: 10px;
`
export const DateTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #1d1d1d;
`
export const DotsContainer = styled.div`
  position: relative;
`
export const DotsWrapper = styled.div`
  position: absolute;
  top: 20px;
  background: #ffffff;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 12px 20px;
  min-width: 100px;
  display: grid;
  gap: 10px;
  justify-content: flex-start;
  z-index: 2;
`
export const JobAction = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #1d1d1d;
  text-align: left;
  cursor: pointer;
`

export const ViewRejectedReason = styled.div`
  color: #1d2e88;
  cursor: pointer;
`

export const ViewReason = styled.div`
  pointer-events: none;
`
