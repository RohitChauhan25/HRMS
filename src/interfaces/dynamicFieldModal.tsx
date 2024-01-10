export interface MyComponentProps {
  setFromData: (newState: any[] | ((prev: any[]) => any[])) => void
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  toggle: boolean
  dynamicData?: any
}
export interface IFormFields {
  defaultValue?: string
  description?: string
  icon?: string
  id?: string
  isDeleted?: boolean
  isRequired?: boolean
  label?: string
  name?: string
  pattern?: string
  placeHolder?: null | string
  seqNumber?: number
  type?: string
  updatedAt?: string
  option?: MultipleChoiceOption[]
  isMandatory?: boolean
}
export interface MultipleChoiceOption {
  label: string
  value: string
}

export interface SpecialFeildsData {
  multipleChoiceOption?: MultipleChoiceOption[]
}

export interface DataInterface {
  createdAt: string
  icon: string
  id: string
  label: string
  name: string
  placeHolder: string
  type: string
  updatedAt: string
  isMandatory: true
  option: []
}
