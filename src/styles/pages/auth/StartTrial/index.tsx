import styled from 'styled-components'

export const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #1d1d1d;
`
export const ButtonWrapper = styled.div`
  margin: 40px auto 10px auto;
`
export const CheckboxLabel = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #0f172a;
`
export const ProgressBar = styled.div`
  display: grid;
  gap: 10px;
  .ant-checkbox-wrapper {
    margin: 0;
  }
  .ant-progress-line {
    margin: 0;
  }
  .ant-progress-bg {
    background-color: #f9c51c;
  }
  .ant-checkbox {
    border-radius: 50%;
  }
  .ant-checkbox-checked {
    background-color: #1d2e;
    border: 1px solid #1d2e;
  }

  .ant-checkbox-inner:after {
    border-color: #ffffff !important;
  }

  .ant-checkbox-inner {
    border-color: transparent;
    background: transparent;
    border-radius: 50%;
    border: 1px solid #64748b;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    border-color: transparent !important;
    background-color: transparent !important;
  }
`
