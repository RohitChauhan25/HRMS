import { createSlice } from '@reduxjs/toolkit'
import initialState from 'store/state/jobData'

export const JobData = createSlice({
  name: 'jobData',
  initialState,
  reducers: {
    setCheckedmandatory(state, action) {
      const newData = state.map((item) => {
        if (item.id === action.payload.id) {
          item.defaultChecked = action.payload.value
        }

        return item
      })
      state = newData
    },
    setRequired(state, action) {
      const newData = state.map((item) => {
        if (item.name === action.payload.name) {
          item.isRequired = action.payload.value
        }

        return item
      })
      state = newData
    },
    emptyJobData: () => initialState,
  },
})
export const { setCheckedmandatory, setRequired, emptyJobData } = JobData.actions
export default JobData.reducer
