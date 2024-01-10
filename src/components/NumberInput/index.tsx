import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { NumberInputWrapper } from 'styles/components/Numberinput'

interface IPhoneInput {
  disabled?: boolean
  onChange?: any
}
const NumberInput = ({ disabled, onChange }: IPhoneInput) => (
  <NumberInputWrapper>
    <PhoneInput country="in" disabled={disabled} onChange={onChange} />
  </NumberInputWrapper>
)

export default NumberInput
