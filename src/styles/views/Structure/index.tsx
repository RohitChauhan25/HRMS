import { getTabColor, getTableColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'
import styled from 'styled-components'

export const RolesWrapper = styled.div`
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
`
export const WrapperTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #1d1d1d;
  width: 100%;
`

export const SearchSection = styled.div`
  display: flex;
  width: 100%;
  .ant-input-affix-wrapper {
    padding: 0 11px;
  }
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
  }
  .ant-table-wrapper .ant-table-selection {
    display: none;
  }
  .ant-table-wrapper .ant-table-thead > tr > th,
  .ant-table-wrapper .ant-table-thead > tr > td {
    background-color: ${(props) => getTableColor(props)} !important;
    content: none;
  }
`
export const NameWrapper = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #1d2e88;
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
export const Buttonn = styled.button`
  border-radius: 10px;
  border: none;
  width: 140px;
  font-size: 20px;
  font-size: 20px;
`
export const FilterImage = styled.img`
  padding-right: 3px;
  height: 17px;
  padding-top: 4px;
`
export const ActionWrapper = styled(NameWrapper)<TabProps>`
  display: flex;
  gap: 5px;

  svg > path {
    fill: ${(props) => getTabColor(props)};
  }
`
export const SearchFilterWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`
export const AdminTextWrapper = styled.div`
  display: flex;
  gap: 100px;
  margin-left: 15px;
`
export const AdminField = styled.h4``
export const DescriptionField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const Discription = styled.h4`
  height: 5px;
`
export const DescriptionText = styled.div`
  font-size: 14px;
  font-family: 'inter';
`
export const NameField = styled.h4`
  height: 5px;
`
export const AdminName = styled.div`
  font-size: 13px;
`
export const AdminNamefield = styled.div``
export const AdminArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const Adminsection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
// export const BottomBorder = styled.div`
//   border-bottom: 2px solid red;
//   width: 100%;
// `
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  button {
    max-width: 190px;
  }
`
export const Button = styled.button`
  width: 10%;
  height: 48px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color: #1d2e88;
  color: #ffffff;
`
export const Cancel = styled.button`
  width: 10%;
  height: 48px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-right: 20px;
  background: #e8e8e8;
  color: #1d1d1d;
`

export const OptionWrapper = styled.div`
  display: flex;
  gap: 10px;
`
