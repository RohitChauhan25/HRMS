import { useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'
import { updateValue } from 'store/slice/jobApplicationSwitch'
import { setQuestions } from 'store/slice/JobProfileQuestion'
import { addShortQuestion } from 'store/slice/screeningQuestion'
import { RootState } from 'store/store'
import useGet from 'hooks/useGet'
import usePut from 'hooks/usePut'
import usePost from 'hooks/usePost'
import AddDynamicField from 'components/AddDynamicField'
import Button from 'components/Button'
import TabsContainer from 'components/Tabs'
import Modal from 'components/Modal'
import UseMultiRenderInputs from 'components/MultipleComponents'
import TextApplicationInput from 'views/Jobs/JobApplication/QuestionInput/TextInput'
import ScreeningQuestionData from 'views/Jobs/JobApplication/ScreeningQuestions/ScreeningQuestionData'
import { items } from 'views/Jobs/JobApplication/TabsData'
import PreviewModal from 'views/Modals/PreviewApplicationModal'
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
import { AddNewField } from 'constants/labels'
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

const EditJobApplication = ({ prev, next, getJobData, refetchJobData }: StepperInterface) => {
  const { control } = useForm()
  const { mutateAsync } = usePut()
  const dispatch = useDispatch()
  const { mutateAsync: mutateAsync2 } = usePost()
  const [tab, setTab] = useState<string>('1')
  const [modal, setModal] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [dynamicData, setDynamicData] = useState<DataInterface[]>([])
  const [profileQuestion, setProfileQuestion] = useState([])
  const question = useSelector((state: RootState) => state.JobProfileQuestion)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const firstId = useId()
  const jobPostId = localStorage.getItem('postId')

  const { data: fields, refetch: refetchFields } = useGet('fields', 'job/master/fieldtype', {
    token: true,
  })
  const screeningQuestions = useSelector((state: RootState) => state.screeningQuestions)

  const { data: QuestionData, refetch } = useGet(
    `getprofilequestions${firstId}`,
    `/job/jobAppProfileQuestions/${getJobData?.jobApplication?.id}`,
    {
      token: true,
    },
  )

  const { data: getScreeningQuestions, refetch: screenQuestionsRefetch } = useGet(
    `get-screening-questions${firstId}`,
    `job/master/screeningQuestions`,
    {
      token: true,
    },
  )

  const { data: masterProfileQuestion, refetch: masterRefetch } = useGet(
    `profilequestions${firstId}`,
    'job/master/profilequestions',
    {
      token: true,
    },
  )

  useEffect(() => {
    if (!getJobData?.jobApplication?.id) {
      dispatch(addShortQuestion(getScreeningQuestions))
    }
  }, [getScreeningQuestions])

  const { data: ScreeningQuestion, refetch: refetchScreeningQuestion } = useGet(
    `getScreeninguestion${firstId}`,
    `/job/jobApplication/${getJobData?.jobApplication?.id}`,
    {
      token: true,
    },
  )

  useEffect(() => {
    if (getJobData?.jobApplication?.id) refetch()
  }, [])

  useEffect(() => {
    refetchFields()
    masterRefetch()
    refetchScreeningQuestion()
    screenQuestionsRefetch()
  }, [])

  useEffect(() => {
    if (getJobData?.jobApplication?.id) {
      refetch()
      refetchScreeningQuestion()
    }
  }, [getJobData])

  const toggletab = () => {
    setModal(!modal)
  }

  useEffect(() => {
    refetchFields()
    refetchScreeningQuestion()
    masterRefetch()
    screenQuestionsRefetch()
  }, [])

  useEffect(() => {
    refetch()
    refetchScreeningQuestion()
    screenQuestionsRefetch()
    masterRefetch()
  }, [fields, jobPostId])

  const getField = (id: string) => {
    const findField = fields?.find((data: fieldInterface) => data?.id === id)
    return findField ? findField : {}
  }

  useEffect(() => {
    // get questionId from saved Profile Questions
    const questionId = QuestionData?.profileQuestions?.map((data: SavedPQInterface) => {
      return {
        id: data?.profileQuestionMasterId,
        isRequired: data?.isRequired,
      }
    })

    const screeningData = ScreeningQuestion?.screeningQuestions?.map((data: ISavedScreening) => {
      return {
        fieldDescription: data?.fieldTypeMasterId,
        fieldName: data?.fieldName,
        fieldTypeMasterId: data?.fieldTypeMasterId,
        isRequired: data?.isRequired,
        objectFieldOptions: data?.objectFieldOptions,
        field: getField(data.fieldTypeMasterId),
      }
    })

    const modifiedProfileQuestion = masterProfileQuestion?.map((data: IQuestionData) => {
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

    const modifiedDynamicQuestion = QuestionData?.dynamicProfileQuestions?.map((data: IDynamicFields) => {
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

    if (getJobData?.jobApplication?.id || jobPostId) {
      dispatch(addShortQuestion(screeningData))
    } else {
      dispatch(addShortQuestion(getScreeningQuestions))
    }

    setDynamicData(modifiedDynamicQuestion)
    setProfileQuestion(modifiedProfileQuestion)
    dispatch(setQuestions(modifiedProfileQuestion))
  }, [QuestionData, fields, ScreeningQuestion, getScreeningQuestions])

  const onChange = (key: string) => {
    setTab(key)
  }

  const remove = (index: number) => {
    setDynamicData(dynamicData?.filter((item, ind) => index !== ind))
  }

  const saveAndContinue = async () => {
    const scrinningDataPayload = screeningQuestions?.screeningData?.map((item: PQInterface) => {
      return {
        fieldName: item?.fieldName,
        fieldDescription: item?.fieldDescription ? item?.fieldDescription : 'Add',
        isRequired: item?.isRequired,
        fieldTypeMasterId: item?.fieldTypeMasterId ? item?.fieldTypeMasterId : item?.id,
        objectFieldOptions: JSON.stringify(item?.objectFieldOptions),
      }
    })

    const scrinningQuestionPayload = {
      screeningQuestions: scrinningDataPayload,
    }

    const selectedQestion = question?.newData?.filter((data: PQInterface) => {
      return data?.isSelected === true
    })

    const ProfileQuestion = selectedQestion?.map((item: PQInterface) => {
      return {
        profileQuestionMasterId: item.id,
        isRequired: item.isRequired,
      }
    })

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

    if (getJobData?.jobApplication?.id) {
      mutateAsync({
        url: `/job/jobAppProfileQuestions/${getJobData?.jobApplication?.id}`,
        payload: profileQuestionPayload,
        token: true,
      })
        .then(() =>
          mutateAsync({
            url: `/job/jobAppScreeningQuestions/${getJobData?.jobApplication?.id}`,
            payload: scrinningQuestionPayload,
            token: true,
          })
            .then(() => {
              refetchJobData?.()
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
      mutateAsync2({
        url: `/job/jobAppProfileQuestions/${getJobData?.id}`,
        payload: profileQuestionPayload,
        token: true,
      })
        .then((res) => {
          localStorage.setItem('jobAppId', res.id)
          mutateAsync2({
            url: `/job/jobAppScreeningQuestions/${getJobData?.id}`,
            payload: scrinningQuestionPayload,
            token: true,
          })
            .then(() => {
              notification.success({
                message: '',
                description: 'Job Application is Created successfully',
                duration: 2,
              })
              refetchJobData?.()
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
        {tab === '1' ? (
          <FormContainer>
            <FormTitle>Profile Questions</FormTitle>
            {profileQuestion?.length > 0 && <TextApplicationInput question={question.newData} control={control} />}
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
                  prev?.()
                }}
              >
                Back
              </BackButton>
              <BackButton onClick={next}>Next</BackButton>
              <Buttons>
                <PreviewButton
                  color={activeColor}
                  onClick={() => {
                    setModal(!modal)
                  }}
                >
                  Preview
                </PreviewButton>
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
              <BackButton onClick={prev}>Back</BackButton>
              <Buttons>
                <PreviewButton
                  color={activeColor}
                  onClick={() => {
                    setModal(!modal)
                  }}
                >
                  Preview
                </PreviewButton>
                <BackButton
                  onClick={() => {
                    dispatch(updateValue('1'))
                    next?.()
                  }}
                >
                  Next
                </BackButton>
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
            {profileQuestion?.length > 0 && (
              <TabWrapper color={activeColor}>
                <TabsContainer items={items} onChange={onChange} />
              </TabWrapper>
            )}
          </QuestionsContainer>
          {tab === '1' && (
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

export default EditJobApplication
