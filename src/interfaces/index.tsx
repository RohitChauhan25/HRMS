import { ReactElement, ReactNode } from 'react'
import { Params } from 'react-router-dom'
import { UseQueryResult } from 'react-query'
import { SelectProps } from 'antd'

export interface ISidebar {
  category: string
  data: IData[]
}

export interface IHiringData {
  isDone: boolean
  data?: any
  refetch?: any
}
export interface QueryParamTypes extends Params {
  jobPostId: string
  id: string
}

export interface IDocumentData {
  name?: string
  value?: string
}

export interface IData {
  title: string
  icon: ReactElement | string
  id: number
  url: string
  value?: string
}
export interface IRoute {
  path: string
  restricted: boolean
  component: () => JSX.Element
  exact: boolean
}

export interface IRadioLabel {
  label1: string
  label2: string
  id?: any
}
export interface IJobFieldOption {
  label: string
  value: string
}
export interface IJobField {
  label: string
  name: string
  type?: any
  field?: any
  id: number
  isRequired?: boolean
  options?: IJobFieldOption[]
  defaultChecked?: boolean
  isPrefix?: boolean
  isDefault?: boolean
  prefixValue?: string
  applicationType?: string
  pattern?: string
  isSelected?: boolean
}
export interface IJobSwitchData {
  jobSwitch: IJobField[]
}
export interface IScreeningQuestions {
  label: string
  type: string
  required?: boolean
  options?: IJobFieldOption[]
  key?: string
}
export interface IDataType {
  key: React.Key
  name: string
  email: string
  department: string
  role: string
  actions: string
}
export interface AllJobsDataType {
  key: React.Key
  title: ReactNode
  created: string
  openings: number
  candidate: ReactNode
  hiringLead: string
  timeline: ReactNode
  actions: ReactNode
}
export interface CandidateDataType {
  key: React.Key
  candidateName: ReactNode
  appliedDate: string
  source: string
  stage: string
  rating: ReactNode
  actions: ReactNode
}
export interface DraftsJobsDataType {
  key: React.Key
  title: ReactNode
  created: string
  hiringLead: string
  actions: ReactNode
}

export interface IRadioprops {
  options?: IJobFieldOption[]
  required?: boolean
  disabled?: boolean
  onChange?: any
  handleChange?: any
  defaultValue?: any
}

export interface SelectContainerProps {
  mode?: any
  loading?: boolean
  options?: { value: string; label: string }[]
  defaultValue?: any
  control?: any
  name?: any
  onFocus?: any
  props?: SelectProps
  onSearch?: any
  placeholder?: string
  onChange?: any
  handleValue?: any
  suffixIcon?: any
  disabled?: boolean
  value?: string
}
export interface Idata {
  rating: any
  comment: string
}

export interface Itask {
  link?: string
  file?: any
}

export interface IRules {
  required: boolean
}
export interface RatingProps {
  label?: string
  name: string
  control: any
  rules: IRules
  defaultValue?: number
  disabled?: boolean
}

export interface IApprovalData {
  id?: number
  image?: string
  name?: string
  designation?: string
}
export interface IApprovalData {
  id?: number
  image?: string
  name?: string
  designation?: string
}

export interface PQInterface {
  canDelete?: boolean
  createdAt?: string
  field?: fieldInterface
  fieldDescription?: string
  fieldName: string
  fieldNameSanitized: string
  fieldTypeMasterId: string
  id: string
  isDefault: boolean
  isDisabled: boolean
  isRequired: boolean
  objectFieldOptions: null
  updatedAt: string
  options?: []
  isSelected?: boolean
}

export interface SavedPQInterface {
  createdAt: string
  id: string
  isRequired: true
  jobApplicationId: string
  masterProfileLink: masterProfileLinkInterface
  profileQuestionMasterId: string
  updatedAt: string
}
export interface ISavedScreening {
  createdAt: string
  id: string
  isRequired: true
  fieldDescription: string
  fieldName: string
  fieldTypeMasterId: string
  masterProfileLink: masterProfileLinkInterface
  jobApplicationId: string
  updatedAt: string
  objectFieldOptions: null
}

export interface masterProfileLinkInterface {
  id: string
  createdAt: string
  updatedAt: string
  fieldName: string
  fieldNameSanitized: string
}

export interface fieldInterface {
  id?: string
  createdAt?: string
  updatedAt?: string
  label?: string
  icon?: string
  placeHolder?: string
  type?: string
  objectFieldOptions?: null
}

export interface IUpdateQuestion {
  id?: string
  name?: string | undefined
  fieldName?: string | undefined
  fieldTypeMasterId?: string | undefined
  fieldDescription?: string
  isDefault?: any
  isRequired?: any
  canDelete?: any
  label?: string | undefined
  type?: string | undefined
  icon?: string | undefined
  placeHolder?: string | undefined
  start?: string | undefined
  end?: string | undefined
  description?: string | undefined
}

export interface Iprops {
  departmentsRefect?: UseQueryResult['refetch']
  getDepartment?: any
  getProfileQuestions?: any
  getExperience?: any
  getEmploymentType?: any
  profileQuestionsRefetch?: UseQueryResult['refetch']
  getScreeningQuestions?: any
  screenQuestionsRefetch?: UseQueryResult['refetch']
  refetchExperience?: UseQueryResult['refetch']
  refetchEmploymentType?: UseQueryResult['refetch']
}

export interface IModalProps {
  showModal: (_value: boolean) => void
  updateDepartment?: IUpdateQuestion
  id?: string
  departmentsRefect?: UseQueryResult['refetch']
  profileQuestionsRefetch?: UseQueryResult['refetch']
  updateQuestion?: IUpdateQuestion
  updateProfileQuestion?: IUpdateQuestion
  updateExperience?: any
  refetchExperience?: UseQueryResult['refetch']
  screenQuestionsRefetch?: UseQueryResult['refetch']
  getScreeningQuestions?: any
  refetchEmploymentType?: any
}

export interface IButtonProps {
  label: ReactElement | string
  onClick?: () => void
  variant: 'contained' | 'text' | 'outline'
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  children?: any
  style?: any
}
export interface IDataInterview {
  subject: string
  emailBody: string
}
export interface QueryParamTypes extends Params {
  jobPostId: string
  id: string
}

export interface IFormDynamicData {
  name?: any
  requireApproval?: boolean
  seqNumber?: number
  FromFields?: IFieldData[]
}
export interface IFieldData {
  id?: number
  icon?: ReactElement | null
  label?: string
  type?: string
  isRequired?: boolean
  seqNumber?: number
  pattern?: string
  defaultValue?: string
  name: string
  description: string
  scalarFieldId?: string
  scalarFieldValue?: string
}

export interface staticDataInterface {
  name: string
  value: string
}
export interface RolesData {
  roleName: string
  roleDescription: string
  canDelete: boolean
  id: string
  createdAt: string
  updatedAt: string
}

export interface RolesTablesProps {
  roles?: RolesData[] | undefined
  refetchRole: () => Promise<any>
}

export interface DataType {
  key?: React.Key
  roleName: string
  roleDescription: string
  Users: string
  id: string
}

export interface StepperInterface {
  next?: () => void
  prev?: () => void
  getJobData?: any
  refetchJobData?: () => void
}

export interface IMenu {
  endpoint?: string
  master?: boolean
  permissions?: string[]
  resource?: string
}

export interface IDynamicFields {
  createdAt: string
  field: fieldInterface
  fieldDescription: string
  fieldName: string
  fieldTypeMasterId: string
  id: string
  isRequired: boolean
  jobApplicationId: string
  objectFieldOptions: null
  updatedAt: string
}

export interface IQuestionId {
  id: string
  isRequired: boolean
}

export interface IQuestionData {
  id: string
  isRequired: boolean
  fieldName: string
  fieldNameSanitized: string
  fieldDescription: string
  isDefault: boolean
  canDelete: boolean
  objectFieldOptions: null
  fieldTypeMasterId: string
  defaultChecked?: boolean
  isDisabled?: boolean
  isSelected?: boolean
  field: {
    id: string
    label: string
    icon: string
    placeHolder: null
    type: string
  }
}
export interface ResourceDataType {
  key: React.Key
  Resource: string
  Description: string
  // resourceName: string
}
export interface CollectionTableProps {
  getResources: ResourceDataType
  refetchResource: () => void
}

///
export interface RoleDataType {
  roleName: string
  id: string
}
export interface GetRoleDataProps {
  getRole: RoleDataType
  refetchRole: () => void
}
export interface HiringStageTypes {
  stageName: string
  id: string
  defaultSeq: number
}
export interface getHiringStageprops {
  gethiringstage: HiringStageTypes
}

// export interface getStagesTypes {}
// export interface getStagesProps {
//   getStages: getStagesTypes
// }
export interface IFormData {
  department: string
  employmentType: string
  isRemote?: boolean
  jobDescription: string
  jobTitle: string
  location: string
  minExperience: string
  numberOfPositions?: number
}

export interface CustomFile {
  name: string
  blob: Blob
}

export interface IExperience {
  end: number
  id: string
  name: string
  start: number
  type: string
}

export interface ILocation {
  id: string
  name: string
}

export interface IDepartment {
  id: string
  name: string
}

export interface IEmployeeType {
  id: string
  name: string
}

export interface IOptions {
  label: string
  value: string
}

export interface IErrors {
  jobTitle?: Error
  employmentType?: Error
  department?: Error
  numberOfPositions?: Error
  location?: Error
  minExperience?: Error
  jobDescription?: Error
}

interface Error {
  message: string
  type: string
  ref: {
    name: string
    value?: string
  }
}

export interface Theme {
  navbarBackground: string
  buttonBackground: string
}

export interface ThemeProviderProps {
  children: ReactNode
}

export interface TabProps {
  color: string
  users?: number
}

export interface IPayloadData {
  oldPassword?: string
  newPassword?: string
}

export interface IPublishedJob {
  department?: {
    name?: string
  }
  jobTitle?: string
  minExperience?: {
    name?: string
    start?: number
    end?: number
    type?: string
  }
  id?: string
}
