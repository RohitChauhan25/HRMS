import * as yup from 'yup'
import { questiongError, rejectQuestiongError, shortQuestiongError } from 'constants/errorMessage'

const SHORT_QUESTION = yup.object().shape({
  newShortQuestion: yup.string().label('Short Question').required(shortQuestiongError),
})

const RADIO_QUESTION = yup.object().shape({
  newRadioQuestion: yup.string().label('Radio Question').required(questiongError),
})

const LONG_QUESTION = yup.object().shape({
  newLongQuestion: yup.string().label('Long Question').required(questiongError),
})

const FILE_QUESTION = yup.object().shape({
  newFileQuestion: yup.string().label('File Question').required(questiongError),
})

const CHECKBOX_QUESTION = yup.object().shape({
  newCheckQuestion: yup.string().label('Check Question').required(questiongError),
})

const MULTICHOICE_QUESTION = yup.object().shape({
  newMultipleChoiceQuestion: yup.string().label('MultipleChoice Question').required(questiongError),
})

const REJECT_QUESTION = yup.object().shape({
  rejectReason: yup.string().label('Reason').required(rejectQuestiongError),
})

export {
  SHORT_QUESTION,
  RADIO_QUESTION,
  LONG_QUESTION,
  FILE_QUESTION,
  CHECKBOX_QUESTION,
  MULTICHOICE_QUESTION,
  REJECT_QUESTION,
}
