import { IJobField } from 'interfaces'

const initialState: Array<IJobField> = [
  { id: 0, label: 'First Name', name: 'firstName', isRequired: false, type: 'text', applicationType: 'profile' },
  { id: 1, label: 'Last Name', name: 'lastName', isRequired: false, type: 'text', applicationType: 'profile' },
  { id: 2, label: 'Email ID', name: 'email', isRequired: false, type: 'text', applicationType: 'profile' },
  { id: 3, label: 'Phone', name: 'phone', isRequired: false, type: 'number', applicationType: 'profile' },
  {
    id: 4,
    label: 'Resume(Attachment)',
    name: 'resume',
    isRequired: false,
    type: 'file',
    applicationType: 'profile',
  },
  { id: 5, label: 'Address', name: 'address', isRequired: false, type: 'text', applicationType: 'profile' },
]

export default initialState
