import * as yup from 'yup'
import { hiringStageErrorMessages as error } from 'constants/errorMessage'

const HIRING_STAGE = yup.object().shape({
  screening: yup.string().required(error?.screening),
  interview: yup.string().required(error?.interview),
  signOff: yup.string().required(error?.signOff),
  OfferRelease: yup.string().required(error?.OfferRelease),
  documents: yup.string().required(error?.documents),
})

export { HIRING_STAGE }
