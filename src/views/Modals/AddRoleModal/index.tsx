import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'
import usePatch from 'hooks/usePatch'
import { Cancel, Submit } from 'constants/labels'
import { RolesSchema } from 'utils/validators/RolesValidator'
import TextinputContainer from 'components/TextInput'
import Button from 'components/Button'
import {
  AddRolesField,
  AddRolesWrapper,
  DescriptionWrapper,
  InputWrapper,
  Label,
  ModalWrapper,
  FormWrapper,
  HeadingContainer,
  HeadingWrapper,
  AddRoleWrapper,
} from 'styles/components/AddNewRoles'
import { Butttonwrapper } from 'styles/pages/Feedback'
import { ErrorMessage } from 'styles/components/CandidateModal'

interface PropInterface {
  setModal(value: boolean): void
  refetchRole: any
}
const AddRoleModal = ({ setModal, refetchRole }: PropInterface) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(RolesSchema),
    defaultValues: {
      roleName: '',
      description: '',
    },
  })
  const { mutateAsync } = usePatch()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const onSubmit = async (data: any) => {
    const payload = {
      roleName: data.roleName,
      roleDescription: data.description,
    }

    try {
      const res = await mutateAsync({
        url: `auth/role`,
        payload: payload,
        token: true,
      })
      if (res) {
        notification.success({
          message: '',
          description: 'Role is Created successfully!',
        })
        refetchRole()
        setModal(false)
      }
    } catch (error: any) {
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  return (
    <ModalWrapper>
      <AddRolesWrapper>
        <HeadingContainer>
          <HeadingWrapper>Add Role</HeadingWrapper>
        </HeadingContainer>
        <AddRolesField>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <AddRoleWrapper>
              <InputWrapper>
                <Label>Roles*</Label>
                <TextinputContainer placeholder="Enter Role" control={control} name="roleName" />
                <ErrorMessage>{errors.roleName && errors?.roleName.message}</ErrorMessage>
              </InputWrapper>
              <DescriptionWrapper>
                <Label>Description*</Label>
                <TextinputContainer type="text" placeholder="Add Description" control={control} name="description" />
                <ErrorMessage>{errors.description && errors?.description.message}</ErrorMessage>
              </DescriptionWrapper>
            </AddRoleWrapper>
            <Butttonwrapper>
              <Button label={Cancel} variant="text" onClick={() => setModal(false)} />
              <Button label={Submit} variant="contained" type="submit" style={{ backgroundColor: activeColor }} />
            </Butttonwrapper>
          </FormWrapper>
        </AddRolesField>
      </AddRolesWrapper>
    </ModalWrapper>
  )
}

export default AddRoleModal
