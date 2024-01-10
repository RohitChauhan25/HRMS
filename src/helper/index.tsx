import * as yup from 'yup'

const YupResolverSchema = (applyJobData: any) => {
  const validationObject: Record<string, yup.StringSchema<string | undefined>> = {}

  applyJobData?.forEach((field: any) => {
    const { fieldName, isRequired, pattern, type, options } = field

    let fieldValidator: any

    switch (type) {
      case 'text':
      case 'textarea':
      case 'number':
      case 'select':
      case 'date':
      case 'file':
      case 'dragfile':
        fieldValidator = yup.string()
        break
      case 'checkbox':
        fieldValidator = yup.array().min(1, 'Please select at least one option.')
        break
      case 'radio':
        fieldValidator = yup.string().oneOf(
          options.map((opt: any) => opt.value),
          'Invalid option selected.',
        )
        break
      default:
        fieldValidator = yup.string()
        break
    }

    if (isRequired) {
      fieldValidator = fieldValidator.required(`The field ${fieldName} is required.`)
    }

    if (pattern) {
      fieldValidator = fieldValidator.matches(new RegExp(pattern), `Please enter a valid ${fieldName}.`)
    }

    validationObject[fieldName] = fieldValidator
  })

  const validateSchema = yup.object().shape(validationObject)
  return validateSchema
}

export default YupResolverSchema
