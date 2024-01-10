import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notification } from 'antd'
import usePatch from 'hooks/usePatch'
import TextinputContainer from 'components/TextInput'
import Button from 'components/Button'
import { PropInterface } from 'interfaces/job'
import {
  AddRolesField,
  AddRolesWrapper,
  DescriptionWrapper,
  FieldWrapper,
  InputWrapper,
  Label,
  ModalWrapper,
  FormWrapper,
} from 'styles/components/AddNewRoles'
import { Butttonwrapper } from 'styles/pages/Feedback'
import { HeadingContainer, HeadingWrapper } from 'styles/pages/Master'

const UpdateResource = ({ setModal, record, refetchResource }: PropInterface) => {
  const { mutateAsync } = usePatch()
  const { handleSubmit, control, setValue } = useForm()

  const onSubmit = async (data: any) => {
    const payload = {
      resource: data.resource,
      resourceName: data?.resourceName,
      module: data.module,
      subModule: data.subModule,
    }
    try {
      const res = await mutateAsync({
        url: `auth/resource/${record?.key}`,
        payload: payload,
        token: true,
      })
      if (res) {
        notification.success({
          message: '',
          description: 'Resource is Update successfully!',
        })
        refetchResource()
        setModal(false)
      }
    } catch (error: any) {
      notification.error({
        message: '',
        description: error?.response?.data?.message[0],
        duration: 2,
      })
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  useEffect(() => {
    setValue('resourceName', record?.name)
    setValue('resource', record?.resource)
    setValue('module', record?.module)
    setValue('subModule', record?.subModule)
  })

  return (
    <div>
      <ModalWrapper>
        <AddRolesWrapper>
          <AddRolesField>
            <HeadingContainer>
              <HeadingWrapper>Update Resource</HeadingWrapper>
            </HeadingContainer>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
              <FieldWrapper>
                <InputWrapper>
                  <Label>Resource Name*</Label>
                  <TextinputContainer
                    placeholder="Enter Resource Name "
                    control={control}
                    name="resourceName"
                    defaultValue={record.resourceName}
                  />
                </InputWrapper>
                <DescriptionWrapper>
                  <Label>Resource URL*</Label>
                  <TextinputContainer
                    type="text"
                    placeholder="Add Resource"
                    control={control}
                    name="resource"
                    defaultValue={record.resource}
                  />
                </DescriptionWrapper>
                <DescriptionWrapper>
                  <Label>Module*</Label>
                  <TextinputContainer
                    type="text"
                    placeholder="Add Module "
                    control={control}
                    name="module"
                    defaultValue={record.module}
                  />
                </DescriptionWrapper>
                <DescriptionWrapper>
                  <Label>Sub-Module*</Label>
                  <TextinputContainer
                    type="text"
                    placeholder="Add Sub-Module "
                    control={control}
                    name="subModule"
                    defaultValue={record.subModule}
                  />
                </DescriptionWrapper>
                <Butttonwrapper>
                  <Button onClick={() => setModal(false)} label="Cancel" variant="text" />
                  <Button label="Update" variant="contained" />
                </Butttonwrapper>
              </FieldWrapper>
            </FormWrapper>
          </AddRolesField>
        </AddRolesWrapper>
      </ModalWrapper>
    </div>
  )
}

export default UpdateResource
