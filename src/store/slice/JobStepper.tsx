import { createSlice } from '@reduxjs/toolkit'

const initialState: any = { allPermission: [], PermitedEndPoint: {} }

export const JobStepperPermission = createSlice({
  name: 'JobStepperPermission',
  initialState,
  reducers: {
    AddPermission(state, action) {
      return {
        ...state,
        allPermission: action.payload,
      }
    },
    AddPermissionEndPoint(state, action) {
      return {
        ...state,
        PermitedEndPoint: action.payload,
      }
    },
  },
})

export const { AddPermission, AddPermissionEndPoint } = JobStepperPermission.actions
export default JobStepperPermission.reducer
