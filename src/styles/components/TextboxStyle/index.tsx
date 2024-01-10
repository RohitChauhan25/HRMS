import { Input } from 'antd'
import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  .ant-input {
    min-height: 100px;
  }
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-transform: capitalize;
`

export const AntdInput = styled(Input.TextArea)``
