import { createSlice } from '@reduxjs/toolkit'

interface ColorState {
  activeColor: any
}

const initialState: ColorState = {
  activeColor: '',
}

const colorSlice = createSlice({
  name: 'activeColor',
  initialState,
  reducers: {
    setActiveColor: (state, action: any) => {
      state.activeColor = action.payload
    },
  },
})

export const { setActiveColor } = colorSlice.actions
export default colorSlice.reducer
