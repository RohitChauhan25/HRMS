import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import usePut from 'hooks/usePut'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddDepartmentSchema } from 'utils/validators/addDepartmentSchema'
import { PlaceHolder } from 'constants/placeholderData'
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

const UpdateDepartmentModal = ({ showModal, updateDepartment, id, departmentsRefect }: IModalProps) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddDepartmentSchema),
    defaultValues: { name: '' },
  })
  const { mutateAsync } = usePut()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const updateDepartmentDetail = async (data: any) => {
    try {
      const res = await mutateAsync({
        url: `job/masters/department/${id}`,
        payload: { name: data?.name, description: data?.description },
        token: true,
      })
      if (res) {
        if (departmentsRefect) {
          departmentsRefect()
        }

        notification.success({
          message: 'Department Updated',
          description: 'Your Department has been updated successfully!',
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
    setValue('name', updateDepartment?.name ?? '')
  }, [updateDepartment])

  return (
    <ModalWrapper>
      <ContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Update Department</HeadingWrapper>
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(updateDepartmentDetail)}>
          <InputWrapper>
            <Label>Department Name*</Label>
            <FieldWrapper>
              <TextinputContainer placeholder={PlaceHolder.departmentPlaceholder} control={control} name="name" />
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            </FieldWrapper>
          </InputWrapper>
          <ButtonWrapper>
            <Button label="Cancel" variant="text" onClick={() => showModal(false)} className="cancel" />
            <Button label="Update" type="submit" variant="contained" style={{ backgroundColor: activeColor }} />
          </ButtonWrapper>
        </FormWrapper>
      </ContentContainer>
    </ModalWrapper>
  )
}

export default UpdateDepartmentModal
