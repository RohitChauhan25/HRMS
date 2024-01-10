import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Select } from 'antd'
import { SelectContainerProps } from 'interfaces'
import { SelectWrapper } from 'styles/components/Select'

const SelectContainer = ({
  options,
  defaultValue,
  control,
  name,
  onFocus,
  props,
  mode,
  loading,
  onSearch,
  placeholder,
  handleValue,
  suffixIcon,
  disabled,
}: SelectContainerProps) => {
  const [selectOptions, setSelectOptions] = useState(options)

  useEffect(() => {
    setSelectOptions(options)
  }, [options])

  return (
    <SelectWrapper>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select
            {...props}
            loading={loading}
            onChange={(e, option) => {
              onChange && onChange(e, option)
              handleValue && handleValue(e, option)
            }}
            mode={mode}
            value={value || undefined}
            options={selectOptions}
            onFocus={onFocus}
            onSearch={onSearch}
            placeholder={placeholder}
            suffixIcon={suffixIcon}
            disabled={disabled}
            defaultValue={defaultValue}
          />
        )}
      />
    </SelectWrapper>
  )
}

export default SelectContainer
