import * as yup from 'yup'
import { errorMessage, addCandidateErrorMessage } from 'constants/errorMessage'

export const AddCandidateSchema = yup.object().shape({
  name: yup
    .string()
    .required(addCandidateErrorMessage.name)
    .matches(/^\S.*/, errorMessage.firstCharacter)
    .matches(/^(?! )[a-zA-Z ]+$/, errorMessage.nameTypeError),

  jobRole: yup.string().required(addCandidateErrorMessage.jobRole),
  email: yup
    .string()
    .required(errorMessage.email)
    // .trim()
    .matches(/^\S.*/, errorMessage.firstCharacter)
    .email(errorMessage.validEmail),
  phone: yup
    .string()
    .required(errorMessage.phone)
    .matches(/^\S.*/, errorMessage.firstCharacter)
    .max(10, errorMessage.maxDigit)
    .matches(/^[6789]\d{9}$/, errorMessage.validPhoneNumber),
  department: yup.string().required(addCandidateErrorMessage.department),
  salary: yup.string().required(addCandidateErrorMessage.salary).matches(/^\S.*/, errorMessage.firstCharacter),
  currency: yup.string().required(addCandidateErrorMessage.currency),
})
