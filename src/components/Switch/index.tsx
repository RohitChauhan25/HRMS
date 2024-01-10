import { Switch } from 'antd'

const SwitchContainer = ({ onClick, defaultChecked, disabled, onChange, checked, key }: any) => (
  <Switch
    size="small"
    defaultChecked={defaultChecked}
    onClick={onClick}
    disabled={disabled}
    onChange={onChange}
    checked={checked}
    key={key}
  />
)

export default SwitchContainer
