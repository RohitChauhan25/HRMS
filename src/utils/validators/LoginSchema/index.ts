import * as Yup from 'yup'
import { errorMessage as error } from 'constants/errorMessage'

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .matches(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, error.validEmail)
    .required(error.requiredEmail),
  password: Yup.string().label('Password').required(error.requiredPassword),
})

export { VALIDATION_SCHEMA }
