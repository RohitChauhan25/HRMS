import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddCandidateSchema } from 'utils/validators/addCandidateSchema'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import SelectContainer from 'components/Select'
import { IModalProps } from 'interfaces'
import { ErrorMessage } from 'styles/components/Modal'
import {
  ModalContainer,
  ContentContainer,
  HeadingContainer,
  HeadingWrapper,
  FormWrapper,
  EmployeeFormWrapper,
  InputWrapper,
  Label,
  FieldWrapper,
  SalaryWrapper,
  ButtonWrapper,
} from 'styles/components/Modal/AddCandidateModal'

const AddCandidateModal = ({ showModal }: IModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddCandidateSchema),
    defaultValues: {
      name: '',
      jobRole: '',
      email: '',
      phone: '',
      department: '',
      salary: '',
      currency: '',
    },
  })
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const submitData = async (data: any) => {
    data
  }
  const currencyOptions = [
    { value: 'INR', label: 'INR' },
    { value: 'USD', label: 'USD' },
  ]

  return (
    <ModalContainer>
      <ContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Add Candidate</HeadingWrapper>
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <EmployeeFormWrapper>
            <InputWrapper>
              <Label>Name*</Label>
              <FieldWrapper>
                <TextinputContainer placeholder="Enter Name" control={control} name="name" />
                <ErrorMessage>{errors?.name?.message}</ErrorMessage>
              </FieldWrapper>
            </InputWrapper>
            <InputWrapper>
              <Label>Job Role*</Label>
              <FieldWrapper>
                <SelectContainer
                  control={control}
                  mode="single"
                  name="jobRole"
                  placeholder="Select Role"
                  options={[]}
                />
                <ErrorMessage>{errors?.jobRole?.message}</ErrorMessage>
              </FieldWrapper>
            </InputWrapper>
            <InputWrapper>
              <Label>Email*</Label>
              <FieldWrapper>
                <TextinputContainer placeholder="Enter Email" control={control} name="email" />
                <ErrorMessage>{errors?.email?.message}</ErrorMessage>
              </FieldWrapper>
            </InputWrapper>
            <InputWrapper>
              <Label>Mobile Number*</Label>
              <FieldWrapper>
                <TextinputContainer placeholder="Enter Mobile Number" control={control} name="phone" />
                <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
              </FieldWrapper>
            </InputWrapper>
          </EmployeeFormWrapper>
          <InputWrapper>
            <Label>Department*</Label>
            <FieldWrapper>
              <SelectContainer
                control={control}
                mode="single"
                name="department"
                placeholder="Select Department"
                options={[]}
              />
              <ErrorMessage>{errors?.department?.message}</ErrorMessage>
            </FieldWrapper>
          </InputWrapper>
          <InputWrapper>
            <Label>Offered Salary*</Label>
            <SalaryWrapper>
              <FieldWrapper>
                <TextinputContainer placeholder="Enter Salary" control={control} name="salary" />
                <ErrorMessage>{errors?.salary?.message}</ErrorMessage>
              </FieldWrapper>
              <FieldWrapper>
                <SelectContainer
                  control={control}
                  mode="single"
                  name="currency"
                  placeholder="Select Currency"
                  options={currencyOptions}
                />
                <ErrorMessage>{errors?.currency?.message}</ErrorMessage>
              </FieldWrapper>
              <FieldWrapper>
                <TextinputContainer placeholder="Annually" control={control} name="" disabled />
              </FieldWrapper>
            </SalaryWrapper>
          </InputWrapper>
          <ButtonWrapper>
            <Button label="Cancel" variant="text" type="reset" onClick={() => showModal(false)} className="cancel" />
            <Button label="Submit" type="submit" variant="contained" style={{ backgroundColor: activeColor }} />
          </ButtonWrapper>
        </FormWrapper>
      </ContentContainer>
    </ModalContainer>
  )
}

export default AddCandidateModal
