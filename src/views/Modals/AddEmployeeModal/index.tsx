import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import useGet from 'hooks/useGet'
import usePost from 'hooks/usePost'
import { PlaceHolder } from 'constants/placeholderData'
import { AddEmployeeSchema } from 'utils/validators/addEmployeeSchema'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import SelectContainer from 'components/Select'
import { IModalProps } from 'interfaces'
import { ErrorMessage } from 'styles/components/Modal'
import {
  Label,
  ModalContainer,
  ContentContainer,
  HeadingContainer,
  HeadingWrapper,
  ButtonWrapper,
  FormWrapper,
  InputWrapper,
  EmployeeFormWrapper,
} from 'styles/pages/Master'

const AddEmployeeModal = ({ showModal }: IModalProps) => {
  const { mutateAsync } = usePost()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddEmployeeSchema),
    defaultValues: {
      email: '',
      phone: '',
      selectRole: '',
      selectCompany: '',
      fullName: '',
      employmentLocation: '',
    },
  })

  //get-role
  const { data: getRole, refetch: refetchRole } = useGet('employee-role', `/auth/role`, {
    token: true,
  })
  const roleData = getRole?.map((data: any) => ({
    value: data?.id,
    label: data?.roleName,
    roleId: data?.id,
  }))

  //get-company
  const { data: getCompanyName, refetch: refetchCompanyName } = useGet('company-name', `/auth/company`, {
    token: true,
  })
  const companyData = getCompanyName?.map((data: any) => ({
    value: data?.id,
    label: data?.companyName,
    companyId: data?.id,
  }))

  //get-supervisor
  const { data: getSupervisor, refetch: refetchSupervisor } = useGet('get-supervisor', `/auth/user`, {
    token: true,
  })
  const supervisorData = getSupervisor?.map((data: any) => ({
    value: data?.id,
    label: data?.email,
    parentUserId: data?.id,
  }))

  useEffect(() => {
    refetchRole()
    refetchCompanyName()
    refetchSupervisor()
  }, [])

  const submitData = async (data: any) => {
    const payload = {
      email: data?.email,
      fullName: data?.fullName,
      location: data?.employmentLocation,
      phone: data?.phone,
      companyId: data?.selectCompany,
      roleId: data?.selectRole,
      parentUserId: data?.selectSupervisor,
    }
    try {
      const res = await mutateAsync({
        url: '/auth/user',
        payload,
        token: true,
      })
      if (res) {
        notification.success({
          message: 'Employee Added',
          description: 'Employee added successfully!',
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
    <ModalContainer>
      <ContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Add Employee</HeadingWrapper>
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <EmployeeFormWrapper>
            <InputWrapper>
              <Label>Full Name*</Label>
              <TextinputContainer
                placeholder={PlaceHolder.employmentFullNamePlaceholder}
                control={control}
                name="fullName"
              />
              <ErrorMessage>{errors?.fullName?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Label>Email*</Label>
              <TextinputContainer placeholder={PlaceHolder.employmentPlaceholder} control={control} name="email" />
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Label>Phone*</Label>
              <TextinputContainer placeholder={PlaceHolder.employeePhonePlaceholder} control={control} name="phone" />
              <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Label>Role*</Label>
              <SelectContainer
                control={control}
                mode="single"
                name="selectRole"
                placeholder="Please select role"
                options={roleData}
              />
              <ErrorMessage>{errors?.selectRole?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Label>Company*</Label>
              <SelectContainer
                control={control}
                mode="single"
                name="selectCompany"
                placeholder="Please select company name"
                options={companyData}
              />
              <ErrorMessage>{errors?.selectCompany?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Label>Supervisor</Label>
              <SelectContainer
                control={control}
                mode="single"
                name="selectSupervisor"
                placeholder="Please select supervisor"
                options={supervisorData}
              />
              {/* <ErrorMessage>{errors?.selectSupervisor?.message}</ErrorMessage> */}
            </InputWrapper>
            <InputWrapper>
              <Label>Location*</Label>
              <TextinputContainer
                placeholder={PlaceHolder.employmentLocation}
                control={control}
                name="employmentLocation"
              />
              <ErrorMessage>{errors?.employmentLocation?.message}</ErrorMessage>
            </InputWrapper>
          </EmployeeFormWrapper>
          <ButtonWrapper>
            <Button label="Cancel" variant="text" type="reset" onClick={() => showModal(false)} className="cancel" />
            <Button label="Submit" type="submit" variant="contained" style={{ backgroundColor: activeColor }} />
          </ButtonWrapper>
        </FormWrapper>
      </ContentContainer>
    </ModalContainer>
  )
}

export default AddEmployeeModal
