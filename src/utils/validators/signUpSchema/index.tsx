import * as Yup from 'yup'
import { signUpErrorMessge as error } from 'constants/errorMessage'

const SIGNUP_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().label('Name').required(error.name).min(6),
  company: Yup.string().label('Company').required(error.company).min(6),
  role: Yup.string().label('Role').required(error.role).min(3),
  email: Yup.string()
    .matches(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, error.validEmail)
    .required(error.requiredEmail),
  phone: Yup.string().label('Phone Number').required(error.phone).min(10).max(10),
  password: Yup.string().label('Password').required(error.requiredPassword).min(6),
})

export { SIGNUP_VALIDATION_SCHEMA }
