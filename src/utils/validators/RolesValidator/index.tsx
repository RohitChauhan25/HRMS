import * as yup from 'yup'

const RolesSchema = yup.object().shape({
  roleName: yup.string().required('Roles is Mandatory').min(5, 'Enter at least 5 character '),
  description: yup.string().required('Description is Mandatory').min(5, 'Enter at least 5 character '),
})

const HiringStageSchema = yup.object().shape({
  name: yup.string().required('Fill the Hiring Stage').min(5, 'Enter at least 5 character '),
})
export { RolesSchema, HiringStageSchema }
