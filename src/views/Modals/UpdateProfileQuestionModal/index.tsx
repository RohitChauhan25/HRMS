import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notification } from 'antd'
import usePut from 'hooks/usePut'
import { Cancel, Submit } from 'constants/labels'
import { PlaceHolder } from 'constants/placeholderData'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import SelectContainer from 'components/Select'
import { formFieldTypes } from 'views/Modals/formFieldsData/formFields'
import { IModalProps } from 'interfaces'
import { ErrorMessage } from 'styles/components/Modal'
import {
  ModalWrapper,
  ContentContainer,
  HeadingContainer,
  HeadingWrapper,
  ButtonWrapper,
  FormWrapper,
  EmployeeFormWrapper,
  InputWrapper,
  Label,
} from 'styles/pages/Master'

const UpdateProfileQuestionsModal = ({ showModal, updateQuestion, id, screenQuestionsRefetch }: IModalProps) => {
  const { mutateAsync } = usePut()
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { label: '', type: '', icon: '', placeholder: '' },
  })

  const submitData = async (data: any) => {
    const placeHolder = data?.placeholder?.length ? data?.placeholder : null
    const payload = {
      label: data?.label,
      type: data?.type,
      icon: data?.icon,
      placeHolder: placeHolder,
    }

    try {
      const response = await mutateAsync({
        url: `job/jobAppProfileQuestions/${id}`,
        payload,
        token: true,
      })
      if (response) {
        if (screenQuestionsRefetch) {
          screenQuestionsRefetch()
        }

        notification.success({
          message: 'Screening Question Updated',
          description: 'Your Screen Question has been Updated successfully!',
        })

        showModal(false)
      }
    } catch (error: any) {
      if (error?.response?.data?.statusCode) {
        notification.error({
          message: '',
          description: error?.response?.data?.message,
          duration: 2,
        })
      }
    }
  }

  useEffect(() => {
    setValue('label', updateQuestion?.label ?? '')
    setValue('type', updateQuestion?.type ?? '')
    setValue('icon', updateQuestion?.icon ?? '')
    setValue('placeholder', updateQuestion?.placeHolder ?? '')
  }, [updateQuestion])

  return (
    <ModalWrapper>
      <ContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Add Screening Question</HeadingWrapper>
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <EmployeeFormWrapper>
            <InputWrapper>
              <Label>Label</Label>
              <TextinputContainer placeholder={PlaceHolder.inputPlaceholder} control={control} name="label" />
              <ErrorMessage>{errors?.label?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Label> Type*</Label>
              <SelectContainer
                control={control}
                name="type"
                placeholder={PlaceHolder?.defaultOption}
                options={formFieldTypes}
              />
              <ErrorMessage>{errors?.type?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Label>Icon</Label>
              <TextinputContainer placeholder={PlaceHolder.inputPlaceholder} control={control} name="icon" />
              <ErrorMessage>{errors?.icon?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Label>PlaceHolder</Label>
              <TextinputContainer placeholder={PlaceHolder.inputPlaceholder} control={control} name="placeholder" />
              <ErrorMessage>{errors?.placeholder?.message}</ErrorMessage>
            </InputWrapper>
          </EmployeeFormWrapper>
          {/* <TextinputContainer placeholder={PlaceHolder.experiencePlaceholder} control={control} name="question" />
          <ErrorMessage>{errors?.question?.message}</ErrorMessage> */}
          <ButtonWrapper>
            <Button label={Cancel} variant="text" type="reset" onClick={() => showModal(false)} className="cancel" />
            <Button label={Submit} type="submit" variant="contained" />
          </ButtonWrapper>
        </FormWrapper>
      </ContentContainer>
    </ModalWrapper>
  )
}

export default UpdateProfileQuestionsModal
