import { IJobField } from 'interfaces'

const initialState: Array<IJobField> = [
  {
    id: 0,
    label: 'First Name',
    name: 'firstName',
    type: 'text',
    defaultChecked: true,
    isRequired: true,
    applicationType: 'profile',
  },
  {
    id: 1,
    label: 'Last Name',
    name: 'lastName',
    type: 'text',
    defaultChecked: true,
    applicationType: 'profile',
    isRequired: true,
  },
  {
    id: 2,
    label: 'Email ID',
    name: 'email',
    type: 'text',
    defaultChecked: true,
    applicationType: 'profile',
    isRequired: true,
  },
  {
    id: 3,
    label: 'Phone',
    name: 'phone',
    type: 'number',
    defaultChecked: true,
    isRequired: true,
    applicationType: 'profile',
  },
  {
    id: 4,
    label: 'Resume(Attachment)',
    name: 'resume',
    type: 'file',
    defaultChecked: true,
    applicationType: 'profile',
    isRequired: true,
  },
  {
    id: 5,
    label: 'Address',
    name: 'address',
    type: 'text',
    defaultChecked: true,
    applicationType: 'profile',
    isRequired: true,
  },
  {
    id: 6,
    label: 'LinkedIn Profile',
    name: 'linkedin',
    type: 'url',
    isPrefix: false,
    prefixValue: 'url',
    defaultChecked: false,
    applicationType: 'profile',
    isRequired: false,
  },
  {
    id: 7,
    label: 'Highest Education Attained',
    name: 'highestEducation',
    type: 'text',
    applicationType: 'profile',
    defaultChecked: false,
  },
  {
    id: 8,
    label: 'College/University',
    name: 'college',
    type: 'text',
    applicationType: 'profile',
    defaultChecked: false,
  },
  { id: 9, label: 'GPA', name: 'gpa', type: 'text', defaultChecked: false, applicationType: 'profile' },
  {
    id: 10,
    label: 'Employment Status',
    name: 'employmentStatus',
    type: 'text',
    applicationType: 'profile',
    defaultChecked: false,
  },
  {
    id: 11,
    label: 'Desired Salary',
    name: 'desiredSalary',
    type: 'text',
    applicationType: 'profile',
    defaultChecked: false,
  },
  {
    id: 12,
    label: 'Earliest Start Date',
    name: 'earliestStartDate',
    applicationType: 'profile',
    type: 'text',
    defaultChecked: false,
  },
  {
    id: 13,
    label: 'Willing To Relocate',
    name: 'willingToRelocate',
    type: 'text',
    defaultChecked: false,
    applicationType: 'profile',
    isRequired: false,
  },
  {
    id: 14,
    label: 'Felony Conviction (Y/N) + Explanation',
    name: 'felonyConviction',
    type: 'radio',
    applicationType: 'profile',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    defaultChecked: false,
    isRequired: false,
  },
  {
    id: 15,
    label: 'Languages Spoken',
    name: 'languagesSpoken',
    type: 'text',
    isRequired: false,
    applicationType: 'profile',
  },
  {
    id: 16,
    label: 'How many years of experience do you have?',
    name: 'experience',
    type: 'checkbox',
    applicationType: 'profile',
    options: [
      { label: '1 year', value: '1year' },
      { label: '2 year', value: '2year' },
      { label: '5 year', value: '5year' },
      { label: 'Other', value: 'Other' },
    ],
    defaultChecked: false,
    isRequired: false,
  },
  {
    id: 17,
    label: 'Do You have a driving license?',
    name: 'drivingLicense',
    type: 'radio',
    applicationType: 'profile',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    defaultChecked: false,
    isRequired: false,
  },
  {
    id: 18,
    label: 'Can travel for work',
    name: 'travel',
    type: 'checkbox',
    applicationType: 'profile',
    options: [{ label: 'Can travel for work', value: 'Yes' }],
    defaultChecked: false,
    isRequired: false,
  },
]

export default initialState
