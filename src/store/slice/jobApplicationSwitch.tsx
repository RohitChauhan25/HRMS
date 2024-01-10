import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '1',
  jobPostId: 0,
  refetch: false,
  approvalStep: 0,
  currentPage: 1,
  pageSize: 10,
  filterStatus: ['Open', 'Closed', 'On-Hold'],
  assignedTimeline: '',
  location: [],
  startDate: '',
  endDate: '',
  openJobsLocation: [],
}

export const ModelSlice = createSlice({
  name: 'Model',
  initialState,
  reducers: {
    updateValue: (state, action) => {
      state.value = action.payload
    },
    updateRefetch: (state, action) => {
      state.refetch = action.payload
    },

    updateJobPostId: (state, action) => {
      state.jobPostId = action.payload
    },
    resetJobPostId: (state) => {
      state.jobPostId = 0
    },
    updateApprovalStep: (state, action) => {
      state.approvalStep = action.payload
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    updatepageSize: (state, action) => {
      state.pageSize = action.payload
    },
    resetPagination: (state) => {
      state.pageSize = initialState.pageSize
      state.currentPage = initialState.currentPage
    },
    updateFilterStatus: (state, action) => {
      if (state.filterStatus.length === 3) {
        state.filterStatus = action.payload
      } else {
        state.filterStatus = [...state.filterStatus, ...action.payload]
      }
    },
    removeFilterStatus: (state, action) => {
      const arr = ['Open', 'Closed', 'On-Hold']
      if (state.filterStatus.length === 1) {
        state.filterStatus = arr
      } else {
        state.filterStatus = state.filterStatus.filter((item: any) => item !== action.payload)
      }
    },
    resetFilterStatus: (state) => {
      state.filterStatus = ['Open', 'Closed', 'On-Hold']
    },
    updateLocation: (state: any, action) => {
      state.location = [...state.location, ...action.payload]
    },
    removeLocation: (state, action) => {
      state.location = state.location.filter((item: any) => item !== action.payload)
    },
    resetLocationFilter: (state) => {
      state.location = []
    },
    updateAssignedTimeline: (state, action) => {
      state.assignedTimeline = action.payload
    },
    updateStartDate: (state, action) => {
      state.startDate = action.payload
    },
    updateEndDate: (state, action) => {
      state.endDate = action.payload
    },
    updateOpenLocation: (state: any, action) => {
      state.openJobsLocation = [...state.openJobsLocation, ...action.payload]
    },
    removeOpenLocation: (state, action) => {
      state.openJobsLocation = state.openJobsLocation.filter((item: any) => item !== action.payload)
    },
    emptySwitchStore: () => initialState,
  },
})

export const {
  updateValue,
  updateJobPostId,
  resetJobPostId,
  updateCurrentPage,
  updatepageSize,
  updateFilterStatus,
  updateAssignedTimeline,
  removeFilterStatus,
  updateLocation,
  removeLocation,
  updateStartDate,
  updateEndDate,
  updateOpenLocation,
  removeOpenLocation,
  resetFilterStatus,
  resetLocationFilter,
  updateApprovalStep,
  emptySwitchStore,
  updateRefetch,
  resetPagination,
} = ModelSlice.actions

export default ModelSlice.reducer
