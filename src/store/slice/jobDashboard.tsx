import { createSlice } from '@reduxjs/toolkit'

const initialState: any = { allJobsData: [] }

export const JobDashBoardData = createSlice({
  name: 'JobDashBoard',
  initialState,
  reducers: {
    addJobDashBoardData(state, action) {
      return {
        ...state,
        allJobsData: action.payload,
      }
    },

    removeJob(state, action) {
      const filterd = state.allJobsData.data.filter((item: any) => item.result.id !== action.payload.text)
      return { allJobsData: { data: filterd, jobCount: state.allJobsData.jobCount - 1 } }
    },
    emptyJobDashBoard: () => initialState,
  },
})

export const { addJobDashBoardData, removeJob, emptyJobDashBoard } = JobDashBoardData.actions
export default JobDashBoardData.reducer
