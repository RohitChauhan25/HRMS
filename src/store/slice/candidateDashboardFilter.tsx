import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filterSource: [],
  filterStage: [],
  filterRating: ['1', '2', '3', '4', '5'],
}

export const candidateFilterSlice = createSlice({
  name: 'FilterCandidates',
  initialState,
  reducers: {
    updateCandidateSource: (state: any, action) => {
      state.filterSource = [...state.filterSource, ...action.payload]
    },
    removeCandidateSource: (state: any, action) => {
      state.filterSource = state.filterSource.filter((item: any) => item !== action.payload)
    },
    updateCandidateStage: (state: any, action) => {
      state.filterStage = [...state.filterStage, ...action.payload]
    },
    removeCandidateStage: (state: any, action) => {
      state.filterStage = state.filterStage.filter((item: any) => item !== action.payload)
    },
    updateCandidateRating: (state, action) => {
      state.filterRating = action.payload
    },
  },
})

export const {
  updateCandidateSource,
  removeCandidateSource,
  updateCandidateStage,
  removeCandidateStage,
  updateCandidateRating,
} = candidateFilterSlice.actions

export default candidateFilterSlice.reducer
