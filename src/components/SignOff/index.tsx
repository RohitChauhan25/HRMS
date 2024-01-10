import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Avatar } from 'antd'
import { members } from 'constants/ManagingDepartmentMembers'
import usePost from 'hooks/usePost'
import Modal from 'components/Modal'
import Button from 'components/AntdButton'
import Rating from 'components/Rating'
import CommentBox from 'components/TextBox'
import Documents from 'components/Documents'
import { IHiringData, Idata, QueryParamTypes } from 'interfaces'
import CrossIcon from 'assets/svg/CrossIcon'
import AvatarImage from 'assets/images/Avatar.png'
import verticaldot from 'assets/images/dots-vertical.png'
import arrowicon from 'assets/images/arrowIcon.png'
import { ProfileSection, Username } from 'styles/views/Navbar'
import { SignOffModalContainer, CrossModal, Title, Line, LeadInformation } from 'styles/components/Modal'
import {
  HeaderSection,
  Heading,
  SubHeading,
  SignOffSection,
  Form,
  ButtonWrapper,
  ScreeningLine,
  LeadWrapper,
  Wrapper,
  UserSection,
  UserEmail,
  ContentSection,
  UserInterviewSection,
  AvatarSection,
  Time,
  ViewMoreSection,
  SubmitApproveButton,
} from 'styles/pages/Candidates/CandidateDetails/jobWorkflow'

const SignOff = ({ isDone, data, refetch }: IHiringData) => {
  const [signOffData, setSignOffData] = useState<any>([])
  const [approval, setApproval] = useState(false)
  const [modal, setModal] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [headColor] = useState('#000')
  const [backgroundColor, setBackgroundColor] = useState('#f3f5ff')
  const [borderLeft, setborderLeft] = useState('16px solid #1d2e88')
  const { mutateAsync } = usePost()
  const { jobPostId, id } = useParams() as QueryParamTypes
  const jobId = parseInt(jobPostId)
  const candidate = parseInt(id)
  const { handleSubmit, control } = useForm<Idata>()
  const [isComment, setIsComment] = useState(true)
  const toggleContent = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleComment = () => {
    setIsComment(!isComment)
  }

  // give ratings and feedback here  -->
  const onSubmit = async (data: Idata) => {
    const payload = {
      rating: data?.rating,
      comments: data?.comment,
      candidateId: candidate,
      jobPostId: jobId,
      hiringStageId: 3,
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

  // sumit for approval --->>
  const submitForApproval = async () => {
    const payload = {
      candidateId: candidate,
      jobPostId: jobId,
      approvers: members,
    }
    try {
      const res = await mutateAsync({
        url: '/job/candidate/signoff',
        payload: payload,
        token: true,
      })
      if (res) {
        setModal(false)
      }
    } catch (error: any) {
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  useEffect(() => {
    setSignOffData(data?.data[2])
    const approval = data?.data[2]?.data?.find((item: any) => item.approval === 1)
    if (approval) {
      setApproval(true)
      setBackgroundColor('#E8FCF1')
      setborderLeft('16px solid #419E6A')
    }
  }, [data])

  return (
    <>
      {!isDone ? (
        <SignOffSection>
          <HeaderSection>
            <Heading>3. Sign Off</Heading>
          </HeaderSection>
        </SignOffSection>
      ) : signOffData && signOffData?.comments ? (
        <SignOffSection color={backgroundColor} borderleft={borderLeft}>
          <HeaderSection>
            <Heading color={headColor}>3. Sign Off</Heading>
            <SubHeading>Schedule an interview with the candidate.</SubHeading>
          </HeaderSection>
          {!approval && (
            <ButtonWrapper>
              <SubmitApproveButton onClick={() => setModal(true)} bgcolor="#1D2E88" signcolor="#fff">
                Submit For Approval
              </SubmitApproveButton>
            </ButtonWrapper>
          )}
          <ScreeningLine></ScreeningLine>

          <Modal isOpen={modal} className="timeline_modal">
            <SignOffModalContainer>
              <Title>Submit For Approval</Title>
              <CrossModal onClick={() => setModal(false)}>
                <CrossIcon />
              </CrossModal>
              <Line />
              <LeadInformation>
                <Wrapper>
                  {members?.map((mem, index) => (
                    <LeadWrapper key={index}>
                      <Avatar src={<img src={AvatarImage} alt="avatar" />} />
                      <UserSection>
                        <Username>{mem?.name}</Username>
                        <UserEmail>{mem?.email}</UserEmail>
                      </UserSection>
                    </LeadWrapper>
                  ))}
                </Wrapper>

                <Line />
                <ButtonWrapper className="modalbutton">
                  <Button variant={'cancel'} htmlType="reset" onClick={() => setModal(false)}>
                    Cancel
                  </Button>
                  <Button variant={'post'} htmlType="submit" onClick={submitForApproval}>
                    Submit
                  </Button>
                </ButtonWrapper>
              </LeadInformation>
            </SignOffModalContainer>
          </Modal>

          <div>
            {isComment && approval ? (
              <>
                <ViewMoreSection onClick={toggleComment}>
                  View Comments
                  <img src={arrowicon} alt="arrowicon" className="arrow" />
                </ViewMoreSection>
              </>
            ) : (
              <>
                {!isComment && approval && (
                  <ViewMoreSection onClick={toggleComment}>
                    Hide Comments
                    <img src={arrowicon} alt="arrowicon" className="lessarrow" />
                  </ViewMoreSection>
                )}
                <UserInterviewSection>
                  <ProfileSection>
                    <AvatarSection>
                      <Avatar src={<img src={AvatarImage} alt="avatar" />} />
                      <Username>{signOffData?.username}</Username>
                    </AvatarSection>
                    <img src={verticaldot} alt="verticaldot" className="verticaldot" />
                  </ProfileSection>
                  <ContentSection>
                    <Time>{signOffData?.ratingTimeStamp?.substr(0, 16)}</Time>
                    <Rating
                      defaultValue={signOffData?.rating}
                      disabled={signOffData?.rating ? true : false}
                      name="rating"
                      control={control}
                      rules={{ required: true }}
                    />
                    {isExpanded ? (
                      <SubHeading>{signOffData?.comments}</SubHeading>
                    ) : (
                      <SubHeading>{signOffData?.comments?.substr(0, 80)}..</SubHeading>
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
              </>
            )}
          </div>
        </SignOffSection>
      ) : (
        <SignOffSection color={backgroundColor} borderleft={borderLeft}>
          <HeaderSection>
            <Heading color={headColor}>3. Sign Off</Heading>
            <SubHeading>Schedule an interview with the candidate.</SubHeading>
          </HeaderSection>
          <ButtonWrapper>
            <SubmitApproveButton>Submit For Approval</SubmitApproveButton>
          </ButtonWrapper>
          <ScreeningLine></ScreeningLine>

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
        </SignOffSection>
      )}

      <Documents isDone={approval ? true : false} data={data} refetch={refetch} />
    </>
  )
}

export default SignOff
