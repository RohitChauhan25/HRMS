import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { HiringStageSchema } from 'utils/validators/RolesValidator'
import TextinputContainer from 'components/TextInput'
import {
  AddRolesField,
  AddRolesWrapper,
  InputWrapper,
  Label,
  ModalWrapper,
  FormWrapper,
  HeadingContainer,
  HeadingWrapper,
  AddRoleWrapper,
} from 'styles/components/AddNewRoles'
import { Button, Butttonwrapper } from 'styles/pages/Feedback'
import { ErrorMessage } from 'styles/components/CandidateModal'
interface PropInterface {
  setModal(value: boolean): void
  items: any
  setitems: any
}
const Hiringstage = ({ setModal, items, setitems }: PropInterface) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(HiringStageSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: any) => {
    setitems([
      ...items,
      {
        Hiringstage: data.name,
        id: items.length + 1,
        canDelete: true,
      },
    ])
    setModal(false)
  }

  return (
    <ModalWrapper>
      <AddRolesWrapper>
        <HeadingContainer>
          <HeadingWrapper>Add Hiring Stage</HeadingWrapper>
        </HeadingContainer>
        <AddRolesField>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <AddRoleWrapper>
              <InputWrapper>
                <Label>Add Hiring Stage</Label>
                <TextinputContainer placeholder="Enter Hiring Stage" control={control} name="name" />
                <ErrorMessage>{errors.name && errors?.name.message}</ErrorMessage>
              </InputWrapper>
            </AddRoleWrapper>
            <Butttonwrapper>
              <Button color={'black'} background={'#f3f5ff'} onClick={() => setModal(false)}>
                Cancel
              </Button>
              <Button color={'#f3f5ff'}>Submit</Button>
            </Butttonwrapper>
          </FormWrapper>
        </AddRolesField>
      </AddRolesWrapper>
    </ModalWrapper>
  )
}

export default Hiringstage
