import { createSlice } from '@reduxjs/toolkit'
import initialState from 'store/state/user'
export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload
    },

    updateMenu: (state, action) => {
      state.menu = action.payload
    },

    updatePermission: (state, action) => {
      state.permissionEndPoint = action.payload
    },
    emptyUser: () => initialState,
  },
})

export const { updateUser, emptyUser, updateMenu } = UserSlice.actions

export default UserSlice.reducer
