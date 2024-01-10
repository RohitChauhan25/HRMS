import * as yup from 'yup'

export const AddScreenQuestions = yup.object().shape({
  fieldName: yup.string().required('Please enter field name'),
  type: yup.string().required('Please select field type'),
  fieldDescription: yup.string().required('Please enter field Description'),
  isDefault: yup.boolean(),
  isRequired: yup.boolean(),
  canDelete: yup.boolean(),
})
