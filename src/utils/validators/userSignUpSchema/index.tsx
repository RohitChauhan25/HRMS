import * as yup from 'yup'

export const UserSignUpSchema = yup.object().shape({
  email: yup.string().required('Email is required').trim().email('A valid email address is required'),
  username: yup.string().required('Username is required'),
  token: yup.string().required('Token is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
      'Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 numerical character',
    ),
})
