import * as yup from 'yup'

export const AddProfileQuestionSchema = yup.object().shape({
  fieldName: yup.string().required('Please enter field name').min(3, 'Field name must be atleast 3 characters long'),
  type: yup.string().required('Please select field type'),
  fieldDescription: yup
    .string()
    .required('Please enter field description')
    .min(5, 'Field Description must be atleast 5 characters long'),
  isDefault: yup.boolean(),
  isRequired: yup.boolean(),
  canDelete: yup.boolean(),
})

export const UpdateProfileQuestionSchema = yup.object().shape({
  fieldName: yup.string().required('Please enter Question').min(3, 'Field name must be atleast 3 characters long'),
  type: yup.string().required('Please select type'),
  fieldDescription: yup
    .string()
    .required('Please enter description')
    .min(5, 'Field Description must be atleast 5 characters long'),
  isDefault: yup.boolean(),
  isRequired: yup.boolean(),
  canDelete: yup.boolean(),
})
