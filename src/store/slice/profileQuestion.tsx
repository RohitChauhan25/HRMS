import { createSlice } from '@reduxjs/toolkit'
import initialState from 'store/state/profileQuestion'

export const switchSlice = createSlice({
  name: 'switch',
  initialState,
  reducers: {
    setQuestionsmandatory(state, action) {
      const newData = state.map((item) => {
        if (item.id === action.payload.id) {
          item.isRequired = action.payload.value
        }

        return item
      })
      state = newData
    },
    addQuestions(state, action) {
      const { name, label, type, id, options, isPrefix, prefixValue, applicationType } = action.payload
      if (options === undefined) {
        state.push({
          name: name,
          isRequired: false,
          label: label,
          type: type,
          id: id,
          isPrefix: isPrefix,
          prefixValue: prefixValue,
          applicationType: applicationType,
        })
      } else
        state.push({
          name: name,
          isRequired: false,
          label: label,
          type: type,
          id: id,
          options: options,
          isPrefix: isPrefix,
          prefixValue: prefixValue,
          applicationType: applicationType,
        })
    },
    removeQuestions(state, action) {
      return state.filter((item) => item.id !== action.payload.id)
    },
    emptyProfileQuestions: () => initialState,
  },
})

export const { setQuestionsmandatory, addQuestions, removeQuestions, emptyProfileQuestions } = switchSlice.actions
export default switchSlice.reducer
