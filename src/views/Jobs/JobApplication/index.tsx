import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'
import { updateValue } from 'store/slice/jobApplicationSwitch'
import { setQuestions } from 'store/slice/JobProfileQuestion'
import { addShortQuestion } from 'store/slice/screeningQuestion'
import { RootState } from 'store/store'
import usePost from 'hooks/usePost'
import usePut from 'hooks/usePut'
import useGet from 'hooks/useGet'
import { AddNewField } from 'constants/labels'
import Button from 'components/Button'
import TabsContainer from 'components/Tabs'
import Modal from 'components/Modal'
import AddDynamicField from 'components/AddDynamicField'
import UseMultiRenderInputs from 'components/MultipleComponents'
import { items } from 'views/Jobs/JobApplication/TabsData'
import PreviewModal from 'views/Modals/PreviewApplicationModal'
import ScreeningQuestionData from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionData'
import TextApplicationInput from 'views/Jobs/JobApplication/QuestionInput/TextInput'
import { DataInterface } from 'interfaces/dynamicFieldModal'
import {
  IDynamicFields,
  IQuestionData,
  IQuestionId,
  ISavedScreening,
  PQInterface,
  SavedPQInterface,
  StepperInterface,
  fieldInterface,
} from 'interfaces'
import CancelIcon from 'assets/svg/CancelIcon'
import {
  FormContainer,
  Buttons,
  SaveButton,
  MainContainer,
  ScreeningFormContainer,
} from 'styles/views/Jobs/JobPostForm'
import {
  ButtonGroup,
  BackButton,
  PreviewButton,
  FormTitle,
  JobQuestionTitle,
  TabWrapper,
  QuestionsContainer,
  RightSideContent,
  TextField,
} from 'styles/views/Jobs/JobApplication'

const JobApplication = ({ prev, next }: StepperInterface) => {
  const { control } = useForm()
  const dispatch = useDispatch()
  const { mutateAsync } = usePost()
  const [modal, setModal] = useState(false)
  const jobPostId = useSelector((state: RootState) => state.JobPostData.id)
  const [showModal, setShowModal] = useState(false)
  const [dynamicData, setDynamicData] = useState<DataInterface[]>([])
  const question = useSelector((state: RootState) => state.JobProfileQuestion)
  const { mutateAsync: mutateAsync2 } = usePut()
  const screeningQuestions = useSelector((state: RootState) => state.screeningQuestions)
  const questionComponentChange = useSelector((state: RootState) => state.jobApplicationSwitch)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const jobAppId = localStorage.getItem('jobAppId')

  const { data: fields, refetch: refetchFields } = useGet('fields', 'job/master/fieldtype', {
    token: true,
  })
  const { data: QuestionData, refetch } = useGet('profilequestions', 'job/master/profilequestions', { token: true })

  const toggletab = () => {
    setModal(!modal)
  }

  // get screening questions
  const { data: getScreeningQuestions, refetch: screenQuestionsRefetch } = useGet(
    'get-screening-questions',
    `job/master/screeningQuestions`,
    {
      token: true,
    },
  )

  // get already added screening questions in job post
  const { data: SaveScreeningQuestion, refetch: refetchScreeningQuestion } = useGet(
    'getScreeninguestions',
    `/job/jobApplication/${jobAppId}`,
    {
      token: true,
    },
  )

  // get already added Profile questions in job post
  const { data: savedQuestion, refetch: refetchSaveQuestion } = useGet(
    'getprofilequestions',
    `/job/jobAppProfileQuestions/${jobAppId}`,
    {
      token: true,
    },
  )

  const getField = (id: string) => {
    const findField = fields?.find((data: fieldInterface) => data?.id === id)
    return findField ? findField : {}
  }

  useEffect(() => {
    if (jobAppId) {
      // get questionId from saved Profile Questions
      const questionId = savedQuestion?.profileQuestions?.map((data: SavedPQInterface) => {
        return {
          id: data?.profileQuestionMasterId,
          isRequired: data?.isRequired,
        }
      })

      // modified screening data according to defualt screening data
      const screeningData = SaveScreeningQuestion?.screeningQuestions?.map((data: ISavedScreening) => {
        return {
          fieldDescription: data?.fieldTypeMasterId,
          fieldName: data?.fieldName,
          fieldTypeMasterId: data?.fieldTypeMasterId,
          isRequired: data?.isRequired,
          objectFieldOptions: data?.objectFieldOptions,
          field: getField(data.fieldTypeMasterId),
        }
      })

      dispatch(addShortQuestion(screeningData))

      // modified dynamic questions data according to defualt dynamic Questions data
      const modifiedDynamicQuestion = savedQuestion?.dynamicProfileQuestions?.map((data: IDynamicFields) => {
        return {
          name: data?.fieldName,
          placeHolder: data?.field?.placeHolder,
          type: data?.field?.type,
          isMandatory: data?.isRequired,
          id: data?.field?.id,
          icon: '',
          option: data?.objectFieldOptions ? JSON.parse(data.objectFieldOptions) : null,
        }
      })

      // modified  profile questions data according to defualt cProfile Questions data
      const modifiedProfileQuestion = QuestionData?.map((data: IQuestionData) => {
        const found = questionId?.find((item: IQuestionId) => item.id === data.id)
        if (found) {
          return {
            ...data,
            isRequired: found?.isRequired,
            isSelected: true,
          }
        } else {
          if (data?.isDefault)
            return {
              ...data,
              isDisabled: true,
            }
          else {
            return {
              ...data,
            }
          }
        }
      })

      setDynamicData(modifiedDynamicQuestion)
      dispatch(setQuestions(modifiedProfileQuestion))
    } else {
      dispatch(addShortQuestion(getScreeningQuestions))
      if (QuestionData?.length > 0) {
        const modifiedQuestion = QuestionData?.map((data: IQuestionData) => {
          if (data?.isDefault)
            return {
              ...data,
              isDisabled: true,
              isSelected: true,
            }
          else {
            return {
              ...data,
              isSelected: false,
            }
          }
        })
        dispatch(setQuestions(modifiedQuestion))
      }
    }
  }, [QuestionData, savedQuestion, getScreeningQuestions])

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    refetchSaveQuestion()
    refetchScreeningQuestion()
    screenQuestionsRefetch()
    refetchFields()
  }, [jobAppId])

  const onChange = (key: string) => {
    dispatch(updateValue(key))
  }

  const remove = (index: number) => {
    setDynamicData(dynamicData?.filter((_, ind) => index !== ind))
  }

  const saveAndContinue = async () => {
    const scrinningDataPayload = screeningQuestions?.screeningData?.map((item: PQInterface) => {
      return {
        fieldName: item?.fieldName,
        fieldDescription: item?.fieldDescription ? item?.fieldDescription : 'Add',
        isRequired: item?.isRequired ? true : false,
        fieldTypeMasterId: item?.fieldTypeMasterId ? item?.fieldTypeMasterId : item?.id,
        objectFieldOptions: JSON.stringify(item?.options),
      }
    })

    const scrinningQuestionPayload = {
      screeningQuestions: scrinningDataPayload?.length > 0 ? scrinningDataPayload : [],
    }

    const selectedQestion = question?.newData?.filter((data: PQInterface) => {
      return data?.isSelected === true
    })

    // create ProfileQuestion data for payoad
    const ProfileQuestion = selectedQestion?.map((item: PQInterface) => {
      return {
        profileQuestionMasterId: item.id,
        isRequired: item.isRequired,
      }
    })

    // create dynamic data for payoad
    const dynamicDataPayload = dynamicData?.map((item) => {
      if (item?.option) {
        return {
          fieldName: item?.name,
          fieldDescription: item?.label,
          isRequired: item?.isMandatory ? true : false,
          fieldTypeMasterId: item?.id,
          objectFieldOptions: JSON.stringify(item?.option),
        }
      } else {
        return {
          fieldName: item?.name,
          fieldDescription: item?.label ? item?.label : '',
          isRequired: item?.isMandatory ? true : false,
          fieldTypeMasterId: item?.id,
        }
      }
    })

    const profileQuestionPayload = {
      profileQuestions: ProfileQuestion,
      dynamicProfileQuestions: dynamicDataPayload,
    }

    if (jobAppId) {
      mutateAsync2({
        url: `/job/jobAppProfileQuestions/${jobAppId}`,
        payload: profileQuestionPayload,
        token: true,
      })
        .then(() =>
          mutateAsync2({
            url: `/job/jobAppScreeningQuestions/${jobAppId}`,
            payload: scrinningQuestionPayload,
            token: true,
          })
            .then(() => {
              notification.success({
                message: '',
                description: 'Job Application is updated successfully',
                duration: 2,
              })
              refetchScreeningQuestion()
              next?.()
            })
            .catch((error) =>
              notification.error({
                message: '',
                description: error?.response?.data?.message,
                duration: 2,
              }),
            ),
        )
        .catch((error) =>
          notification.error({
            message: '',
            description: error?.response?.data?.message,
            duration: 2,
          }),
        )
    } else {
      mutateAsync({
        url: `/job/jobAppProfileQuestions/${jobPostId}`,
        payload: profileQuestionPayload,
        token: true,
      })
        .then((res1) => {
          localStorage.setItem('jobAppId', res1.id)
          mutateAsync({
            url: `/job/jobAppScreeningQuestions/${jobPostId}`,
            payload: scrinningQuestionPayload,
            token: true,
          })
            .then(() => {
              notification.success({
                message: '',
                description: 'Job Application is Created successfully',
                duration: 2,
              })
              next?.()
            })
            .catch((error) =>
              notification.error({
                message: '',
                description: error?.response?.data?.message,
                duration: 2,
              }),
            )
        })
        .catch((error) =>
          notification.error({
            message: '',
            description: error?.response?.data?.message,
            duration: 2,
          }),
        )
    }
  }

  return (
    <>
      <MainContainer>
        {questionComponentChange?.value === '1' ? (
          <FormContainer>
            <FormTitle>Profile Questions</FormTitle>
            <TextApplicationInput question={question.newData} control={control} />
            {dynamicData?.map((item, index) => {
              return (
                <TextField key={index}>
                  <UseMultiRenderInputs item={item} disabled={true} />
                  <CancelIcon onClick={() => remove(index)} />
                </TextField>
              )
            })}

            <ButtonGroup>
              <BackButton
                onClick={() => {
                  dispatch(updateValue('1'))
                  prev?.()
                }}
              >
                Back
              </BackButton>
              <Buttons>
                <PreviewButton
                  color={activeColor}
                  onClick={() => {
                    setModal(!modal)
                  }}
                >
                  Preview
                </PreviewButton>
                {jobAppId && <BackButton onClick={next}>Next</BackButton>}
                <SaveButton onClick={() => saveAndContinue()} style={{ backgroundColor: activeColor }}>
                  Save & Continue
                </SaveButton>
              </Buttons>
            </ButtonGroup>
          </FormContainer>
        ) : (
          <ScreeningFormContainer>
            <FormTitle>Screening Questions</FormTitle>
            <ScreeningQuestionData />
            <ButtonGroup>
              <BackButton
                onClick={() => {
                  dispatch(updateValue('1'))
                  prev?.()
                }}
              >
                Back
              </BackButton>
              <Buttons>
                <PreviewButton
                  color={activeColor}
                  onClick={() => {
                    setModal(!modal)
                  }}
                >
                  Preview
                </PreviewButton>
                {jobAppId && <BackButton onClick={next}>Next</BackButton>}
                <SaveButton onClick={() => saveAndContinue()} style={{ backgroundColor: activeColor }}>
                  Save & Continue
                </SaveButton>
              </Buttons>
            </ButtonGroup>
          </ScreeningFormContainer>
        )}
        <RightSideContent>
          <QuestionsContainer>
            <JobQuestionTitle>Job Application Questions</JobQuestionTitle>
            <TabWrapper color={activeColor}>
              <TabsContainer items={items} onChange={onChange} />
            </TabWrapper>
          </QuestionsContainer>
          {questionComponentChange?.value === '1' && (
            <Button
              label={AddNewField}
              variant="contained"
              className="AddNewField"
              onClick={() => setShowModal(true)}
              style={{ backgroundColor: activeColor }}
            />
          )}
        </RightSideContent>
      </MainContainer>

      <Modal isOpen={showModal} className="previewmodal">
        <AddDynamicField
          toggle={showModal}
          setToggle={setShowModal}
          setFromData={setDynamicData}
          dynamicData={dynamicData}
        />
      </Modal>

      <Modal isOpen={modal} className="previewmodal">
        <PreviewModal
          toggle={toggletab}
          profileQuestion={question?.newData}
          dynamicField={dynamicData}
          screeningQuestions={screeningQuestions}
        />
      </Modal>
    </>
  )
}

export default JobApplication
