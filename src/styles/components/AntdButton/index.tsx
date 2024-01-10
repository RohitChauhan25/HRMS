import styled from 'styled-components'
import { Button } from 'antd'

interface ButtonProps {
  variant: string
}

const getButtonStyles = (variant: string) => {
  switch (variant) {
    case 'primary':
      return `
        background-color: #1d2e88;
        color: #fff;
        min-height: 44px;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        border-radius: 8px;
      `
    case 'secondary':
      return `
        background-color: #f0f0f0;
        color: #333;
      `
    case 'danger':
      return `
        background-color: #ff4d4f;
        color: #fff;
      `
    case 'cancel':
      return `
        background-color: #e8e8e8;
        color: #000;
        width: 100%;
        max-width: 100px;
        min-height: 44px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        border: none;
      `
    case 'post':
      return `
      background-color: #1d2e88;
      width: 100%;
      max-width: 100px;
      color: #fff;
      min-height: 44px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      border: none;
      `
    default:
      return `
        background-color: #1890ff;
        color: #fff;
      `
  }
}

export const StyledButton = styled(Button)<ButtonProps>`
  ${({ variant }) => getButtonStyles(variant)}
`
