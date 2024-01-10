import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  currentIndex: 0,
}

const currentSlice = createSlice({
  name: 'current1',
  initialState: initialState,
  reducers: {
    incrementCurrent: (state) => {
      state.currentIndex = state.currentIndex + 1
    },
    decrementCurrent: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex = state.currentIndex - 1
      } else {
        return
      }
    },
  },
})

export const { incrementCurrent, decrementCurrent } = currentSlice.actions

export default currentSlice.reducer
