import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import usePost from 'hooks/usePost'
import { yupResolver } from '@hookform/resolvers/yup'
import { Placeholder } from 'constants/feedbackMessage'
import { FeedbackSchema } from 'utils/validators/feedbackvalidatorSchema'
import Rating from 'components/Rating'
import TextareaContainer from 'components/TextArea'
import { Idata } from 'interfaces'
import logo from 'assets/images/WitsLogo.png'
import { ErrorMessage } from 'styles/components/Modal'
import {
  Container,
  ContainerWrapper,
  ContainseSection,
  ContainerItems,
  HeadingContainer,
  MainHeading,
  H4,
  Ratingstar,
  Label,
  TextHeading,
  Butttonwrapper,
  Button,
  JobTitle,
  NavWrapper,
  Img,
  Form,
  VisitSection,
} from 'styles/pages/Feedback'
import { SubmittedMessage } from 'styles/pages/submit-task'

const Feedback = () => {
  const [submited, setSubmited] = useState(false)
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<Idata>({ resolver: yupResolver(FeedbackSchema) })
  const { mutateAsync } = usePost()
  const { jobPostId, candidateId, userId, token } = useParams()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  useEffect(() => {
    if (window.location.href == window.localStorage.getItem('url')) {
      setSubmited(true)
    }
  }, [window.location.href])

  const onSubmit = async (data: Idata) => {
    const payload = {
      rating: data?.rating,
      comments: data?.comment,
    }

    try {
      const response = await mutateAsync({
        url: `/public/job/candidate/feedback?userId=${userId}&jobPostId=${jobPostId}&hiringStageId=2&candidateId=${candidateId}&token=${token}`,
        payload: payload,
        token: true,
      })

      if (response) {
        setSubmited(true)
        window.localStorage.setItem('url', window.location.href)
        return response
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
        <VisitSection color={activeColor}>Visit out website</VisitSection>
      </NavWrapper>
      <ContainerWrapper>
        <ContainseSection>
          <MainHeading color={activeColor}>
            <H4> Submit Your Feedback</H4>
          </MainHeading>
          {submited ? (
            <SubmittedMessage>Feedback Submitted Successfully</SubmittedMessage>
          ) : (
            <ContainerItems>
              <HeadingContainer>
                <TextHeading>Ivy Haddington</TextHeading>
                <JobTitle>Financial Analyst</JobTitle>
              </HeadingContainer>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Ratingstar>
                  <Rating name="rating" control={control} rules={{ required: true }} label="Rating" />
                </Ratingstar>
                {/* <ErrorMessage>{errors?.rating && errors?.rating?.message}</ErrorMessage> */}
                <Label>Comments</Label>
                <TextareaContainer
                  width={'716px'}
                  placeholder={Placeholder}
                  {...register('comment')}
                  control={control}
                ></TextareaContainer>
                <ErrorMessage>{errors?.comment && errors?.comment?.message}</ErrorMessage>

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

export default Feedback
