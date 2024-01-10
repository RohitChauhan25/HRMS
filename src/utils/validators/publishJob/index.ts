import * as yup from 'yup'
import { PublishJobsErrors } from 'constants/errorMessage'
const PUBLISH_JOB = yup.object().shape({
  startSalary: yup.number().integer().required().typeError(PublishJobsErrors.startSal),
  endSalary: yup
    .number()
    .when(PublishJobsErrors.startSalName, (startSalary: any, schema) =>
      schema.moreThan(startSalary, PublishJobsErrors.endSal),
    )
    .integer()
    .required(PublishJobsErrors.endValue)
    .typeError(PublishJobsErrors.validNum),
  currency: yup.string().required(),
  // assignee: yup.string().min(1, PublishJobsErrors.assignee),
  assignee: yup.string().required(PublishJobsErrors.assignee),
  isPrivatee: yup.boolean(),
  users: yup.array().test(PublishJobsErrors.isPrivate, PublishJobsErrors.selectuser, function (value) {
    const isPrivatee = this.parent.isPrivatee // Access the value of isPrivatee from the parent object
    if (isPrivatee === true) {
      return Array.isArray(value) && value.length > 0
    }

    return true // No validation when isPrivatee is false
  }),
})

const userSchema = yup.object({
  label: yup.string(),
  value: yup.string(),
})

const EDIT_PUBLISH_JOB = yup.object().shape({
  startSalary: yup.number().integer().required().typeError(PublishJobsErrors.startSal),
  endSalary: yup
    .number()
    .when(PublishJobsErrors.startSalName, (startSalary: any, schema) =>
      schema.moreThan(startSalary, PublishJobsErrors.endSal),
    )
    .integer()
    .required(PublishJobsErrors.endValue)
    .typeError(PublishJobsErrors.validNum),
  currency: yup.string().required(),
  // assignee: yup.string().min(1, PublishJobsErrors.assignee),
  assignee: yup.string().required(PublishJobsErrors.assignee),
  isPrivatee: yup.boolean(),
  // users: yup.array().of(userSchema).nullable().notRequired(),
  users: yup.array().test(PublishJobsErrors.isPrivate, PublishJobsErrors.selectuser, function (value) {
    const isPrivatee = this.parent.isPrivatee // Access the value of isPrivatee from the parent object
    if (isPrivatee === true) {
      return Array.isArray(value) && value.length > 0
    }

    return true // No validation when isPrivatee is false
  }),
  user: userSchema.notRequired(),
})

export { PUBLISH_JOB, EDIT_PUBLISH_JOB }
