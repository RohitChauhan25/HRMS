import * as yup from 'yup'

export const AddExperienceSchema = yup.object().shape({
  name: yup.string().required('Please enter name'),
  start: yup
    .number()
    .typeError('This field is mandatory')
    .min(0, 'Minimum salary must be positive')
    .required('Please enter start value'),
  end: yup
    .number()
    .required('Please enter end value')
    .typeError('This field is mandatory')
    .min(yup.ref('start'), 'Must be greater than start value'),
  type: yup.string().required('Please enter type'),
})
