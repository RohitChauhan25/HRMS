import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Input } from 'styles/pages/auth/login'
import { IconWrapper, InputWrapper } from 'styles/components/Input'

const Inputs = (props: any) => {
  const [passwordHide, setPasswordHide] = useState(props.type === 'password')
  const toggleIcon = () => setPasswordHide(!passwordHide)

  return (
    <InputWrapper>
      <Controller
        render={({ field }) => <Input {...props} {...field} type={passwordHide ? 'password' : 'text'} />}
        {...props}
      />
      {props?.type !== 'text' && !props?.showicon && (
        <IconWrapper>
          {passwordHide ? (
            <EyeOutlined className="password_icon" onClick={toggleIcon} />
          ) : (
            <EyeInvisibleOutlined className="password_icon" onClick={toggleIcon} />
          )}
        </IconWrapper>
      )}
    </InputWrapper>
  )
}

export default Inputs
