import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addShortQuestion } from 'store/slice/screeningQuestion'
import { LONG_QUESTION } from 'utils/validators/screeningQuestionSchema'
import SwitchContainer from 'components/Switch'
import TextinputContainer from 'components/TextInput'
import { Mandatory } from 'styles/views/Jobs/JobApplication/ScreeningQuestions'
import { Buttons, CancelButton, Label, SaveButton } from 'styles/views/Jobs/JobPostForm'
import { ErrorMessage } from 'styles/components/Modal'

export const LongQuestion = (id: any) => {
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(LONG_QUESTION) })
  const screeningQuestions = useSelector((state: any) => state.screeningQuestions)
  const [dynamicLongQuestion, setDynamicLongQuestion] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const ShowError: any = errors
  const formData = (data: any) => {
    const dynamicLongName = data?.newLongQuestion?.split(' ')
    const newData = {
      id: id?.id,
      label: data?.newLongQuestion,
      fieldName: dynamicLongName[dynamicLongName?.length - 1],
      field: { type: 'textarea' },
      isRequired: dynamicLongQuestion,
      applicationType: 'screening',
    }
    setDynamicLongQuestion(false)
    dispatch(addShortQuestion([...screeningQuestions.screeningData, newData]))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(formData)} className="form">
      <Label>Question</Label>
      <TextinputContainer placeholder="E.g. What are your strengths?" control={control} name={'newLongQuestion'} />
      <ErrorMessage>
        {errors.newLongQuestion && <span className="error">{ShowError?.newLongQuestion?.message}</span>}
      </ErrorMessage>
      <Mandatory>
        <SwitchContainer checked={dynamicLongQuestion} onClick={(e: any) => setDynamicLongQuestion(e)} />
        Mandatory
      </Mandatory>
      <Buttons>
        <CancelButton>Cancel</CancelButton>
        <SaveButton type="submit" disabled={!isDirty || !isValid} style={{ backgroundColor: activeColor }}>
          Add
        </SaveButton>
      </Buttons>
    </form>
  )
}
