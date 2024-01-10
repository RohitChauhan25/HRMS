import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import usePost from 'hooks/usePost'
import { PlaceHolder } from 'constants/placeholderData'
import { AddEmploymentTypeSchema } from 'utils/validators/addEmploymentType'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import { IModalProps } from 'interfaces'
import { ErrorMessage } from 'styles/components/Modal'
import {
  Label,
  ModalWrapper,
  ContentContainer,
  HeadingContainer,
  HeadingWrapper,
  ButtonWrapper,
  FormWrapper,
  InputWrapper,
} from 'styles/pages/Master'

const AddEmploymentTypeModal = ({ showModal, refetchEmploymentType }: IModalProps) => {
  const { mutateAsync } = usePost()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddEmploymentTypeSchema),
    defaultValues: { name: '', description: '' },
  })

  const submitData = async (data: any) => {
    const payload = {
      name: data?.name,
      description: data?.description,
    }

    try {
      const response = await mutateAsync({
        url: 'job/masters/employmenttype',
        payload,
        token: true,
      })
      if (response) {
        notification.success({
          message: 'Employment Type Added',
          description: 'Your Employment Type has been added successfully!',
        })
        refetchEmploymentType()
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
          <HeadingWrapper>Add Employment</HeadingWrapper>
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <InputWrapper>
            <Label>Employment Name*</Label>
            <TextinputContainer placeholder={PlaceHolder.employmentPlaceholder} control={control} name="name" />
            <ErrorMessage>{errors?.name?.message}</ErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <Label>Description*</Label>
            <TextinputContainer
              placeholder={PlaceHolder.employmentDescriptionPlaceholder}
              control={control}
              name="description"
            />
            <ErrorMessage>{errors?.description?.message}</ErrorMessage>
          </InputWrapper>
          <ButtonWrapper>
            <Button label="Cancel" variant="text" type="reset" onClick={() => showModal(false)} className="cancel" />
            <Button label="Submit" type="submit" variant="contained" style={{ backgroundColor: activeColor }} />
          </ButtonWrapper>
        </FormWrapper>
      </ContentContainer>
    </ModalWrapper>
  )
}

export default AddEmploymentTypeModal
