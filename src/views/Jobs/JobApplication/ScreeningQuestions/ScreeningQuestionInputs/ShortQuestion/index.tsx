import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addShortQuestion } from 'store/slice/screeningQuestion'
import { SHORT_QUESTION } from 'utils/validators/screeningQuestionSchema'
import SwitchContainer from 'components/Switch'
import TextinputContainer from 'components/TextInput'
import { Mandatory } from 'styles/views/Jobs/JobApplication/ScreeningQuestions'
import { Buttons, CancelButton, Label, SaveButton } from 'styles/views/Jobs/JobPostForm'
import { ErrorMessage } from 'styles/components/Modal'

export const ShortQuestion = (id: any) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(SHORT_QUESTION),
  })

  const dispatch = useDispatch()
  const ShowError: any = errors
  const [dynamicShortQuestion, setDynamicShortQuestion] = useState(false)
  const screeningQuestions = useSelector((state: any) => state.screeningQuestions)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const formData = (data: any) => {
    const dynamicShortName = data?.newShortQuestion.split(' ')

    const newData = {
      id: id?.id,
      label: data.newShortQuestion,
      fieldName: dynamicShortName[dynamicShortName?.length - 1],
      field: { type: 'text' },
      isRequired: dynamicShortQuestion,
      applicationType: 'screening',
    }

    setDynamicShortQuestion(false)
    dispatch(addShortQuestion([...screeningQuestions.screeningData, newData]))
    reset()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(formData)} className="form">
        <Label>Question</Label>
        <TextinputContainer placeholder="E.g. What are your strengths?" control={control} name={'newShortQuestion'} />
        <ErrorMessage>
          {errors.newShortQuestion && <span className="error">{ShowError?.newShortQuestion?.message}</span>}
        </ErrorMessage>
        <Mandatory>
          <SwitchContainer checked={dynamicShortQuestion} onClick={(e: any) => setDynamicShortQuestion(e)} />
          Mandatory
        </Mandatory>
        <Buttons>
          <CancelButton>Cancel</CancelButton>
          <SaveButton type="submit" disabled={!isDirty || !isValid} style={{ backgroundColor: activeColor }}>
            Add
          </SaveButton>
        </Buttons>
      </form>
    </div>
  )
}
