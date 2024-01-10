import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import usePostFormData from 'hooks/usePostFormData'
import logo from 'assets/images/WitsLogo.png'

import {
  Container,
  ContainerWrapper,
  ContainseSection,
  ContainerItems,
  MainHeading,
  H4,
  Label,
  Butttonwrapper,
  Button,
  NavWrapper,
  Img,
  Form,
  Inputfile,
  VisitSection,
  FieldContainer,
  Input,
  SubmittedMessage,
} from 'styles/pages/submit-task'

const SubmitTask = () => {
  const [submited, setSubmited] = useState(false)
  const { handleSubmit, setValue } = useForm()
  const { jobPostId, candidateId, token } = useParams()
  const { mutateAsync } = usePostFormData()

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append('link', data?.link)
    formData.append('task', data?.file)
    try {
      const res = await mutateAsync({
        url: `/public/job/candidate/task/submit?jobPostId=${jobPostId}&hiringStageId=2&candidateId=${candidateId}&token=${token}`,
        payload: formData,
        token: true,
      })
      if (res) {
        setSubmited(true)
      }
    } catch (error: any) {
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  return (
    <Container>
      <NavWrapper>
        <Img src={logo} alt="witslogo" />
        <VisitSection>Visit out website</VisitSection>
      </NavWrapper>
      <ContainerWrapper>
        <ContainseSection>
          <MainHeading>
            <H4> Submit Your task</H4>
          </MainHeading>
          {submited ? (
            <SubmittedMessage>Task Submitted Successfully</SubmittedMessage>
          ) : (
            <ContainerItems>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FieldContainer>
                  <Label>Link</Label>
                  <Input onChange={(e) => setValue('link', e.target.value)} className="custom-width" />
                </FieldContainer>
                <Inputfile
                  type="file"
                  onChange={(event: any) => {
                    setValue('file', event.target.files[0])
                  }}
                  accept="doc/*,.pdf"
                />
                <Butttonwrapper>
                  <Button color={'black'} background={'#f3f5ff'}>
                    Cancel
                  </Button>
                  <Button color={'#f3f5ff'}>Submit</Button>
                </Butttonwrapper>
              </Form>
            </ContainerItems>
          )}
        </ContainseSection>
      </ContainerWrapper>
    </Container>
  )
}

export default SubmitTask
