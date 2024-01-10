import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import usePost from 'hooks/usePost'
import { PlaceHolder } from 'constants/placeholderData'
import { AddDepartmentSchema } from 'utils/validators/addDepartmentSchema'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import { IModalProps } from 'interfaces'
import {
  Label,
  ModalWrapper,
  ContentContainer,
  HeadingContainer,
  HeadingWrapper,
  ButtonWrapper,
  FormWrapper,
  InputWrapper,
  FieldWrapper,
} from 'styles/pages/Master'
import { ErrorMessage } from 'styles/components/Modal'

const AddDepartmentModal = ({ showModal, departmentsRefect }: IModalProps) => {
  const { mutateAsync } = usePost()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddDepartmentSchema),
    defaultValues: { name: '' },
  })

  const submitData = async (data: any) => {
    const payload = {
      name: data?.name,
    }

    try {
      const response = await mutateAsync({
        url: 'job/masters/department',
        payload,
        token: true,
      })
      if (response) {
        if (departmentsRefect) {
          departmentsRefect()
        }

        notification.success({
          message: 'Department Added',
          description: 'Your department has been added successfully!',
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
          <HeadingWrapper>Add Department</HeadingWrapper>
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <InputWrapper>
            <Label>Department Name*</Label>
            <FieldWrapper>
              <TextinputContainer placeholder={PlaceHolder.departmentPlaceholder} control={control} name="name" />
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            </FieldWrapper>
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

export default AddDepartmentModal
