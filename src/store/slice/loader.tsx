import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ILoaderState {
  loader: boolean
}

const initialState: ILoaderState = {
  loader: false,
}

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload
    },
  },
})

export const { toggleLoader } = loaderSlice.actions
export default loaderSlice.reducer
