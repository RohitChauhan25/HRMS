import { feedback as error } from 'constants/errorMessage'
import * as yup from 'yup'
export const FeedbackSchema = yup.object().shape({
  rating: yup.string().required(error.rating),
  comment: yup.string().required(error.comment),
})
export const SignoffFeedbackSchema = yup.object().shape({
  comment: yup.string().required(error.comment),
})
