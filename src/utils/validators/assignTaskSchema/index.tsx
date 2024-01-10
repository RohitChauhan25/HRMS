import { assignTask as error } from 'constants/errorMessage'
import * as yup from 'yup'

export const assignTaskSchema = yup.object().shape({
  subject: yup.string().required(error.subject),
  body: yup.string().required(error.body),
})
