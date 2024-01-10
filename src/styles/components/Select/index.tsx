import styled from 'styled-components'

export const SelectWrapper = styled.div`
  width: 100%;
  .ant-select-selector {
    border: 1px solid #b9b9b9 !important;
    border-radius: 8px;
    outline: none;
    /* margin-top: 10px; */
    width: 100% !important;
    height: 44px !important;
    overflow-y: auto;
    padding-top: 5px !important;
    text-align: left;
  }
  .ant-select {
    width: 100%;
  }
  .ant-select-arrow {
    padding-top: 8px !important;
    color: #1d1d1d;
  }
  .ant-select-selector .ant-select-selection-search-input {
    /* height: max-content !important; */
    height: 44px !important;
  }
  .ant-select-single {
    height: unset;
  }
`
