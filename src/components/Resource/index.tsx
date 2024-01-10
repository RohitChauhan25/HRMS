import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
import { ResourceSchema } from 'utils/validators/AddResourceScheme'
import { Cancel, Submit } from 'constants/labels'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import { ErrorMessage } from 'styles/components/CandidateModal'
import {
  AddRolesField,
  AddRolesWrapper,
  DescriptionWrapper,
  FieldWrapper,
  InputWrapper,
  Label,
  ModalWrapper,
  FormWrapper,
  HeadingContainer,
  HeadingWrapper,
  AddRoleWrapper,
} from 'styles/components/AddNewRoles'
import { Butttonwrapper } from 'styles/pages/Feedback'

interface PropInterface {
  setModal(value: boolean): void
  refetchResource: any
}

const Resource = ({ setModal, refetchResource }: PropInterface) => {
  const { mutateAsync } = usePost()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(ResourceSchema),
    defaultValues: {
      resource: '',
      resourceName: '',
      module: '',
      subModule: '',
    },
  })
  const onSubmit = async (data: any) => {
    const payload = {
      resource: data.resource,
      resourceName: data.resourceName,
      module: data.module,
      subModule: data.subModule,
    }
    try {
      const res = await mutateAsync({
        url: `auth/resource`,
        payload: payload,
        token: true,
      })
      if (res) {
        notification.success({
          message: '',
          description: 'Resource is Created successfully!',
        })
        refetchResource()
        setModal(false)
      }
    } catch (error: any) {
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  return (
    <div>
      <ModalWrapper>
        <AddRolesWrapper>
          <HeadingContainer>
            <HeadingWrapper>Add Resource</HeadingWrapper>
          </HeadingContainer>
          <AddRolesField>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
              <FieldWrapper>
                <AddRoleWrapper>
                  <InputWrapper>
                    <Label>Resource Name*</Label>
                    <TextinputContainer
                      type="text"
                      placeholder="Enter Resource Name"
                      control={control}
                      name="resourceName"
                    />
                    <ErrorMessage>{errors.resourceName && errors?.resourceName.message}</ErrorMessage>
                  </InputWrapper>
                  <DescriptionWrapper>
                    <Label>Resource URl*</Label>
                    <TextinputContainer placeholder="Add Resource url " control={control} name="resource" />
                    <ErrorMessage>{errors.resource && errors?.resource.message}</ErrorMessage>
                  </DescriptionWrapper>
                  {/* */}
                  <DescriptionWrapper>
                    <Label>Module*</Label>
                    <TextinputContainer placeholder="Add Module " control={control} name="module" />
                    <ErrorMessage>{errors.module && errors?.module.message}</ErrorMessage>
                  </DescriptionWrapper>
                  <DescriptionWrapper>
                    <Label>Sub-Module*</Label>
                    <TextinputContainer placeholder="Add Sub-Module " control={control} name="subModule" />
                    <ErrorMessage>{errors.subModule && errors?.subModule.message}</ErrorMessage>
                  </DescriptionWrapper>
                  {/*  */}
                </AddRoleWrapper>
                <Butttonwrapper>
                  <Button label={Cancel} variant="text" onClick={() => setModal(false)} />
                  <Button label={Submit} variant="contained" type="submit" style={{ backgroundColor: activeColor }} />
                </Butttonwrapper>
              </FieldWrapper>
            </FormWrapper>
          </AddRolesField>
        </AddRolesWrapper>
      </ModalWrapper>
    </div>
  )
}

export default Resource
