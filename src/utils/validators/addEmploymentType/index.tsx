import * as yup from 'yup'

export const AddEmploymentTypeSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter name')
    .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),

  description: yup.string().required('Please enter description'),
})
