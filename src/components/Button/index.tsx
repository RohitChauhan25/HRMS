import React from 'react'
import { IButtonProps } from 'interfaces'
import { StyledButton } from 'styles/components/Button'

const Button: React.FC<IButtonProps> = ({
  label,
  variant,
  type,
  className,
  disabled,
  children,
  style,
  ...rest
}: IButtonProps) => (
  <StyledButton variant={variant} {...rest} type={type} className={className} disabled={disabled} style={style}>
    {label}
    {children}
  </StyledButton>
)

export default Button
