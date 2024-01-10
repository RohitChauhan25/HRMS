import { getCollapseColor, getTabColor, getTableColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'
import styled from 'styled-components'

export const EmployeeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-height: 100vh;
  overflow-x: hidden;
  width: 100%;
`
export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`
export const WrapperTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #1d1d1d;
`
export const SearchSection = styled.div`
  display: flex;
  gap: 10px;
  /* .ant-input-affix-wrapper {
    padding: 0 11px;
  } */
  input {
    height: 34px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
`

/****** Employee Table CSS *******/
export const TableWrapper = styled.div<TabProps>`
  .ant-table-wrapper .ant-table-container table > thead > tr:first-child > *:first-child {
    border-start-start-radius: 0px;
  }
  .ant-table-wrapper .ant-table-container table > thead > tr:first-child > *:last-child {
    border-start-end-radius: 0px;
  }
  .ant-table-wrapper .ant-table-tbody > tr > th,
  .ant-table-wrapper .ant-table-tbody > tr > td {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #686868;
    cursor: pointer;
  }

  .ant-table-wrapper .ant-table-thead > tr > th,
  .ant-table-wrapper .ant-table-thead > tr > td {
    background-color: ${(props) => getTableColor(props)} !important;
    content: none;
  }
`
export const EmployeeDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const NameWrapper = styled.div<TabProps>`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => getTabColor(props)};
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: ${(props) => (props.users !== 0 ? 'pointer' : 'not-allowed')};
`
export const LocationWrapper = styled.div`
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  color: #686868;
`
export const StatusWrapper = styled.div`
  width: max-content;
  padding: 6px 12px;
  border: 2px solid #bcc6fc;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #1d2e88;
`
export const Name = styled.div`
  text-transform: capitalize;
`
export const ActiveButton = styled.div<TabProps>`
  color: ${(props) => getTabColor(props)};
  border: 1px solid ${(props) => getCollapseColor(props)};
  width: fit-content;
  font-size: 15px;
  font-weight: 600;
  padding: 6px 12px;
  text-transform: capitalize;
  border-radius: 11px;
  &:hover {
    opacity: 0.5;
  }
`

export const InActiveButton = styled.div`
  color: #d83232;
  border: 1px solid #fc9595;
  width: fit-content;
  font-size: 15px;
  text-transform: capitalize;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 11px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`
export const FullName = styled.div<TabProps>`
  color: ${(props) => getTabColor(props)};
`
