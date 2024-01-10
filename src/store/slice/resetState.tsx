import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { emptySwitchStore } from 'store/slice/jobApplicationSwitch'
import { emptyJobDashBoard } from 'store/slice/jobDashboard'
import { emptyJobData } from 'store/slice/jobData'
import { emptyJobQuestions } from 'store/slice/jobQuestionsDataUpdate'
import { emptyProfileQuestions } from 'store/slice/profileQuestion'
import { emptyScreeningQuestions } from 'store/slice/screeningQuestion'
import { emptyUser } from 'store/slice/user'

export const resetAllState = createAsyncThunk('reset/resetAllState', async (_, { dispatch }) => {
  dispatch(emptyUser())
  dispatch(emptyScreeningQuestions())
  dispatch(emptyProfileQuestions())
  dispatch(emptyJobQuestions())
  dispatch(emptyJobData())
  dispatch(emptyJobDashBoard())
  dispatch(emptySwitchStore())
})

const resetSlice = createSlice({
  name: 'resetSlice',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetAllState.fulfilled, (state) => state)
  },
})

export default resetSlice.reducer
