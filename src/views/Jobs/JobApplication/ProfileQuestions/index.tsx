import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from 'antd'
import { addNewQuestions, removeIsRequired, removeQuestions, setIsRequired } from 'store/slice/JobProfileQuestion'
import { RootState } from 'store/store'
import SwitchContainer from 'components/Switch'
import { IQuestionData } from 'interfaces'
import {
  TwinComponentWrapper,
  FieldTitle,
  MandatoryTitle,
  TwinTitleWrapper,
  SwitchBox,
} from 'styles/views/Jobs/JobApplication/ProfileQuestions'

const ProfileQuestionsContainer = () => {
  const dispatch = useDispatch()
  const [questionsData, setQuestionsData] = useState<IQuestionData[]>([])
  const question = useSelector((state: RootState) => state?.JobProfileQuestion)

  useEffect(() => {
    setQuestionsData(question?.newData)
  }, [question, question?.newData?.length])

  // handle isRequired.
  const handleSwitch = (e: boolean, item: IQuestionData) => {
    if (e === true) {
      dispatch(setIsRequired(item))
    } else {
      dispatch(removeIsRequired(item))
    }
  }

  // dispatch for handle new Question
  const addQuestions = (item: IQuestionData) => {
    dispatch(addNewQuestions(item))
  }

  // dispatch for remove Question
  const remove = (item: IQuestionData) => {
    dispatch(removeQuestions(item))
  }

  return (
    <>
      <TwinTitleWrapper>
        <FieldTitle>Field Questions</FieldTitle>
        <MandatoryTitle>Mark Mandatory</MandatoryTitle>
      </TwinTitleWrapper>
      {questionsData &&
        questionsData?.map((item: IQuestionData) => {
          return (
            <TwinComponentWrapper key={item.id}>
              {item.isDefault ? (
                <Checkbox checked={true}>{item?.fieldName}</Checkbox>
              ) : item?.isSelected ? (
                <Checkbox
                  key={`${item.isSelected}`}
                  onChange={(e) => {
                    if (e.target.checked) {
                      addQuestions(item)
                    } else {
                      remove(item)
                    }
                  }}
                  defaultChecked={item?.isSelected ? true : false}
                >
                  {item?.fieldName}
                </Checkbox>
              ) : (
                <Checkbox
                  key={`${item.isSelected}`}
                  onChange={(e) => {
                    if (e.target.checked) {
                      addQuestions(item)
                    } else {
                      remove(item)
                    }
                  }}
                  defaultChecked={item?.isSelected ? true : false}
                >
                  {item?.fieldName}
                </Checkbox>
              )}
              <SwitchBox key={item.id}>
                {item?.isRequired ? (
                  <SwitchContainer
                    key={item.isRequired}
                    size="small"
                    defaultChecked={true}
                    onClick={(e: boolean) => handleSwitch(e, item)}
                    disabled={item?.isDefault}
                  />
                ) : (
                  <SwitchContainer
                    key={item.isRequired}
                    onClick={(e: boolean) => handleSwitch(e, item)}
                    defaultChecked={false}
                    name={item?.fieldName}
                    disabled={item?.isDefault || !item.isSelected}
                  />
                )}
              </SwitchBox>
            </TwinComponentWrapper>
          )
        })}
    </>
  )
}

export default ProfileQuestionsContainer
