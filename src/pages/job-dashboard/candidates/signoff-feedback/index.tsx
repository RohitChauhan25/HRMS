import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import usePost from 'hooks/usePost'
import { Placeholder } from 'constants/feedbackMessage'
import TextareaContainer from 'components/TextArea'
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
  VisitSection,
} from 'styles/pages/Candidates/signoff-feedback'
import { SubmittedMessage } from 'styles/pages/submit-task'

const SignoffFeedback = () => {
  const { handleSubmit, register, control } = useForm()
  const { mutateAsync } = usePost()
  const { jobPostId, candidateId, userId, token } = useParams()
  const [submited, setSubmited] = useState(false)

  const onSubmit = async (data: any) => {
    const payload = {
      approval: 1,
      comment: data?.comment,
    }
    try {
      const response = await mutateAsync({
        url: `public/job/candidate/signoff/submit?userId=${userId}&jobPostId=${jobPostId}&candidateId=${candidateId}&token=${token}`,
        payload: payload,
        token: true,
      })
      if (response) {
        setSubmited(true)
        return response
      }
    } catch (error) {
      return error
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
            <H4> Submit Your Feedback</H4>
          </MainHeading>
          {submited ? (
            <SubmittedMessage>Feedback Submitted Successfully</SubmittedMessage>
          ) : (
            <ContainerItems>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>Comments</Label>
                <TextareaContainer
                  width={'716px'}
                  placeholder={Placeholder}
                  {...register('comment')}
                  control={control}
                ></TextareaContainer>

                <Butttonwrapper>
                  <Button color={'black'} background={'#f3f5ff'}>
                    Reject
                  </Button>
                  <Button color={'#f3f5ff'}>Approved</Button>
                </Butttonwrapper>
              </Form>
            </ContainerItems>
          )}
        </ContainseSection>
      </ContainerWrapper>
    </Container>
  )
}

export default SignoffFeedback
