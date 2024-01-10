import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
import { PlaceHolder } from 'constants/placeholderData'
import { assignTaskSchema } from 'utils/validators/assignTaskSchema'
import { ErrorMessage } from 'styles/components/Modal'
import {
  Button,
  ButtonWrapper,
  EditorContainer,
  EditorSection,
  Label,
  SubjectField,
  Input,
  Form,
} from 'styles/pages/editor'

const Editor = () => {
  const { mutateAsync } = usePost()
  const navigate = useNavigate()
  const { state } = useLocation()
  const {
    handleSubmit,
    setValue,
    trigger,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(assignTaskSchema),
    defaultValues: {
      subject: '',
      body: '',
    },
  })

  const onSubmit = async (data: any) => {
    const payload = {
      subject: data.subject,
      emailBody: data.body,
      jobPostId: state.jobPostId,
      hiringStageId: 2,
      candidateId: state.candidateId,
    }
    try {
      const response = await mutateAsync({
        url: 'job/candidate/task',
        payload: payload,
      })
      if (response) {
        navigate(-1)
        return response
      }
    } catch (error: any) {
      return { error: error }
    }
  }

  const handleQuillEdit = (value: any) => {
    setValue('body', value)
    trigger('body')
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <>
      <EditorSection>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SubjectField>
            <Label>Subject*</Label>
            <Input placeholder={PlaceHolder.inputPlaceholder} {...register('subject')}></Input>
            <ErrorMessage>{errors?.subject && errors?.subject?.message}</ErrorMessage>
          </SubjectField>
          <EditorContainer>
            <Label>Email Body*</Label>
            <ReactQuill placeholder={PlaceHolder.editorPlaceholder} onChange={handleQuillEdit} />
          </EditorContainer>
          <ErrorMessage>{errors?.body && errors?.body?.message}</ErrorMessage>

          <ButtonWrapper>
            <Button color={'black'} background={'#E8E8E8'} onClick={handleBack}>
              Back
            </Button>
            <Button color={'#f3f5ff'} type="submit">
              Send
            </Button>
          </ButtonWrapper>
        </Form>
      </EditorSection>
    </>
  )
}

export default Editor
