import { Controller } from 'react-hook-form'
import { Input } from 'antd'
import { InputWrapper } from 'styles/components/Textinput'
interface ITeaxtareaContainer {
  placeholder: string
  disabled?: boolean
  control?: any
  name: string
  width?: string
  handleInputChange?: any
  className?: string
  defaultValue?: string
}

const { TextArea } = Input

const TextareaContainer = ({
  placeholder,
  disabled,
  control,
  name,
  width,
  className,
  handleInputChange,
  defaultValue,
}: ITeaxtareaContainer) => (
  <InputWrapper>
    <Controller
      render={({ field: { value, onChange } }) => (
        <TextArea
          className={className}
          style={{ width }}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
          value={value}
          onChange={(e: any) => {
            onChange(e.target.value)
            if (handleInputChange) {
              handleInputChange(e)
            }
          }}
        />
      )}
      control={control}
      name={name}
    />
  </InputWrapper>
)
export default TextareaContainer
