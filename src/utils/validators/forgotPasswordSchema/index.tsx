import * as yup from 'yup'

export const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().required('Email is required').trim().email('A valid email address is required'),
})
export const ResetPasswordSchema = yup.object().shape({
  email: yup.string().required('Email is required').trim().email('A valid email address is required'),
  verifyToken: yup.string().required('Token is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
      'Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 numerical character',
    ),
})
