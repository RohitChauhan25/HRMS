import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { addShortQuestion } from 'store/slice/screeningQuestion'
import { RADIO_QUESTION } from 'utils/validators/screeningQuestionSchema'
import SwitchContainer from 'components/Switch'
import TextinputContainer from 'components/TextInput'
import { IRadioLabel } from 'interfaces'
import { Buttons, ErrorMessage } from 'styles/components/Modal'
import { Mandatory } from 'styles/views/Jobs/JobApplication/ScreeningQuestions'
import { Label, CancelButton, SaveButton } from 'styles/views/Jobs/JobPostForm'

export const RadioQuestion = ({ label1, label2, id }: IRadioLabel) => {
  const dispatch = useDispatch()
  const options = [
    { label: label1, value: label1 },
    { label: label2, value: label2 },
  ]
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(RADIO_QUESTION) })
  const [dynamicRadioQuestion, setDynamicRadioQuestion] = useState(false)
  const ShowError: any = errors
  const screeningQuestions = useSelector((state: any) => state.screeningQuestions)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const formData = (data: any) => {
    const dynamicradioName = data?.newRadioQuestion?.split(' ')
    const newData = {
      id: id,
      label: data?.newRadioQuestion,
      fieldName: dynamicradioName[dynamicradioName?.length - 1],
      field: { type: 'radio' },
      isRequired: dynamicRadioQuestion,
      options: options,
      applicationType: 'screening',
    }
    setDynamicRadioQuestion(false)
    dispatch(addShortQuestion([...screeningQuestions.screeningData, newData]))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(formData)} className="form">
      <Label>Question</Label>
      <TextinputContainer placeholder="E.g. What are your strengths?" control={control} name={'newRadioQuestion'} />
      <ErrorMessage>
        {errors.newRadioQuestion && <span className="error">{ShowError?.newRadioQuestion?.message}</span>}
      </ErrorMessage>
      <Mandatory>
        <SwitchContainer checked={dynamicRadioQuestion} onClick={(e: any) => setDynamicRadioQuestion(e)} />
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
