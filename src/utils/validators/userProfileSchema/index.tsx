import * as yup from 'yup'
import { errorMessage, profileErrorMessage } from 'constants/errorMessage'

export const UserProfileSchema = yup.object().shape({
  username: yup.string().required(profileErrorMessage.name).matches(/^\S.*/, errorMessage.firstCharacter),
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
  location: yup
    .string()
    .required(profileErrorMessage.location)
    .matches(/^\S.*/, errorMessage.firstCharacter)
    .matches(/^(?! )[a-zA-Z ]+$/, errorMessage.nameTypeError),
})
