import * as yup from 'yup'
import { signUpPostForm as error } from 'constants/errorMessage'
// const FileSize = 2 * 1024 * 1024
const JOB_POST_FORM = yup.object().shape({
  jobTitle: yup
    .string()
    .label('Job Title')
    .required(error.jobTitleRequired)
    .matches(/^\S/, error.jobTitleSpace)
    .matches(/^([^0-9@!]*)$/, error.jobTitleNumber),
  employmentType: yup.string().label('Employment Type').required(error.employmentType),
  jobDescription: yup.string().label('Job Description').required(error.jobDescription),
  department: yup.string().label('Department').required(error.department),
  numberOfPositions: yup
    .number()
    .positive()
    .integer()
    .label('Number Of Positions')
    .required(error.numberOfPositions)
    .typeError('Please enter number of positions')
    .max(20, 'Maximum value cannot be more than 20'),
  location: yup.string().required(error.location),
  minExperience: yup.string().required('Please selectexperience'),
  // files: yup
  //   .mixed()
  //   .required('Please upload a file')
  //   .test('fileSize', 'File size must be less than 1MB', (value) => {
  //     if (!value) return true // If no file is selected, it's valid.
  //     if (value instanceof File) {
  //       return value.size <= 1024 / 1024 // 1MB in bytes
  //     }

  //     return false
  //   }),
  isRemote: yup.boolean(),
  // JobPostField: yup.string(),
})

export { JOB_POST_FORM }
