import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import usePost from 'hooks/usePost'
import useGet from 'hooks/useGet'
import { PlaceHolder } from 'constants/placeholderData'
import { Cancel, Submit } from 'constants/labels'
import { AddScreenQuestions } from 'utils/validators/addScreeningQuestions'
import SelectContainer from 'components/Select'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import AntCheckbox from 'components/AntCheckbox'
import TextareaContainer from 'components/TextArea'
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

const AddProfileQuestionModal = ({ showModal, screenQuestionsRefetch }: IModalProps) => {
  const { mutateAsync } = usePost()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddScreenQuestions),
    defaultValues: { fieldName: '', type: '', fieldDescription: '' },
  })

  const { data: fieldTypeMasterData, refetch: refetchfieldTypeMasterData } = useGet(
    'screen-questions',
    `/job/fieldTypeMaster`,
    {
      token: true,
    },
  )

  const formFieldTypes = fieldTypeMasterData?.map((data: any) => ({
    value: data?.id,
    label: data?.type,
  }))

  useEffect(() => {
    refetchfieldTypeMasterData()
  }, [])

  const submitData = async (data: any) => {
    const payload = {
      fieldName: data?.fieldName,
      fieldTypeMasterId: data?.type,
      fieldDescription: data?.fieldDescription,
      isDefault: data?.isDefault,
      isRequired: data?.isRequired,
      canDelete: data?.canDelete,
    }

    try {
      const response = await mutateAsync({
        url: 'job/master/screeningQuestions',
        payload,
        token: true,
      })
      if (response) {
        if (screenQuestionsRefetch) {
          screenQuestionsRefetch()
        }

        notification.success({
          message: 'Screening Question Added',
          description: 'Your Screen Question has been added successfully!',
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

  return (
    <ModalWrapper>
      <ContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Add Screening Question</HeadingWrapper>
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <EmployeeFormWrapper>
            <InputWrapper>
              <Label>fieldName*</Label>
              <TextinputContainer placeholder={PlaceHolder.inputPlaceholder} control={control} name="fieldName" />
              <ErrorMessage>{errors?.fieldName?.message}</ErrorMessage>
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
              <Label>fieldDescription*</Label>
              <TextareaContainer placeholder="write field description" name="fieldDescription" control={control} />
              <ErrorMessage>{errors?.fieldDescription?.message}</ErrorMessage>
            </InputWrapper>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
              <AntCheckbox control={control} name="isDefault" label="isDefault" handleChange={() => undefined} />
              <AntCheckbox control={control} name="isRequired" label="isRequired" handleChange={() => undefined} />
              <AntCheckbox control={control} name="canDelete" label="canDelete" handleChange={() => undefined} />
            </div>
          </EmployeeFormWrapper>
          <ButtonWrapper>
            <Button label={Cancel} variant="text" type="reset" onClick={() => showModal(false)} className="cancel" />
            <Button label={Submit} type="submit" variant="contained" />
          </ButtonWrapper>
        </FormWrapper>
      </ContentContainer>
    </ModalWrapper>
  )
}

export default AddProfileQuestionModal
