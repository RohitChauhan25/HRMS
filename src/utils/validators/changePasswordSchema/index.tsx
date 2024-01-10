import * as yup from 'yup'

export const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Please enter the old password'),
  newPassword: yup
    .string()
    .required('Please enter the new password')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
      'Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 numerical character',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match.'),
})
