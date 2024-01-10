import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  screeningData: [],
}

export const ScreeningQuestionSlice = createSlice({
  name: 'screeningQuestion',
  initialState,
  reducers: {
    addShortQuestion(state, action) {
      return {
        ...state,
        screeningData: action.payload,
      }
    },
    removeShortQuestion(state, action) {
      // Remove the object with the specified index from screeningData
      return {
        ...state,
        screeningData: state.screeningData.filter((_question: any, index: number) => index !== action.payload),
      }
    },
    emptyScreeningQuestions: () => initialState,
  },
})

export const { addShortQuestion, removeShortQuestion, emptyScreeningQuestions } = ScreeningQuestionSlice.actions
export default ScreeningQuestionSlice.reducer
