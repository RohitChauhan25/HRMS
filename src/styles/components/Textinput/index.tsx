import styled from 'styled-components'

export const InputWrapper = styled.div`
  .ant-input {
    height: 40px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* -webkit-appearance: none; */
    margin: 0;
  }
  .ant-input-disabled {
    background: transparent;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`
