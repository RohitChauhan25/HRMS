import * as yup from 'yup'
import { askDocsErrors as error } from 'constants/errorMessage'

export const uploadDocsSchema = yup.object().shape({
  Aadhar: yup.string().required(error.Aadhar),
  Pan: yup.string().required(error.Pan),
  SalarySlip: yup.string().required(error.SalarySlip),
  RelievingSlip: yup.string().required(error.RelievingSlip),
  SecondaryEducation: yup.string().required(error.SecondaryEducation),
  SeniorSecondaryEducation: yup.string().required(error.SeniorSecondaryEducation),
})
