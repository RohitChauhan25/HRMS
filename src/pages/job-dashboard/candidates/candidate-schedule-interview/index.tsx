import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { DatePicker, Select, TimePicker, Switch } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import moment from 'moment'
import { yupResolver } from '@hookform/resolvers/yup'
import useGet from 'hooks/useGet'
import usePost from 'hooks/usePost'
import data from 'constants/jobPostData'
import { noFoundOption } from 'constants/dataNotFound'
import { Dateformat, timeFormate } from 'constants/date'
import { sessionPlaceholder } from 'constants/feedbackMessage'
import { VALIDATION_SCHEMA } from 'utils/validators/interviewSchedule'
import Calendar from 'components/Calender'
import TextinputContainer from 'components/TextInput'
import CopyToClipboardButton from 'components/CopytoClipboard'
import Editor from 'pages/editor'
import { QueryParamTypes } from 'interfaces'
import FinanceIcon from 'assets/svg/FinanceIcon'
import PhoneIcon from 'assets/svg/PhoneIcon'
import LocationNewIcon from 'assets/svg/LocationNewIcon'
import EmailNewIcon from 'assets/svg/EmailNewIcon'
import RightIcon from 'assets/svg/RightArrowIcon'
import { ErrorMessage } from 'styles/components/Modal'
import { Container, ContentWrapper, TitleSection, JobCreateTitle, JobTitle } from 'styles/pages/CreateJob'
import {
  JobTitleContainer,
  JobNameContainer,
  JobName,
  JobType,
  InformationSection,
  ScheduleSection,
  FirstSection,
  SecondSection,
  Label,
  DescriptionContainer,
  DateSection,
  SubDateSection,
  MainDateSection,
  ToggleSection,
  AnalystSection,
  Time,
  Heading,
  MeetSection,
  Link,
  ButtonWrapper,
  RejectButton,
  MoveButton,
  ParticipantsSection,
} from 'styles/pages/CandidateInterview'

const CandidateScheduleInterview = () => {
  const { state } = useLocation()
  const [statusTitle, setStatusTitle] = useState(data)
  const [allEvents, setAllEvents] = useState<any>([])
  const [events, setEvents] = useState<any>([])
  const [isChecked, setIsChecked] = useState(false)
  const { jobPostId, id } = useParams() as QueryParamTypes
  const jobId = parseInt(jobPostId)
  const navigate = useNavigate()
  const candidate = parseInt(id)
  const { mutateAsync } = usePost()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const handleToggleChange = (checked: any) => {
    setIsChecked(checked)
  }
  const user = useSelector((state: any) => state.user?.user)
  const {
    setValue,
    control,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(VALIDATION_SCHEMA),
    defaultValues: {
      email: '',
      eventEmail: '',
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      body: '',
      participants: [],
      jobTitle: '',
    },
  })
  const ShowError: any = errors
  const [emaiChange, setEmailChange] = useState(true)
  const { refetch } = useGet('getJob-form', `job/form/${id}`, {
    token: true,
  })
  const watchAllFields = watch()
  const { data: getEvents, refetch: eventsFetch } = useGet(
    'get-calnder-events',
    `job/candidate/getevents/'${watchAllFields.eventEmail}'`,
    {
      token: true,
    },
  )

  // perform side effects when get events from google calender
  useEffect(() => {
    if (getEvents) {
      const data = {
        email: watchAllFields.eventEmail,
        data: getEvents,
      }
      const randomColor = Math.floor(Math.random() * 16777215).toString(16)
      setAllEvents((oldArray: any) => [...oldArray, data])
      const modifyData = getEvents?.map((item: any) => {
        return {
          ...item,
          color: '#' + randomColor,
          title: item.eventDetails,
        }
      })
      setEvents((oldArray: any) => [...oldArray, ...modifyData])
    }
  }, [getEvents])

  useEffect(() => {
    eventsFetch()
  }, [emaiChange])

  const handleFieldFocus = (fieldName: string) => {
    const updatedStatusTitle = statusTitle.map((item) => {
      if (item.key === fieldName) {
        return { ...item, focused: true }
      } else {
        return { ...item, focused: false }
      }
    })

    setStatusTitle(updatedStatusTitle)
  }

  useEffect(() => {
    if (id) {
      refetch()
    }
  }, [])

  //  create event on google calender
  const onSubmit = async (values: any) => {
    const tempStartTime = moment(values.date + values.startTime, 'YYYY-MM-DDLT')
    const convertedStartTIme = tempStartTime.format('YYYY-MM-DDTHH:mm:s')
    const tempEndTime = moment(values.date + values.endTime, 'YYYY-MM-DDLT')
    const convertedEndTIme = tempEndTime.format('YYYY-MM-DDTHH:mm:s')

    const payload = {
      starttime: convertedStartTIme,
      endtime: convertedEndTIme,
      title: values.title,
      body: values.body,
      participants: values.participants,
    }
    try {
      const response = await mutateAsync({
        url: `/job/candidate/schedule?userId=${user.id}&jobPostId=${jobId}&hiringStageId=2&candidateId=${candidate}`,
        payload: payload,
      })
      if (response) {
        navigate(-1)
        return response
      }
    } catch (error) {
      return error
    }
  }

  //getting data for participation suggestion
  const { data: emailSuggest, refetch: emailRefetch } = useGet(
    'auth-userDetails',
    `auth/userDetails?search=${watchAllFields.email}`,
    {
      token: true,
    },
  )

  // this function is used to remove all calender events related to respected email
  const removeEvents = (e: any) => {
    const filterData = allEvents?.filter((item: any) => item.email !== e.label)
    const temp: any = []
    filterData?.map((item: any) => item?.data?.map((innerItem: any) => temp.push(innerItem)))
    setEvents(temp)
    setAllEvents(filterData)
  }

  return (
    <Container>
      <ContentWrapper>
        <TitleSection>
          <JobTitle color={activeColor}>Jobs </JobTitle>
          <RightIcon />
          <JobTitle color={activeColor}>Candidates</JobTitle>
          <RightIcon />
          <JobTitle color={activeColor}>
            Candidate: {state?.firstName} {state?.lastName}
          </JobTitle>
          <RightIcon />
          <JobCreateTitle color={activeColor}>Schedule Interview</JobCreateTitle>
        </TitleSection>
        <JobTitleContainer>
          <JobNameContainer>
            <JobName>
              {state?.firstName} {state?.lastName}
            </JobName>
            <JobType>
              Applied on{' '}
              {state?.appliedDate ? moment(state?.appliedDate).format('DD MMM YYYY') : <div className="">N/A</div>}, (17
              Days ago)
            </JobType>
          </JobNameContainer>
        </JobTitleContainer>
        <InformationSection>
          <div>
            <FinanceIcon />
            Financial Analyst
          </div>
          <div>
            <LocationNewIcon /> Pittsbutgh, PA
          </div>
          <div>
            <EmailNewIcon />
            ihaddington@gmail.com
            <CopyToClipboardButton />
          </div>
          <div>
            <PhoneIcon />
            1-888-232-8873
            <CopyToClipboardButton />
          </div>
        </InformationSection>
      </ContentWrapper>

      <ScheduleSection>
        {state?.type === 'interview' ? (
          <>
            <FirstSection>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <Label>SessionTitle*</Label>
                <TextinputContainer placeholder={sessionPlaceholder} control={control} name={'title'} />
                <ErrorMessage>
                  {errors.title && <span className="error">{ShowError?.title?.message}</span>}
                </ErrorMessage>
                <DateSection>
                  <MainDateSection>
                    <Label>Date</Label>
                    <DatePicker
                      name={'date'}
                      onChange={(date: any) => {
                        date ? setValue('date', moment(new Date(date)).format(Dateformat)) : setValue('date', '')
                        trigger('date')
                      }}
                    />
                    <ErrorMessage>
                      {errors.date && <span className="error">{ShowError?.date?.message}</span>}
                    </ErrorMessage>
                  </MainDateSection>
                  <SubDateSection>
                    <Label>Start Time</Label>
                    <DownOutlined />
                    <TimePicker
                      format={timeFormate}
                      onChange={(time: any) => {
                        setValue('startTime', new Date(time).toLocaleTimeString())
                        trigger('startTime')
                      }}
                      allowClear={false}
                      minuteStep={15}
                      name="starTime"
                    />
                    <ErrorMessage>
                      {errors.startTime && <span className="error">{ShowError?.startTime?.message}</span>}
                    </ErrorMessage>
                  </SubDateSection>
                  <SubDateSection>
                    <Label>End Time</Label>
                    <DownOutlined />
                    <TimePicker
                      format={timeFormate}
                      onChange={(time: any) => {
                        setValue('endTime', new Date(time).toLocaleTimeString())
                        trigger('endTime')
                      }}
                      allowClear={false}
                      minuteStep={15}
                      name="endTime"
                    />
                    <ErrorMessage>
                      {errors.endTime && <span className="error">{ShowError?.endTime?.message}</span>}
                    </ErrorMessage>
                  </SubDateSection>
                </DateSection>

                <Label>Participants</Label>
                <ParticipantsSection>
                  <Select
                    mode="multiple"
                    showSearch={true}
                    style={{ width: '100%', cursor: 'auto' }}
                    labelInValue
                    filterOption={false}
                    onSelect={(e) => {
                      setValue('eventEmail', e.label)
                      setEmailChange(!emaiChange)
                      const newParticipant: any = [...watchAllFields.participants, { id: e.value, email: e.label }]
                      setValue('participants', newParticipant)
                      trigger('participants')
                    }}
                    onDeselect={(e) => removeEvents(e)}
                    options={
                      emailSuggest?.data?.length
                        ? emailSuggest?.data?.map((item: any) => {
                            return {
                              value: item?.id,
                              label: item?.email,
                            }
                          })
                        : noFoundOption
                    }
                    onSearch={(e: any) => {
                      setValue('email', e)
                      if (e?.length > 2) emailRefetch()
                    }}
                  />
                  <ErrorMessage>
                    {errors.participants && <span className="error">{ShowError?.participants?.message}</span>}
                  </ErrorMessage>
                </ParticipantsSection>

                <Label>Email Body*</Label>
                <DescriptionContainer>
                  <Controller
                    name="body"
                    control={control}
                    render={({ field }: any) => (
                      <ReactQuill
                        {...field}
                        placeholder={'Email Message'}
                        onChange={(text) => {
                          field.onChange(text)
                        }}
                        onFocus={() => handleFieldFocus('jobDescription')}
                      />
                    )}
                  />
                </DescriptionContainer>
                <ErrorMessage>
                  <ErrorMessage>
                    {errors.body && <span className="error">{ShowError?.body?.message}</span>}
                  </ErrorMessage>
                </ErrorMessage>
                <ToggleSection>
                  <Switch checked={isChecked} onChange={handleToggleChange} />
                  Attach Calender email(ICS) to email
                </ToggleSection>
                <AnalystSection>
                  Financial Analyst - Mojes William
                  <Time>
                    <div>4:00 am</div> <div>5:00 am</div>
                  </Time>
                </AnalystSection>
                <Heading>Google meet link</Heading>
                <MeetSection>Join With Google Meet</MeetSection>
                <Link>meet.google.com/jjn-u</Link>
                <ButtonWrapper>
                  <RejectButton>Back</RejectButton>
                  <MoveButton>Send Invites</MoveButton>
                </ButtonWrapper>
              </form>
            </FirstSection>
            <SecondSection>
              <Calendar events={events} />
            </SecondSection>
          </>
        ) : (
          <Editor />
        )}
      </ScheduleSection>
    </Container>
  )
}

export default CandidateScheduleInterview
