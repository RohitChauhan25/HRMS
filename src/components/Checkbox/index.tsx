import { ReactNode } from 'react'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { CheckboxWrapper } from 'styles/components/Checkbox'
interface ICheckboxContainer {
  onChange?: (e: CheckboxChangeEvent) => void
  defaultChecked?: boolean
  label?: string | ReactNode
  disabled?: boolean
  register?: any
  checked?: any
}

const CheckboxContainer = ({ label, onChange, defaultChecked, disabled, checked }: ICheckboxContainer) => (
  <CheckboxWrapper>
    <Checkbox onChange={onChange} defaultChecked={defaultChecked} disabled={disabled} checked={checked} />
    {label}
  </CheckboxWrapper>
)

export default CheckboxContainer
