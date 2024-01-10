import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import usePost from 'hooks/usePost'
import { PlaceHolder } from 'constants/placeholderData'
import { Cancel, Submit } from 'constants/labels'
import { AddExperienceSchema } from 'utils/validators/addExperienceSchema'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
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
} from 'styles/pages/Master'

const AddExperienceModal = ({ showModal, refetchExperience }: IModalProps) => {
  const { mutateAsync } = usePost()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddExperienceSchema),
    defaultValues: { name: '', start: undefined, end: undefined, type: '' },
  })
  const experienceType = [
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ]

  const submitData = async (data: any) => {
    const payload = {
      name: data?.name,
      start: data?.start,
      end: data?.end,
      type: data?.type,
    }

    try {
      const response = await mutateAsync({
        url: 'job/masters/Minimumexperience',
        payload,
        token: true,
      })
      if (response) {
        if (refetchExperience) {
          refetchExperience()
        }

        notification.success({
          message: 'Experience Added',
          description: 'Experience added successfully!',
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
        showModal(false)
      }
    }
  }

  return (
    <ModalWrapper>
      <ContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Add Experience</HeadingWrapper>
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <EmployeeFormWrapper>
            <InputWrapper>
              <Label>Name*</Label>
              <TextinputContainer placeholder={PlaceHolder.experiencePlaceholder} control={control} name="name" />
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Label>Start*</Label>
              <TextinputContainer
                placeholder={PlaceHolder.experiencePlaceholder}
                control={control}
                name="start"
                type="number"
              />
              <ErrorMessage>{errors?.start?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Label>End*</Label>
              <TextinputContainer
                placeholder={PlaceHolder.experiencePlaceholder}
                control={control}
                name="end"
                type="number"
              />
              <ErrorMessage>{errors?.end?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Label>Type*</Label>
              <SelectContainer
                placeholder={PlaceHolder.experiencePlaceholder}
                control={control}
                name="type"
                options={experienceType}
              />
              <ErrorMessage>{errors?.type?.message}</ErrorMessage>
            </InputWrapper>
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

export default AddExperienceModal
