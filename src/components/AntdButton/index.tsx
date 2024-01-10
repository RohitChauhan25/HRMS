import React from 'react'
import { StyledButton } from 'styles/components/AntdButton'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'cancel' | 'post'

interface ButtonProps {
  variant: ButtonVariant
  onClick?: () => void
  children?: React.ReactNode | string
  htmlType?: 'submit' | 'button' | 'reset'
  type?: string
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children, htmlType }) => {
  return (
    <StyledButton variant={variant} onClick={onClick} htmlType={htmlType}>
      {children}
    </StyledButton>
  )
}

export default Button
