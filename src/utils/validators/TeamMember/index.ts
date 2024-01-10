import * as Yup from 'yup'
import { errorMessage } from 'constants/errorMessage'

const ADD_MEMBER = Yup.object().shape({
  email: Yup.string()
    .matches(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, errorMessage.validEmail)
    .required(errorMessage.requiredEmail),
  teamRoleId: Yup.string().label('Member Role').required(),
})

export { ADD_MEMBER }
