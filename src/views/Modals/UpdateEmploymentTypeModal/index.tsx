import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UseQueryResult } from 'react-query'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import usePut from 'hooks/usePut'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddEmploymentTypeSchema } from 'utils/validators/addEmploymentType'
import { PlaceHolder } from 'constants/placeholderData'
import { UpdateEmployeeMessage } from 'constants/messages'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
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
import { ErrorMessage } from 'styles/components/Modal'

export interface IModalProps {
  showModal(value: boolean): void
  updateEmploye?: any
  id?: string
  refetchEmploymentType?: UseQueryResult['refetch']
}

const UpdateEmploymentTypeModal = ({ showModal, updateEmploye, id, refetchEmploymentType }: IModalProps) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddEmploymentTypeSchema),
    defaultValues: { name: '', description: '' },
  })

  const { mutateAsync } = usePut()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const updateEmployee = async (data: any) => {
    try {
      const res = await mutateAsync({
        url: `job/masters/employmenttype/${id}`,
        payload: { name: data?.name, description: data?.description },
        token: true,
      })
      if (res) {
        if (res) {
          if (refetchEmploymentType) {
            refetchEmploymentType()
          }

          notification.success({
            message: 'Employment Type Updated',
            description: UpdateEmployeeMessage,
          })
          showModal(false)
        }
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
    setValue('name', updateEmploye?.name)
    setValue('description', updateEmploye?.description)
  }, [updateEmploye])

  return (
    <ModalWrapper>
      <ContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Update Employment</HeadingWrapper>
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(updateEmployee)}>
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
            <Button label="Update" type="submit" variant="contained" style={{ backgroundColor: activeColor }} />
          </ButtonWrapper>
        </FormWrapper>
      </ContentContainer>
    </ModalWrapper>
  )
}

export default UpdateEmploymentTypeModal
