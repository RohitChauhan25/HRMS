import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  newData: [],
}
export const JobApplicationQuestionCheck = createSlice({
  name: 'JobApplicationQuestionJson',
  initialState,
  reducers: {
    setApplicationQuestions(state, action) {
      return {
        ...state,
        newData: action.payload,
      }
    },
    emptyJobQuestions: () => initialState,
  },
})
export const { setApplicationQuestions, emptyJobQuestions } = JobApplicationQuestionCheck.actions
export default JobApplicationQuestionCheck.reducer
