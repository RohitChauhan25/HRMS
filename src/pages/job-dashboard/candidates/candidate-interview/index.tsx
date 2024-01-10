import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Avatar } from 'antd'
import moment from 'moment'
import usePost from 'hooks/usePost'
import Button from 'components/AntdButton'
import Rating from 'components/Rating'
import SignOff from 'components/SignOff'
import { IHiringData, Idata, QueryParamTypes } from 'interfaces'
import AvatarImage from 'assets/images/Avatar.png'
import verticaldot from 'assets/images/dots-vertical.png'
import arrowicon from 'assets/images/arrowIcon.png'
import TaskFile from 'assets/svg/TaskFileIcon'
import Download from 'assets/svg/Download'
import { ProfileSection, Username } from 'styles/views/Navbar'
import {
  InterviewWrapper,
  HeaderSection,
  Heading,
  SubHeading,
  ButtonWrapperSection,
  ButtonWrapper,
  RejectInterviewButton,
  MoveInterviewButton,
  Line,
  UserInterviewSection,
  Time,
  ViewMoreSection,
  ContentSection,
  AvatarSection,
  TaskSection,
  PdfSection,
  FileNameSection,
  LinkData,
  LinkSection,
} from 'styles/pages/Candidates/CandidateDetails/jobWorkflow'

const CanidateInterview = ({ isDone, data, refetch }: IHiringData) => {
  const [btn, setBtn] = useState(false)
  const [interviewData, setInterviewData] = useState<any>([])
  const { control } = useForm<Idata>()
  const [headColor] = useState('#000')
  const [backgroundColor, setBackgroundColor] = useState('')
  const [borderLeft, setborderLeft] = useState('')
  const [borderBottom, setborderBottom] = useState('')
  const [feedbackData, setFeedbackData] = useState([])
  const [isComment, setIsComment] = useState(true)
  const [viewMore, setViewMore] = useState(-1)
  const [task, setTask] = useState<any>([])
  const { state } = useLocation()
  const { jobPostId, id } = useParams() as QueryParamTypes
  const jobId = parseInt(jobPostId)
  const candidate = parseInt(id)
  const navigate = useNavigate()
  const { mutateAsync } = usePost()

  const toggleComment = () => {
    setIsComment(!isComment)
  }

  const handleDownload = () => {
    //window.open(file, '_blank')
  }

  // Reject and accept api implement here -->>
  const handleStep = async (type: string) => {
    const payload: any = {}
    if (type === 'accept') {
      ;(payload.candidateId = candidate), (payload.jobPostId = jobId), (payload.hiringStageId = 2), (payload.isDone = 1)
    } else {
      ;(payload.candidateId = candidate),
        (payload.jobPostId = jobId),
        (payload.hiringStageId = 2),
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
        return res
      }
    } catch (error: any) {
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  useEffect(() => {
    setInterviewData(data?.data[1])
    if (data?.data[1]?.isDone === 1) {
      setBackgroundColor('#E8FCF1')
      setborderLeft('16px solid #419E6A')
      setborderBottom('1px solid #A5E1BF')
      setBtn(true)
    } else if (data?.data[1]?.isRejected === 1) {
      setBackgroundColor('#FFEBEB')
      setborderLeft('16px solid #D83232')
      setborderBottom('1px solid #FC9595')
      setBtn(true)
    } else {
      setBackgroundColor('#f3f5ff')
      setborderLeft('16px solid #1d2e88')
      setborderBottom('1px solid #1D2E88')
    }

    if (data?.data[1]?.data?.feedback) {
      const tempData = data?.data[1]?.data?.feedback?.filter((data: any) => data?.comments !== null)
      setFeedbackData(tempData)
    }
  }, [data])

  useEffect(() => {
    setTask(data?.data[1]?.data?.task)
  }, [data])

  return (
    <>
      {!isDone ? (
        <InterviewWrapper>
          <HeaderSection>
            <Heading>2. Interview</Heading>
          </HeaderSection>
        </InterviewWrapper>
      ) : feedbackData && feedbackData?.length > 0 ? (
        <InterviewWrapper color={backgroundColor} borderleft={borderLeft}>
          <HeaderSection>
            <Heading color={headColor}>2. Interview</Heading>
            <SubHeading>Assign a task or schedule an interview with the candidate.</SubHeading>
          </HeaderSection>
          {interviewData?.isDone !== 1 && interviewData?.isRejected !== 1 && (
            <ButtonWrapperSection>
              <Button
                variant="primary"
                htmlType="submit"
                onClick={() =>
                  navigate(`/jobs/job-description/candidate/${jobId}/candidate-schedule-interview/${candidate}`, {
                    state: {
                      ...state,
                      type: 'interview',
                    },
                  })
                }
              >
                Schedule An Interview
              </Button>
              <Button
                variant="primary"
                htmlType="submit"
                onClick={() =>
                  navigate(`/jobs/job-description/candidate/${jobId}/candidate-schedule-interview/${candidate}`, {
                    state: {
                      ...state,
                      type: 'assignTask',
                    },
                  })
                }
              >
                Assign a Task
              </Button>
            </ButtonWrapperSection>
          )}
          <Line borderBottom={borderBottom}></Line>

          <div>
            {isComment && (interviewData?.isDone === 1 || interviewData?.isRejected === 1) ? (
              <>
                <ViewMoreSection onClick={toggleComment}>
                  View Comments
                  <img src={arrowicon} alt="arrowicon" className="arrow" />
                </ViewMoreSection>
              </>
            ) : (
              <>
                {!isComment && (interviewData?.isDone === 1 || interviewData?.isRejected === 1) && (
                  <ViewMoreSection onClick={toggleComment}>
                    Hide Comments
                    <img src={arrowicon} alt="arrowicon" className="lessarrow" />
                  </ViewMoreSection>
                )}
                <UserInterviewSection>
                  {feedbackData?.map((data: any, index: number) => {
                    const arr = data?.email?.split('.')
                    return (
                      <div key={index}>
                        <ProfileSection>
                          <AvatarSection>
                            <Avatar src={<img src={AvatarImage} alt="avatar" />} />
                            <div>
                              <Username className="username">
                                {arr?.length > 0 && arr[0][0].toUpperCase() + arr[0].slice(1)}
                              </Username>
                              <Time>{data?.timestamp?.substr(0, 16)}</Time>
                            </div>
                          </AvatarSection>
                          <img src={verticaldot} alt="verticaldot" className="verticaldot" />
                        </ProfileSection>
                        <ContentSection>
                          <Username>interview</Username>
                          <Rating
                            defaultValue={parseInt(data?.rating)}
                            disabled={data?.rating ? true : false}
                            name="rating"
                            control={control}
                            rules={{ required: true }}
                          />
                          {viewMore === index ? (
                            <SubHeading>{data?.comments}</SubHeading>
                          ) : (
                            <SubHeading>{data?.comments?.substr(0, 80)}..</SubHeading>
                          )}
                          <ViewMoreSection>
                            <div>
                              {viewMore === index ? (
                                <div onClick={() => setViewMore(-1)}>
                                  View Less
                                  <img src={arrowicon} alt="arrowicon" className="lessarrow" />
                                </div>
                              ) : (
                                <>
                                  <div onClick={() => setViewMore(index)}>
                                    View More
                                    <img src={arrowicon} alt="arrowicon" className="arrow" />
                                  </div>
                                </>
                              )}
                            </div>
                          </ViewMoreSection>
                        </ContentSection>
                      </div>
                    )
                  })}

                  {task && (task?.file || task?.link) && (
                    <>
                      <Line></Line>
                      <UserInterviewSection className="taskdata">
                        <ProfileSection>
                          <AvatarSection>
                            <Avatar src={<img src={AvatarImage} alt="avatar" />} />
                            <div>
                              <Username className="username">{state?.firstName + ' ' + state?.lastName}</Username>
                              <Time>{moment().calendar()}</Time>
                            </div>
                          </AvatarSection>
                          <img src={verticaldot} alt="verticaldot" className="verticaldot" />
                        </ProfileSection>
                        <ContentSection>
                          {task?.file && (
                            <>
                              <Heading color={headColor}>Task</Heading>
                              <TaskSection>
                                <PdfSection>
                                  <TaskFile />
                                  <FileNameSection>{task?.file}</FileNameSection>
                                </PdfSection>
                                <Download onClick={handleDownload} className="download" />
                              </TaskSection>
                            </>
                          )}

                          <LinkSection>
                            {task?.link && (
                              <>
                                <Heading color={headColor}>Link : </Heading>
                                <LinkData href={task?.link} target="_blank" rel="noreferrer">
                                  {task?.link}
                                </LinkData>
                              </>
                            )}
                          </LinkSection>
                        </ContentSection>
                      </UserInterviewSection>
                    </>
                  )}
                  {!btn && (
                    <ButtonWrapper className="modalbutton">
                      <RejectInterviewButton onClick={() => handleStep('reject')}>Reject</RejectInterviewButton>
                      <MoveInterviewButton onClick={() => handleStep('accept')}>Move to Next Step</MoveInterviewButton>
                    </ButtonWrapper>
                  )}
                </UserInterviewSection>
              </>
            )}
          </div>
        </InterviewWrapper>
      ) : (
        <InterviewWrapper color={backgroundColor} borderleft={borderLeft}>
          <HeaderSection>
            <Heading color={headColor}>2. Interview</Heading>
            <SubHeading>Assign a task or schedule an interview with the candidate.</SubHeading>
          </HeaderSection>
          <ButtonWrapperSection>
            <Button
              variant="primary"
              htmlType="submit"
              onClick={() =>
                navigate(`/jobs/job-description/candidate/${jobId}/candidate-schedule-interview/${candidate}`, {
                  state: {
                    ...state,
                    type: 'interview',
                  },
                })
              }
            >
              Schedule An Interview
            </Button>
            <Button
              variant="primary"
              htmlType="submit"
              onClick={() =>
                navigate(`/jobs/job-description/candidate/${jobId}/candidate-schedule-interview/${candidate}`, {
                  state: {
                    ...state,
                    type: 'assignTask',
                  },
                })
              }
            >
              Assign a Task
            </Button>
          </ButtonWrapperSection>
        </InterviewWrapper>
      )}
      <SignOff isDone={interviewData?.isDone === 1 ? true : false} data={data} refetch={refetch} />
    </>
  )
}

export default CanidateInterview
