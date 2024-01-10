import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import { PlaceHolder } from 'constants/placeholderData'
import { Cancel, Submit } from 'constants/labels'
import { UpdateProfileQuestionSchema } from 'utils/validators/addProfileQuestionSchema'
import usePut from 'hooks/usePut'
import useGet from 'hooks/useGet'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import AntCheckbox from 'components/AntCheckbox'
import SelectContainer from 'components/Select'
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
  CheckBoxWrapper,
} from 'styles/pages/Master'

const UpdateJobProfileQuestionsModal = ({
  showModal,
  updateProfileQuestion,
  id,
  profileQuestionsRefetch,
}: IModalProps) => {
  const { mutateAsync } = usePut()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  //Getting field type
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
  }, [])

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(UpdateProfileQuestionSchema),
    defaultValues: {
      fieldName: '',
      type: '',
      fieldDescription: '',
      isDefault: false,
      isRequired: false,
      canDelete: false,
    },
  })

  const submitData = async (data: any) => {
    const payload = {
      fieldName: data?.fieldName,
      fieldTypeMasterId: data?.type,
      fieldDescription: data?.fieldDescription,
      objectFieldOptions: data?.objectFieldOptions,
      isDefault: data?.isDefault,
      isRequired: data?.isRequired,
      // canDelete: data?.canDelete,
      canDelete: data?.canDelete ? data?.canDelete : false,
    }
    try {
      const response = await mutateAsync({
        url: `job/master/profilequestions/${id}`,
        payload,
        token: true,
      })
      if (response) {
        if (profileQuestionsRefetch) {
          profileQuestionsRefetch()
        }

        notification.success({
          message: 'Profile Question Updated',
          description: 'Profile question updated successfully!',
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
    setValue('fieldName', updateProfileQuestion?.fieldName ?? '')
    setValue('type', updateProfileQuestion?.type ?? '')
    setValue('fieldDescription', updateProfileQuestion?.fieldDescription ?? '')
    setValue('type', updateProfileQuestion?.fieldTypeMasterId ?? '')
  }, [updateProfileQuestion])

  return (
    <ModalWrapper>
      <ContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Edit Profile Question</HeadingWrapper>
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
              <Label>Description*</Label>
              <TextinputContainer
                placeholder={PlaceHolder.inputPlaceholder}
                control={control}
                name="fieldDescription"
              />
              <ErrorMessage>{errors?.fieldDescription?.message}</ErrorMessage>
            </InputWrapper>

            <CheckBoxWrapper>
              <AntCheckbox
                name="isDefault"
                label="isDefault"
                control={control}
                isDefault={updateProfileQuestion?.isDefault}
              />
              <AntCheckbox
                name="isRequired"
                label="isRequired"
                control={control}
                isRequired={updateProfileQuestion?.isRequired}
              />
              {!updateProfileQuestion?.isDefault && (
                <AntCheckbox
                  name="canDelete"
                  label="canDelete"
                  control={control}
                  canDelete={updateProfileQuestion?.canDelete}
                />
              )}
            </CheckBoxWrapper>
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

export default UpdateJobProfileQuestionsModal
