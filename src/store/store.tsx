import { combineReducers, configureStore } from '@reduxjs/toolkit'
import switchReducer from 'store/slice/profileQuestion'
import jobData from 'store/slice/jobData'
import userReducer from 'store/slice/user'
import screeningReducer from 'store/slice/screeningQuestion'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import jobApplicationSwitch from 'store/slice/jobApplicationSwitch'
import loaderReducer from 'store/slice/loader'
import JobApplicationQuestion from 'store/slice/ApiQuestions'
import JobApplicationQuestionCheck from './slice/jobQuestionsDataUpdate'
import JobDashBoardData from 'store/slice/jobDashboard'
import resetData from 'store/slice/resetState'
import filterCandidates from 'store/slice/candidateDashboardFilter'
import currentSlice from 'store/slice/currentIndex'
import JobProfileQuestionReducer from 'store/slice/JobProfileQuestion'
import JobStepperPermissionReducer from 'store/slice/JobStepper'
import JobPostData from 'store/slice/jobPost'
import colorSlice from 'store/slice/colorSlice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'jobApplicationSwitch',
    'loaderReducer',
    'jobData',
    'jobSwitch',
    'JobApplicationQuestion',
    'JobApplicationQuestionCheck',
    'screeningQuestions',
    'JobDashBoardData',
    'filterCandidates',
    'currentSlice',
    'JobProfileQuestion',
    'JobStepperPermission',
    'colorSlice',
  ],
}
const reducer = combineReducers({
  user: userReducer,
  jobSwitch: switchReducer,
  screeningQuestions: screeningReducer,
  jobData: jobData,
  jobApplicationSwitch: jobApplicationSwitch,
  loaderReducer: loaderReducer,
  JobApplicationQuestion: JobApplicationQuestion,
  JobApplicationQuestionCheck: JobApplicationQuestionCheck,
  JobDashBoardData: JobDashBoardData,
  resetData: resetData,
  filterCandidates: filterCandidates,
  currentSlice: currentSlice,
  JobProfileQuestion: JobProfileQuestionReducer,
  JobStepperPermission: JobStepperPermissionReducer,
  JobPostData: JobPostData,
  colorSlice: colorSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
