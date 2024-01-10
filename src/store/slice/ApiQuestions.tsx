import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  newData: [
    {
      id: 0,
      label: 'First Name',
      name: 'firstName',
      isRequired: true,
      type: 'text',
      applicationType: 'profile',
      pattern: '^[^\\s].*',
    },
    {
      id: 1,
      label: 'Last Name',
      name: 'lastName',
      isRequired: true,
      type: 'text',
      applicationType: 'profile',
      pattern: '^[^\\s].*',
    },
    {
      id: 2,
      label: 'Email ID',
      name: 'emailID',
      isRequired: true,
      type: 'text',
      applicationType: 'profile',
      pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
    },
    {
      id: 3,
      label: 'Phone',
      name: 'phoneNumber',
      isRequired: true,
      type: 'number',
      applicationType: 'profile',
      // pattern: '^[0-9]{0,}$',
    },
    {
      id: 4,
      label: 'Resume(Attachment)',
      name: 'resume',
      isRequired: true,
      type: 'file',
      applicationType: 'profile',
    },
    {
      id: 5,
      label: 'Address',
      name: 'address',
      isRequired: true,
      type: 'text',
      applicationType: 'profile',
      pattern: '^[^\\s].*',
    },
  ],
}

export const JobApplicationQuestion = createSlice({
  name: 'JobApplicationQuestion',
  initialState,
  reducers: {
    setApiQuestions(state, action) {
      return {
        ...state,
        newData: action.payload,
      }
    },

    addApiQuestions(state, action) {
      const { name, label, type, id, options, isPrefix, prefixValue, applicationType, isRequired, pattern } =
        action.payload
      if (options === undefined) {
        state.newData.push({
          name: name,
          isRequired: isRequired,
          label: label,
          type: type,
          id: id,
          isPrefix: isPrefix,
          prefixValue: prefixValue,
          applicationType: applicationType,
          pattern: pattern,
        })
      } else
        state.newData.push({
          name: name,
          isRequired: isRequired,
          label: label,
          type: type,
          id: id,
          options: options,
          isPrefix: isPrefix,
          prefixValue: prefixValue,
          applicationType: applicationType,
          pattern: pattern,
        })
    },
    setApiCheckedmandatory(state, action) {
      const newData = state.newData.map((item: any) => {
        if (item.name === action.payload.name) {
          item.isRequired = action.payload.value
        }

        return item
      })
      state = newData
    },
    removeApiQuestions(state, action) {
      const filterd = state.newData.filter((item: any) => item.name !== action.payload.name)
      return { ...state, newData: filterd }
    },
    emptyApiQuestions: () => initialState,
  },
})

export const { addApiQuestions, removeApiQuestions, setApiQuestions, setApiCheckedmandatory, emptyApiQuestions } =
  JobApplicationQuestion.actions
export default JobApplicationQuestion.reducer
