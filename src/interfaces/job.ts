export interface ITeamMember {
  memberName: string
  email: string
  id?: number
  teamRoleId?: string
  teamRole: ITeamRole
  userName: string
}
interface ITeamRole {
  teamRoleName: string
}

export interface ILocationOption {
  locationName: string
  id: number
}

export interface IJobDetail {
  id?: number
  jobTitle?: string
  employmentType?: string
  department?: string
  numberOfPositions?: number
  minimumExperience?: string
  jobDescription?: string
  location?: ILocationOption[]
  currency?: string
  salaryTime?: string
}

export interface IJobApplication {
  id: number
  jobPostId: number
  label: string
  name: string
  type: string
  isRequired: boolean
  value: any
  options: any
  pattern: any
  isPrefix: any
  prefixValue: any
  applicationType: string
  createdAt: string
  updatedAt: string
  JobPostId: number
}

export interface DropData {
  droppableId: string
  index: number
}

export interface DragData {
  index: number
  droppableId: string
}

export interface CombinedData {
  destination: DropData | null
  draggableId: string
  mode: string
  reason: string
  source: DragData
  type: string
}

export interface UserData {
  userName?: string
  id?: string
}

export interface GrantRoleData {
  id?: number
  email?: string
}

interface HiringStage {
  id: string
  stageName: string
}

export interface HiringStageDetails {
  jobPostId: string
  roleId: string
  seqNum: number
  hiringStage: HiringStage
}

export interface User {
  companyId: string
  createdAt: string
  email: string
  expiresAt: string | null
  id: string
  parentUserId: string
  password: string
  phone: string | null
  updatedAt: string
  userName: string
  verifyToken: string | null
}

export interface MemberDetails {
  stageDetails: HiringStageDetails
  userDetail: User
}

export interface UserInfo {
  email: string
  id: number
  name: string
  roleName: string
}
export interface UserAssignment {
  createdAt: string
  feedback: null | string
  hiringStage2RoleHiringStageId: string
  hiringStage2RoleJobPostId: string
  hiringStageName: string
  id: string
  isApproved: null | boolean
  roleId: string
  roleName: string
  updatedAt: string
  userEmail: string
  userId: string
  userName: string
}

export interface IAddMemberModal {
  toggleadd: () => void
  jobPostId?: number | string
  removeMember?: (id: number) => void
  members?: ITeamMember[]
  refetch?: any
  refetchUsers?: any
  id?: any
  usersList: UserAssignment[]
}

export interface IPublishModal {
  rejectToggle: () => void
  id?: any
  jobId?: number | string
  status?: string
  setModal?: any
  setPublishModal?: any
}

export interface UserProfileInfo {
  email: string
  username: string
  phone: string
  location: string
}
export interface PropInterface {
  setModal(value: boolean): void
  record: any
  refetchResource: any
}
