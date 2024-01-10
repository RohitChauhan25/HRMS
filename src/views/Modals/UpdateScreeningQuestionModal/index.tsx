import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import usePut from 'hooks/usePut'
import useGet from 'hooks/useGet'
import { PlaceHolder } from 'constants/placeholderData'
import { Cancel, Submit } from 'constants/labels'
import { AddScreenQuestions } from 'utils/validators/addScreeningQuestions'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import SelectContainer from 'components/Select'
import TextareaContainer from 'components/TextArea'
import AntCheckbox from 'components/AntCheckbox'
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

const UpdateScreeningQuestionsModal = ({ showModal, updateQuestion, id, screenQuestionsRefetch }: IModalProps) => {
  const { mutateAsync } = usePut()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddScreenQuestions),
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
      isDefault: data?.isDefault ? data?.isDefault : false,
      isRequired: data?.isRequired ? data?.isRequired : false,
      canDelete: data?.canDelete ? data?.canDelete : false,
    }

    try {
      const response = await mutateAsync({
        url: `job/master/screeningQuestions/${id}`,
        payload,
        token: true,
      })
      if (response) {
        if (screenQuestionsRefetch) {
          screenQuestionsRefetch()
        }

        notification.success({
          message: 'Screening Question Updated',
          description: 'Your Screening Question has been Updated successfully!',
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

  const { data: fieldTypeMasterData, refetch: refetchfieldTypeMasterData } = useGet(
    'screen-questions',
    `/job/master/fieldtype`,
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
  useEffect(() => {
    setValue('fieldName', updateQuestion?.fieldName ?? '')
    setValue('type', updateQuestion?.fieldTypeMasterId ?? '')
    setValue('fieldDescription', updateQuestion?.fieldDescription ?? '')
    setValue('isDefault', updateQuestion?.isDefault ?? false)
    setValue('isRequired', updateQuestion?.isRequired ?? false)
    setValue('canDelete', updateQuestion?.canDelete ?? false)
  }, [updateQuestion])

  return (
    <ModalWrapper>
      <ContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Edit Screening Question</HeadingWrapper>
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <EmployeeFormWrapper>
            <InputWrapper>
              <Label>Field Name*</Label>
              <TextinputContainer placeholder={PlaceHolder.inputPlaceholder} control={control} name="fieldName" />
              <ErrorMessage>{errors?.fieldName?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Label>Type*</Label>
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
              <TextareaContainer
                placeholder="write field description"
                name="fieldDescription"
                control={control}
                className="description-area"
              />
              <ErrorMessage>{errors?.fieldDescription?.message}</ErrorMessage>
            </InputWrapper>
            <CheckBoxWrapper>
              <AntCheckbox name="isDefault" label="isDefault" control={control} isDefault={updateQuestion?.isDefault} />
              <AntCheckbox
                name="isRequired"
                label="isRequired"
                control={control}
                isRequired={updateQuestion?.isRequired}
              />
              {!updateQuestion?.isDefault && (
                <AntCheckbox
                  name="canDelete"
                  label="canDelete"
                  control={control}
                  canDelete={updateQuestion?.canDelete}
                />
              )}
            </CheckBoxWrapper>
          </EmployeeFormWrapper>
          {/* <TextinputContainer placeholder={PlaceHolder.experiencePlaceholder} control={control} name="question" />
          <ErrorMessage>{errors?.question?.message}</ErrorMessage> */}
          <ButtonWrapper>
            <Button label={Cancel} variant="text" type="reset" onClick={() => showModal(false)} className="cancel" />
            <Button label={Submit} type="submit" variant="contained" style={{ backgroundColor: activeColor }} />
          </ButtonWrapper>
        </FormWrapper>
      </ContentContainer>
    </ModalWrapper>
  )
}

export default UpdateScreeningQuestionsModal
