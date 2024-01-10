import styled from 'styled-components'
import { getTabColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'

export const UploadWrapper = styled.div<TabProps>`
  margin: 20px 0;
  .ant-btn-default {
    border: 2px solid ${(props) => getTabColor(props)};
  }
  .ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
    border: 2px solid ${(props) => getTabColor(props)} !important;
  }

  .anticon svg {
    fill: ${(props) => getTabColor(props)};
  }
  span {
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => getTabColor(props)};
  }
  div {
    font-size: 12px;
    font-weight: 400;
    color: #686868;
    margin-top: 10px;
  }
  .colorChange {
    color: ${(props) => getTabColor(props)};
  }
`
export const Label = styled.p`
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
  cursor: pointer;
  display: inline;
`
export const Divv = styled.div``
