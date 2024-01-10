import { createSlice } from '@reduxjs/toolkit'

const initialState: any = { id: '' }

export const JobPostData = createSlice({
  name: 'JobPostData',
  initialState,
  reducers: {
    AddJobPostId(state, action) {
      return {
        ...state,
        id: action.payload,
      }
    },
    removeJobPostId(state) {
      return {
        ...state,
        id: '',
      }
    },
  },
})

export const { AddJobPostId, removeJobPostId } = JobPostData.actions
export default JobPostData.reducer
