import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import usePost from 'hooks/usePost'
import useGet from 'hooks/useGet'
import { PlaceHolder } from 'constants/placeholderData'
import { Cancel, Submit } from 'constants/labels'
import { AddProfileQuestionSchema } from 'utils/validators/addProfileQuestionSchema'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import SelectContainer from 'components/Select'
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

const AddJobProfileQuestionModal = ({ showModal, profileQuestionsRefetch }: IModalProps) => {
  const { mutateAsync } = usePost()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddProfileQuestionSchema),
    defaultValues: {
      fieldName: '',
      type: '',
      fieldDescription: '',
      isDefault: false,
      isRequired: false,
      canDelete: false,
    },
  })

  const { data: fieldTypeMasterData, refetch: refetchfieldTypeMasterData } = useGet(
    'screen-questions',
    `job/master/fieldType`,
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
    // profileQuestionsRefetch
  }, [])

  const submitData = async (data: any) => {
    const payload = {
      fieldName: data?.fieldName,
      fieldDescription: data?.fieldDescription,
      fieldTypeMasterId: data?.type,
      isDefault: data?.isDefault,
      isRequired: data?.isRequired,
      canDelete: data?.canDelete,
      objectFieldOptions: null,
    }

    try {
      const response = await mutateAsync({
        url: 'job/master/profilequestions',
        payload,
        token: true,
      })
      if (response) {
        if (profileQuestionsRefetch) {
          profileQuestionsRefetch()
        }

        notification.success({
          message: 'Job Application Question Added',
          description: 'Job Application Question added successfully!',
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
          <HeadingWrapper>Add Job Profile Question</HeadingWrapper>
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <EmployeeFormWrapper>
            <InputWrapper>
              <Label>Field Name*</Label>
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
              <Label>Field Description*</Label>
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
            <Button label={Submit} type="submit" variant="contained" style={{ backgroundColor: activeColor }} />
          </ButtonWrapper>
        </FormWrapper>
      </ContentContainer>
    </ModalWrapper>
  )
}

export default AddJobProfileQuestionModal
