import * as yup from 'yup'

const allowedDomains = 'thewitslab.com'

export const AddEmployeeSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .trim()
    .email('A valid email address is required')
    .matches(
      new RegExp(`^[a-zA-Z0-9._-]+@(${allowedDomains})$`),
      `Only specific domain is allowed (i.e ${allowedDomains})`,
    )
    .test('is-domain', `Email must be from the domain ${allowedDomains}`, (value) => {
      if (!value) return true // Return true if the value is empty or null
      return value.endsWith(`@${allowedDomains}`)
    }),
  phone: yup
    .string()
    .required('Phone number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid phone number is required'),
  selectRole: yup.string().required('Please select role'),
  selectCompany: yup.string().required('Please select company'),
  // selectSupervisor: yup.string().required('Please select supervisor'),
  fullName: yup.string().required('Enter Your Full Name'),
  employmentLocation: yup.string().required('Enter Your Location'),
})
