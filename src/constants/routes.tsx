import { IRoute } from 'interfaces'
import Login from 'pages/auth/login'
import DashboardJob from 'pages/job-dashboard'
import CreateJob from 'pages/jobs'
import NotFound from 'pages/404/'
import JobDescription from 'pages/job-dashboard/job-description'
import CandidateContainer from 'pages/job-dashboard/candidates'
import StartTrial from 'pages/auth/start-trial'
import VerifyEmail from 'pages/verify-email'
import VerificationComplete from 'pages/verification-complete'
import CandidateDetails from 'pages/job-dashboard/candidates/candidate-details'
import Feedback from 'pages/feedback'
import CandidateScheduleInterview from 'pages/job-dashboard/candidates/candidate-schedule-interview'
import UploadDocument from 'components/UploadDocument'
import JobDetails from 'pages/careers/job-details'
import SubmitTask from 'pages/job-dashboard/candidates/submit-task'
import SignoffFeedback from 'pages/job-dashboard/candidates/signoff-feedback'
import EmployeeList from 'pages/employees'
import EmployeeDetail from 'pages/employees/employee-details'
import collection from 'pages/Structure/collectiontype'
import Roles from 'pages/Structure/roles'
import Preview from 'components/Preview'
import UserProfile from 'views/ProfileDetails'
import Departments from 'pages/master/department'
import EmploymentType from 'pages/master/employmentType'
import ProfileQuestions from 'pages/master/profileQuestions'
import Resources from 'pages/Structure/Resources'
import Experience from 'pages/master/experience'
import ScreeningQuestions from 'pages/master/screeningQuestions'
import EditJob from 'pages/jobs/editJob'
import ViewJob from 'views/JobsDashboard/ViewJob'
import UserSignUp from 'pages/auth/signup'
import ForgotPassword from 'pages/auth/forgot-password'
import ForgotEmailSent from 'pages/auth/forgot-password/email-sent'
import ResetPassword from 'pages/auth/reset-password'
import SuccessEmail from 'pages/auth/reset-password/email-sent'
import ChangePassword from 'pages/auth/change-password'
import RoleUsers from 'views/Structure/Roles/RoleUsers'
import ExploreCareer from 'pages/careers/explore-career'
import ApplyJob from 'views/ApplyJob'
import ApplyNow from 'pages/careers/apply-now'

export const JobRoute = {
  component: CreateJob,
  path: '/jobs/create-job',
  exact: true,
  restricted: true,
}

export const LoginRoute = {
  component: Login,
  path: '/',
  exact: true,
  restricted: false,
}
export const StartTrialRoute = {
  component: StartTrial,
  path: '/start-trial',
  exact: true,
  restricted: false,
}
export const VerifyEmailRoute = {
  component: VerifyEmail,
  path: '/verify-email',
  exact: true,
  restricted: false,
}
export const VerificationCompletedRoute = {
  component: VerificationComplete,
  path: '/verification',
  exact: true,
  restricted: false,
}

export const JobDashboardRoute = {
  component: DashboardJob,
  path: '/jobs',
  exact: true,
  restricted: true,
}
export const JobDescriptionRoute = {
  component: JobDescription,
  path: '/jobs/job-description/:id',
  exact: true,
  restricted: true,
}
// export const CandidateRoute = {
//   component: CandidateContainer,
//   path: '/jobs/job-description/candidate/:id',
//   exact: true,
//   restricted: true,
// }

export const CandidateScheduleInterviewRoute = {
  component: CandidateScheduleInterview,
  path: '/jobs/job-description/candidate/:jobPostId/candidate-schedule-interview/:id',
  exact: true,
  restricted: true,
}
// export const CandidateDetailsRoute = {
//   component: CandidateDetails,
//   path: '/jobs/job-description/candidate/:jobPostId/candidate-details/:id',
//   exact: true,
//   restricted: true,
// }
export const NotFoundRoute = {
  component: NotFound,
  path: '*',
  exact: false,
  restricted: true,
}

export const FeedbackRoute = {
  component: Feedback,
  path: '/jobs/feedback/:userId/:jobPostId/:hiringStageId/:candidateId/:token',
  exact: true,
  restricted: false,
}

export const SubmitRoute = {
  component: SubmitTask,
  path: '/jobs/feedback/:jobPostId/submitTask/:candidateId/:token',
  exact: true,
  restricted: false,
}

export const JobDetailsRoute = {
  component: JobDetails,
  path: '/careers/job-details/:id',
  exact: true,
  restricted: false,
}

export const UploadDocumentRoute = {
  component: UploadDocument,
  path: '/jobs/uploaddocument/:docs/:jobPostId/:candidateId/:token',
  exact: true,
  restricted: false,
}
export const SignoffFeedbackRoute = {
  component: SignoffFeedback,
  path: '/public/job/candidate/signoff/:userId/:jobPostId/:candidateId/:token',
  exact: true,
  restricted: false,
}

export const EmployeeListRoute = {
  component: EmployeeList,
  path: '/organization/employees',
  exact: true,
  restricted: true,
}
export const EmployeeDetailRoute = {
  component: EmployeeDetail,
  path: '/organization/employees/employee-detail',
  exact: true,
  restricted: true,
}
export const RolesRoute = {
  component: Roles,
  path: '/structure/Roles',
  exact: true,
  restricted: true,
}
export const RoleUsersRoute = {
  component: RoleUsers,
  path: '/structure/Roles/RoleUsers',
  exact: true,
  restricted: true,
}
export const PreviewRoute = {
  component: Preview,
  path: '/jobs/preview',
  exact: true,
  restricted: true,
}
export const AddNewsUserRoute = {
  component: collection,
  path: '/structure/Roles/addPermission/:roleId',
  exact: true,
  restricted: true,
}
export const ProfileDetailRoute = {
  component: UserProfile,
  path: '/profile',
  exact: true,
  restricted: true,
}
export const DepartmentsRoute = {
  component: Departments,
  path: '/master/departments',
  exact: true,
  restricted: true,
}
export const EmploymentRoute = {
  component: EmploymentType,
  path: '/master/employment-type',
  exact: true,
  restricted: true,
}
export const ProfileQuestionsRoute = {
  component: ProfileQuestions,
  path: '/master/profile-questions',
  exact: true,
  restricted: true,
}
export const ExperienceRoute = {
  component: Experience,
  path: '/master/experience',
  exact: true,
  restricted: true,
}
export const ScreeningQuestionsRoute = {
  component: ScreeningQuestions,
  path: '/master/screening-questions',
  exact: true,
  restricted: true,
}
export const ResourcesRoute = {
  component: Resources,
  path: '/structure/Roles/Resources',
  exact: true,
  restricted: true,
}

export const EditJobRoutes = {
  component: EditJob,
  path: '/jobs/edit/:id',
  exact: true,
  restricted: true,
}

export const ViewJobRoute = {
  component: ViewJob,
  path: 'jobs/view/:id',
  exact: true,
  restricted: true,
}
export const SignUpRoute = {
  component: UserSignUp,
  path: '/user/signup',
  exact: true,
  restricted: false,
}
export const ForgotPasswordRoute = {
  component: ForgotPassword,
  path: '/forgot-password',
  exact: true,
  restricted: false,
}
export const ForgotEmailSentRoute = {
  component: ForgotEmailSent,
  path: '/forgot-email',
  exact: true,
  restricted: false,
}
export const ResetPasswordRoute = {
  component: ResetPassword,
  path: '/reset-password',
  exact: true,
  restricted: false,
}
export const SuccessEmailRoute = {
  component: SuccessEmail,
  path: '/successfull-email',
  exact: true,
  restricted: false,
}
export const ChangePasswordRoute = {
  component: ChangePassword,
  path: '/change-password',
  exact: true,
  restricted: true,
}

export const ExploreCareerRoute = {
  component: ExploreCareer,
  path: '/explore-career',
  exact: true,
  restricted: false,
}

export const ApplyJobRoute = {
  component: ApplyJob,
  path: '/job/apply/:id',
  exact: true,
  restricted: false,
}
export const CandidateRoute = {
  component: CandidateContainer,
  path: '/jobs/job-description/candidate/:id',
  exact: true,
  restricted: true,
}
export const CandidateDetailsRoute = {
  component: CandidateDetails,
  path: '/jobs/job-description/candidate/:jobPostId/candidate-details/:id',
  exact: true,
  restricted: true,
}
export const ApplyJobDetailsRoute = {
  component: ApplyNow,
  path: '/job/apply/details/:id',
  exact: true,
  restricted: false,
}

const ROUTES: IRoute[] = [
  JobRoute,
  LoginRoute,
  JobDashboardRoute,
  JobDescriptionRoute,
  NotFoundRoute,
  FeedbackRoute,
  SubmitRoute,
  CandidateRoute,
  CandidateDetailsRoute,
  StartTrialRoute,
  VerifyEmailRoute,
  VerificationCompletedRoute,
  CandidateScheduleInterviewRoute,
  JobDetailsRoute,
  UploadDocumentRoute,
  SignoffFeedbackRoute,
  RolesRoute,
  EmployeeListRoute,
  EmployeeDetailRoute,
  AddNewsUserRoute,
  ProfileDetailRoute,
  DepartmentsRoute,
  EmploymentRoute,
  ProfileQuestionsRoute,
  ScreeningQuestionsRoute,
  ResourcesRoute,
  ExperienceRoute,
  EditJobRoutes,
  ViewJobRoute,
  SignUpRoute,
  ForgotPasswordRoute,
  ForgotEmailSentRoute,
  ResetPasswordRoute,
  SuccessEmailRoute,
  ChangePasswordRoute,
  RoleUsersRoute,
  ExploreCareerRoute,
  ApplyJobRoute,
  ApplyJobDetailsRoute,
]

export default ROUTES
