import * as Yup from 'yup'
import { scheduleInterViewFormError as error } from 'constants/errorMessage'

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string(),
  eventEmail: Yup.string(),
  jobTitle: Yup.string(),
  title: Yup.string().required(error.title),
  date: Yup.string().required(error.date),
  startTime: Yup.string().required(error.startTime),
  endTime: Yup.string().required(error.endTime),
  body: Yup.string().required(error.body),
  participants: Yup.array().min(1, error.participants).required(),
})

export { VALIDATION_SCHEMA }
