import { Controller } from 'react-hook-form'
import { Input } from 'antd'
import { InputWrapper } from 'styles/components/Textinput'
interface ITeaxtinputContainer {
  placeholder: string
  required?: boolean
  value?: string | number | undefined
  onChange?: (e: any) => void
  onFocus?: any
  type?: string
  onWheel?: (e: any) => void
  control: any
  name: string
  disabled?: boolean
  prefix?: any
  handleInputChange?: any
  onBlur?: any
  defaultValue?: string
  min?: number
  max?: number
}

const TextinputContainer = ({
  placeholder,
  required,
  type,
  onFocus,
  onWheel,
  name,
  control,
  prefix,
  disabled,
  onBlur,
  defaultValue,
  handleInputChange,
  min,
  max,
}: ITeaxtinputContainer) => (
  <InputWrapper>
    <Controller
      render={({ field: { value, onChange } }) => (
        <Input
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e: any) => {
            onChange(e.target.value)
            if (handleInputChange) {
              handleInputChange(e)
            }
          }}
          // handleInputChange={handleInputChange}
          defaultValue={defaultValue}
          onFocus={onFocus}
          onWheel={onWheel}
          prefix={prefix}
          min={min}
          disabled={disabled}
          onBlur={onBlur}
          max={max}
        />
      )}
      control={control}
      name={name}
    />
  </InputWrapper>
)
export default TextinputContainer
