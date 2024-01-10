import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'antd'
import { addShortQuestion } from 'store/slice/screeningQuestion'
import CheckboxContainer from 'components/Checkbox'
import SwitchContainer from 'components/Switch'
import TextinputContainer from 'components/TextInput'
import AddIcon from 'assets/svg/AddIcon'
import Cancel from 'assets/svg/CancelIcon'
import { Buttons, ErrorMessage } from 'styles/components/Modal'
import { AddOption, Checklabel, Mandatory, Response } from 'styles/views/Jobs/JobApplication/ScreeningQuestions'
import { Label, CancelButton, SaveButton } from 'styles/views/Jobs/JobPostForm'

export const MultipleChoiceQuestion = (id: any) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({})
  const { append, fields, remove } = useFieldArray({
    name: 'multipleChoiceOption',
    control,
  })
  const screeningQuestions = useSelector((state: any) => state.screeningQuestions)
  const dispatch = useDispatch()
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([{ label: '', value: '' }])
  const [dynamicMultipleChoiceQuestion, setDynamicMultipleChoiceQuestion] = useState(false)
  const [otherOption, setOtherOption] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const handleOptions = (e: any, index: number) => {
    setValue(`multipleChoiceOption.${index}.label`, e.target.value)
    setValue(`multipleChoiceOption.${index}.value`, e.target.value)
    const value = getValues()
    setMultipleChoiceOptions(value.multipleChoiceOption)
  }
  const handleOtherVal = (e: any) => {
    if (e.target.checked === true) {
      setMultipleChoiceOptions([...multipleChoiceOptions, { label: 'other', value: 'other' }])
    }
  }
  const ShowError: any = errors
  const formData = (data: any) => {
    const dynamicMultiName = data?.newMultipleChoiceQuestion?.split(' ')
    const newData = {
      id: id?.id,
      label: data.newMultipleChoiceQuestion,
      fieldName: dynamicMultiName[dynamicMultiName?.length - 1],
      field: { type: 'multi-select' },
      isRequired: dynamicMultipleChoiceQuestion,
      options: multipleChoiceOptions,
      applicationType: 'screening',
    }
    setOtherOption(false)
    setDynamicMultipleChoiceQuestion(false)
    dispatch(addShortQuestion([...screeningQuestions.screeningData, newData]))
    setMultipleChoiceOptions([{ label: '', value: '' }])
    fields.length = 0
    reset()
  }

  return (
    <form onSubmit={handleSubmit(formData)} className="form">
      <Label>Question</Label>
      <TextinputContainer
        placeholder="E.g. What are your strengths?"
        control={control}
        name={'newMultipleChoiceQuestion'}
      />
      <ErrorMessage>
        {errors.newMultipleChoiceQuestion && (
          <span className="error">{ShowError?.newMultipleChoiceQuestion?.message}</span>
        )}
      </ErrorMessage>
      <Label>Response Options</Label>
      {fields.map((field, index) => {
        return (
          <Response key={field.id}>
            <Input
              placeholder="E.g. What are your strengths?"
              onChange={(e) => handleOptions(e, index)}
              name={'multipleChoiceOptions'}
            />
            <Cancel onClick={() => remove(index)} />
          </Response>
        )
      })}
      <AddOption>
        <AddIcon
          onClick={() =>
            append({
              label: '',
              value: '',
            })
          }
        />
        Add Option
      </AddOption>
      <Checklabel>
        <CheckboxContainer
          label="Add “other” answer and follow up question"
          checked={otherOption}
          onChange={(e) => {
            handleOtherVal(e), setOtherOption(e.target.checked)
          }}
        />
      </Checklabel>
      <Mandatory>
        <SwitchContainer
          checked={dynamicMultipleChoiceQuestion}
          onClick={(e: any) => setDynamicMultipleChoiceQuestion(e)}
        />
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
