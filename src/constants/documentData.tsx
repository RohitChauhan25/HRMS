interface IDocs {
  name: string
  value: string
  required: boolean
}

export const documentData: IDocs[] = [
  {
    name: 'Aadhar Card*',
    value: 'Aadhar',
    required: true,
  },
  {
    name: 'PAN Card*',
    value: 'Pan',
    required: true,
  },

  {
    name: 'Salary Slips*',
    value: 'SalarySlip',
    required: true,
  },
  {
    name: 'Relieving Letter*',
    value: 'RelievingSlip',
    required: true,
  },
  {
    name: 'Secondary* (Education)',
    value: 'SecondaryEducation',
    required: true,
  },
  {
    name: 'Senior Secondary* (Education)',
    value: 'SeniorSecondaryEducation',
    required: true,
  },
  {
    name: 'Graduation (Education)',
    value: 'GraduationEducation',
    required: false,
  },
  {
    name: 'Post Graduation (Education)',
    value: 'PGEducation',
    required: false,
  },
  {
    name: 'ProvidentFund',
    value: 'ProvidentFund',
    required: false,
  },
]
