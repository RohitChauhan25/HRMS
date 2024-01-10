import { Input } from 'antd'
import { InputWrapper } from 'styles/components/Textinput'

interface ITeaxtinputContainer {
  placeholder: string
  onChange?: (e: any) => void
  prefix?: any
  type?: string
}
const SearchInput = ({ placeholder, type, prefix, onChange }: ITeaxtinputContainer) => (
  <InputWrapper>
    <Input placeholder={placeholder} prefix={prefix} onChange={onChange} type={type} />
  </InputWrapper>
)

export default SearchInput
