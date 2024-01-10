import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

const initialState: any = {
  newData: [],
}

export const JobProfileQuestionSlice = createSlice({
  name: 'JobProfileQuestion',
  initialState,
  reducers: {
    setQuestions(state, action) {
      return {
        ...state,
        newData: action.payload,
      }
    },
    addNewQuestions(state, action) {
      const data = current(state.newData)
      const filterd = data?.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            // isDefault: true,
            isSelected: true,
          }
        } else {
          return item
        }
      })
      return {
        ...state,
        newData: filterd,
      }
    },

    setIsRequired(state, action) {
      const data = current(state.newData)
      const filterd = data?.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            isRequired: true,
          }
        } else {
          return item
        }
      })
      return {
        ...state,
        newData: filterd,
      }
    },

    removeIsRequired(state, action) {
      const data = current(state.newData)
      const filterd = data?.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            isRequired: false,
          }
        } else {
          return item
        }
      })
      return {
        ...state,
        newData: filterd,
      }
    },

    removeQuestions(state, action) {
      const data = current(state.newData)
      const filterd = data?.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            isRequired: false,
            isSelected: false,
          }
        } else {
          return item
        }
      })
      return {
        ...state,
        newData: filterd,
      }
    },
    emptyApiQuestions: () => initialState,
  },
})

export const { addNewQuestions, removeQuestions, setQuestions, setIsRequired, removeIsRequired, emptyApiQuestions } =
  JobProfileQuestionSlice.actions
export default JobProfileQuestionSlice.reducer
