import styled from 'styled-components'

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  /* margin-top: 10px; */
  gap: 10px;
  .ant-checkbox-inner :hover {
    border: none;
  }

  .ant-checkbox-wrapper-disabled:hover .ant-checkbox-checked:not(.ant-checkbox-disabled):after {
    border: none;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background: #1d2e88 !important;
    border: none !important;
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
  }
`
