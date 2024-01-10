import React from 'react'
import { Controller } from 'react-hook-form'
import { AntdInput, Container, Label } from 'styles/components/TextboxStyle'

interface CommentBoxProps {
  label?: string
  name: string
  control: any
  rules: any
  placeholder?: string
}

const CommentBox: React.FC<CommentBoxProps> = ({ name, control, rules, label, placeholder }) => {
  return (
    <Container>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue=""
        render={({ field }) => (
          <AntdInput
            value={field.value}
            onChange={(e: any) => field.onChange(e.target.value)}
            placeholder={placeholder}
          />
        )}
      />
    </Container>
  )
}

export default CommentBox
