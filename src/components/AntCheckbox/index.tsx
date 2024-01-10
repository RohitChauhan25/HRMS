import { ReactElement } from 'react'
import { Controller } from 'react-hook-form'
import { Checkbox } from 'antd'
interface ITeaxtinputContainer {
  value?: string
  onChange?: (_e: ReactElement) => void
  handleChange?: any
  control: any
  name: string
  label: string
  defaultChecked?: boolean
  isDisabled?: boolean
  isDefault?: boolean
  isRequired?: boolean
  canDelete?: boolean
}

function AntCheckbox({
  control,
  name,
  label,
  handleChange,
  isDisabled,
  defaultChecked,
  isDefault,
  isRequired,
  canDelete,
}: ITeaxtinputContainer) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={isDefault ? isDefault : isRequired ? isRequired : canDelete ? canDelete : false}
      render={({ field: { onChange } }) =>
        isDisabled ? (
          <Checkbox checked>{label}</Checkbox>
        ) : (
          <Checkbox
            onChange={(e) => {
              if (handleChange) {
                handleChange(e)
              }

              onChange(e.target.checked)
            }}
            defaultChecked={isDefault ? isDefault : isRequired ? isRequired : canDelete ? canDelete : defaultChecked}
          >
            {label}
          </Checkbox>
        )
      }
    />
  )
}

export default AntCheckbox
