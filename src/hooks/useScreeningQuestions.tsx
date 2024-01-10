import { useState } from 'react'
import { CheckBoxQuestion } from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionInputs/CheckBoxQuestion'
import { FileUpload } from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionInputs/FileUpload'
import { LongQuestion } from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionInputs/LongQuestions'
import { MultipleChoiceQuestion } from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionInputs/MultiChoiceQuestion'
import { RadioQuestion } from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionInputs/RadioQuestion'
import { ShortQuestion } from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionInputs/ShortQuestion'

export const useFormFieldsToQuestions = () => {
  const [screeningQuestions, setScreeningQuestions] = useState([])

  function mapFormFieldsToQuestions(formFields: any) {
    const newQuestions = formFields?.map((field: any, index: number) => {
      let content
      switch (field.type) {
        case 'text':
          content = <ShortQuestion id={field?.id} />
          break
        case 'textarea':
          content = <LongQuestion id={field?.id} />
          break
        case 'select':
          content = <MultipleChoiceQuestion id={field?.id} />
          break
        case 'radio':
          content = <RadioQuestion label1="True" label2="False" id={field?.id} />
          break
        case 'checkbox':
          content = <CheckBoxQuestion id={field?.id} />
          break
        case 'file':
          content = <FileUpload id={field?.id} />
          break
        default:
      }

      return {
        id: field?.id,
        type: field?.type,
        key: index + 1,
        header: field?.label,
        content: content,
      }
    })

    setScreeningQuestions(newQuestions || [])
  }

  return {
    screeningQuestions,
    mapFormFieldsToQuestions,
  }
}
