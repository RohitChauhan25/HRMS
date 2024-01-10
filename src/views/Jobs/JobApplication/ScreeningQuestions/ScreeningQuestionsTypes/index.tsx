import { ShortQuestion } from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionInputs/ShortQuestion'
import { LongQuestion } from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionInputs/LongQuestions'
import { MultipleChoiceQuestion } from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionInputs/MultiChoiceQuestion'
import { RadioQuestion } from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionInputs/RadioQuestion'
import { CheckBoxQuestion } from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionInputs/CheckBoxQuestion'
import { FileUpload } from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionInputs/FileUpload'

export const ScreeningQuestionsTypes = [
  {
    key: 1,
    header: 'Short Answer',
    content: <ShortQuestion />,
  },
  {
    key: 2,
    header: 'Long Answer',
    content: <LongQuestion />,
  },
  {
    key: 3,
    header: 'Multiple Choice',
    content: <MultipleChoiceQuestion />,
  },
  {
    key: 4,
    header: 'Yes/No',
    content: <RadioQuestion label1="Yes" label2="No" />,
  },
  {
    key: 5,
    header: 'Checkbox',
    content: <CheckBoxQuestion />,
  },
  {
    key: 6,
    header: 'File Upload',
    content: <FileUpload />,
  },
]

export const KnockoutQuestionsTypes = [
  {
    key: 1,
    header: 'Yes/No',
    content: <RadioQuestion label1="Yes" label2="No" />,
  },
  {
    key: 2,
    header: 'True/False',
    content: <RadioQuestion label1="True" label2="False" />,
  },
  {
    key: 3,
    header: 'Multiple Choice',
    content: <MultipleChoiceQuestion />,
  },
]
