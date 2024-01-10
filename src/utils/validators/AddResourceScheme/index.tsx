import * as yup from 'yup'
const ResourceSchema = yup.object().shape({
  resourceName: yup.string().required('Resource is Mandatory').min(5, 'At least 5 characters are required'),
  resource: yup.string().required('Resource Url is Mandatory').min(5, 'At least 5 characters are required'),
  module: yup.string().required('module is Mandatory').min(2, 'At least 2 characters are required'),
  subModule: yup.string().required('subModule is Mandatory').min(5, 'At least 5 characters are required'),
})

export { ResourceSchema }
