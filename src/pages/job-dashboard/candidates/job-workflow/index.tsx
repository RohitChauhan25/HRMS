import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar } from 'antd'
import usePost from 'hooks/usePost'
import useGet from 'hooks/useGet'
import Rating from 'components/Rating'
import CommentBox from 'components/TextBox'
import Button from 'components/AntdButton'
import CanidateInterview from 'pages/job-dashboard/candidates/candidate-interview'
import { Idata, QueryParamTypes } from 'interfaces'
import AvatarImage from 'assets/images/Avatar.png'
import verticaldot from 'assets/images/dots-vertical.png'
import arrowicon from 'assets/images/arrowIcon.png'
import { ProfileSection, Username } from 'styles/views/Navbar'
import {
  ScreeningWrapper,
  HeaderSection,
  Heading,
  SubHeading,
  Form,
  ButtonWrapper,
  RejectButton,
  MoveButton,
  ScreeningLine,
  UserInterviewSection,
  ContentSection,
  Time,
  ViewMoreSection,
  AvatarSection,
} from 'styles/pages/Candidates/CandidateDetails/jobWorkflow'

const JobWorkflow = () => {
  const userData = useSelector((state: any) => state.user?.user)
  const [screeningData, setScreeningData] = useState<any>()
  const [headColor] = useState('#000')
  const [, setColor] = useState(false)
  const [btn, setBtn] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('')
  const [borderLeft, setborderLeft] = useState('')
  const [borderBottom, setborderBottom] = useState('')
  const { handleSubmit, control } = useForm<Idata>()
  const [desableBtn, setDisableBtn] = useState(true)
  const [isComment, setIsComment] = useState(true)
  const { jobPostId, id } = useParams() as QueryParamTypes
  const jobId = parseInt(jobPostId)
  const candidate = parseInt(id)
  const { mutateAsync } = usePost()
  const { data: getJobData, refetch } = useGet(
    'getJobData',
    `/job/candidate/jobworkflowdata?jobId=${jobId}&candidateId=${candidate}&hiringStageId=1`,
    {
      token: true,
    },
  )
  const toggleContent = () => {
    setIsExpanded(!isExpanded)
  }
  const toggleComment = () => {
    setIsComment(!isComment)
  }
  // Reject and accept api implement here -->>
  const handleStep = async (type: string) => {
    const payload: any = {}
    if (type === 'accept') {
      ;(payload.candidateId = candidate), (payload.jobPostId = jobId), (payload.hiringStageId = 1), (payload.isDone = 1)
    } else {
      ;(payload.candidateId = candidate),
        (payload.jobPostId = jobId),
        (payload.hiringStageId = 1),
        (payload.isRejected = 1)
    }

    try {
      const res = await mutateAsync({
        url: '/job/candidate/jobworkflowdata',
        payload: payload,
        token: true,
      })

      if (res) {
        refetch()
      }
    } catch (error: any) {
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  // Screning module -->>
  const onSubmit = async (data: Idata) => {
    setColor(true)
    const payload = {
      rating: data?.rating,
      comments: data?.comment,
      candidateId: candidate,
      jobPostId: jobId,
      hiringStageId: 1,
      isDone: 0,
    }

    try {
      const res = await mutateAsync({
        url: '/job/candidate/jobworkflowdata',
        payload: payload,
        token: true,
      })

      if (res) {
        refetch()
      }
    } catch (error: any) {
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  useEffect(() => {
    setScreeningData(getJobData?.data[0])
    if (getJobData?.data[0]?.isDone === 1) {
      setBackgroundColor('#E8FCF1')
      setborderLeft('16px solid #419E6A')
      setborderBottom('1px solid #A5E1BF')
      setBtn(true)
    } else if (getJobData?.data[0]?.isRejected === 1) {
      setBackgroundColor('#FFEBEB')
      setborderLeft('16px solid #D83232')
      setborderBottom('1px solid #FC9595')
      setBtn(true)
    } else if (getJobData?.data[0]?.comments) {
      setDisableBtn(false)
      setBackgroundColor('#f3f5ff')
      setborderLeft('16px solid #1d2e88')
      setborderBottom('1px solid #1D2E88')
    } else {
      setBackgroundColor('#f3f5ff')
      setborderLeft('16px solid #1d2e88')
      setborderBottom('1px solid #1D2E88')
    }
  }, [getJobData])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      <ScreeningWrapper color={backgroundColor} borderleft={borderLeft} borderBottom={borderBottom}>
        <HeaderSection>
          <Heading color={headColor}>1. Screening</Heading>
          <SubHeading>Schedule an interview with the candidate.</SubHeading>
        </HeaderSection>
        {!btn && (
          <ButtonWrapper>
            <RejectButton
              color={!desableBtn ? '#1D2E88' : ''}
              disabled={desableBtn}
              onClick={() => handleStep('reject')}
            >
              Reject
            </RejectButton>
            <MoveButton
              color={!desableBtn ? '#1D2E88' : ''}
              background={!desableBtn ? '#fff' : ''}
              disabled={desableBtn}
              onClick={() => handleStep('accept')}
            >
              Move to Next Step
            </MoveButton>
          </ButtonWrapper>
        )}

        <ScreeningLine borderBottom={borderBottom}></ScreeningLine>
        <div>
          {isComment && (screeningData?.isDone === 1 || screeningData?.isRejected === 1) ? (
            <>
              <ViewMoreSection onClick={toggleComment}>
                View Comments
                <img src={arrowicon} alt="arrowicon" className="arrow" />
              </ViewMoreSection>
            </>
          ) : (
            <>
              {!isComment && (screeningData?.isDone === 1 || screeningData?.isRejected === 1) ? (
                <ViewMoreSection onClick={toggleComment}>
                  Hide Comments
                  <img src={arrowicon} alt="arrowicon" className="lessarrow" />
                </ViewMoreSection>
              ) : (
                <></>
              )}
              {screeningData ? (
                <UserInterviewSection>
                  <ProfileSection>
                    <AvatarSection>
                      <Avatar src={<img src={AvatarImage} alt="avatar" />} />
                      <Username className="username">{userData?.userName}</Username>
                    </AvatarSection>
                    <img src={verticaldot} alt="verticaldot" className="verticaldot" />
                  </ProfileSection>
                  <ContentSection>
                    <Time>{screeningData?.ratingTimeStamp?.substr(0, 16)}</Time>
                    <Rating
                      defaultValue={screeningData?.rating ? screeningData?.rating : 0}
                      name="rating"
                      control={control}
                      rules={{ required: true }}
                      disabled={screeningData?.rating ? true : false}
                    />
                    {isExpanded ? (
                      <SubHeading>{screeningData?.comments}</SubHeading>
                    ) : (
                      <SubHeading>{screeningData?.comments?.split(' ').slice(0, 9).join(' ')}..</SubHeading>
                    )}
                    <ViewMoreSection>
                      <div>
                        {isExpanded ? (
                          <div onClick={toggleContent}>
                            View Less
                            <img src={arrowicon} alt="arrowicon" className="lessarrow" />
                          </div>
                        ) : (
                          <>
                            <div onClick={toggleContent}>
                              View More
                              <img src={arrowicon} alt="arrowicon" className="arrow" />
                            </div>
                          </>
                        )}
                      </div>
                    </ViewMoreSection>
                  </ContentSection>
                </UserInterviewSection>
              ) : (
                <>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Rating name="rating" control={control} rules={{ required: true }} label="Rating" />
                    <CommentBox
                      name="comment"
                      label="Comments"
                      control={control}
                      rules={{ required: false }}
                      placeholder="Leave Your Comments"
                    />
                    <ButtonWrapper>
                      <Button variant={'cancel'} htmlType="reset">
                        Cancel
                      </Button>
                      <Button variant={'post'} htmlType="submit">
                        Submit
                      </Button>
                    </ButtonWrapper>
                  </Form>
                </>
              )}
            </>
          )}
        </div>
      </ScreeningWrapper>

      <CanidateInterview isDone={screeningData?.isDone === 1 ? true : true} data={getJobData} refetch={refetch} />
    </>
  )
}

export default JobWorkflow
