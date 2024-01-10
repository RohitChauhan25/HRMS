import * as yup from 'yup'

export const AddDepartmentSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter department name')
    .matches(/^\S.*/, 'First charcter cannot be space')
    .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
})
