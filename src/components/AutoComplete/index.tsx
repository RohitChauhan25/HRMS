import { useController } from 'react-hook-form'
import { AutoComplete } from 'antd'
import { SelectWrapper } from 'styles/components/Select'

export const AutocompleteController = ({ name, control, options, placeholder, onSelect, handleChange, value }: any) => {
  const {
    field: { onChange, onBlur },
  } = useController({
    name,
    control,
  })

  return (
    <SelectWrapper>
      <AutoComplete
        value={value}
        style={{ width: 200 }}
        options={options}
        placeholder={placeholder}
        onChange={(e) => {
          handleChange(e)
          onChange(e)
        }}
        onBlur={onBlur}
        onSelect={onSelect}
      />
    </SelectWrapper>
  )
}
