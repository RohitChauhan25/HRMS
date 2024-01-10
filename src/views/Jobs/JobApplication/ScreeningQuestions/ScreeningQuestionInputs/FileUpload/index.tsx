import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { addShortQuestion } from 'store/slice/screeningQuestion'
import { FILE_QUESTION } from 'utils/validators/screeningQuestionSchema'
import TextinputContainer from 'components/TextInput'
import SwitchContainer from 'components/Switch'
import { Buttons, ErrorMessage } from 'styles/components/Modal'
import { Mandatory } from 'styles/views/Jobs/JobApplication/ScreeningQuestions'
import { Label, CancelButton, SaveButton } from 'styles/views/Jobs/JobPostForm'

export const FileUpload = (id: any) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(FILE_QUESTION) })
  const screeningQuestions = useSelector((state: any) => state.screeningQuestions)
  const dispatch = useDispatch()
  const [dynamicFileQuestion, setDynamicFileQuestion] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const ShowError: any = errors
  const formData = (data: any) => {
    const dynamicFileName = data?.newFileQuestion?.split(' ')
    const newData = {
      id: id?.id,
      label: data?.newFileQuestion,
      fieldName: dynamicFileName[dynamicFileName.length - 1],
      field: { type: 'file' },
      isRequired: dynamicFileQuestion,
      applicationType: 'screening',
    }
    setDynamicFileQuestion(false)
    dispatch(addShortQuestion([...screeningQuestions.screeningData, newData]))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(formData)} className="form">
      <Label>Question</Label>
      <TextinputContainer placeholder="E.g. What are your strengths?" control={control} name={'newFileQuestion'} />
      <ErrorMessage>
        {errors.newFileQuestion && <span className="error">{ShowError?.newFileQuestion?.message}</span>}
      </ErrorMessage>
      <Mandatory>
        <SwitchContainer checked={dynamicFileQuestion} onClick={(e: any) => setDynamicFileQuestion(e)} />
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
