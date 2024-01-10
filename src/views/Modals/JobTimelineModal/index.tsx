import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { DatePicker, notification } from 'antd'
import dayjs from 'dayjs'
import usePut from 'hooks/usePut'
import Button from 'components/Button'
import CrossIcon from 'assets/svg/CrossIcon'
import { CancelButton, SaveButton } from 'styles/views/Jobs/JobPostForm'
import {
  TimelineFormContainer,
  JobTimelineModalContainer,
  Cross,
  ModalButtons,
  DataWrapper,
  DateContainer,
  DateLabel,
  TimelineModalTitle,
  HeadSection,
} from 'styles/components/Modal'

const JobTimelineModal = ({ toggle, triggerNext, jobTimeline }: any) => {
  const { RangePicker } = DatePicker
  const [dates, setDates] = useState<any>({})
  const [isDateChanged, setIsDateChanged] = useState(false)
  const { handleSubmit } = useForm()
  const { mutateAsync } = usePut()
  const jobPostId = window?.localStorage.getItem('postId')
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const disabledDate = (current: any) => {
    const today = dayjs()
    const currentMonth = dayjs(current).startOf('month')

    // Disable dates in the past only for the current month
    return currentMonth.isSame(today.startOf('month')) && current.date() < today.date()
  }

  const formData = async () => {
    const payload = {
      startDate: dates[0] + 'T00:00:00.000Z',
      endDate: dates[1] + 'T00:00:00.000Z',
    }

    if (dates?.length) {
      try {
        const res = await mutateAsync({
          url: `job/jobpost/dateTime/${jobPostId ? jobPostId : jobTimeline?.id}`,
          payload,
          token: true,
        })
        if (res.msg) {
          notification.success({
            message: '',
            description: res.msg,
            duration: 2,
          })
          triggerNext()
        } else {
          notification.error({
            message: '',
            description: "You Don't Have Permission To Update Timeline",
            duration: 2,
          })
        }
      } catch (error) {
        return { error: error }
      }
    }
  }

  return (
    <TimelineFormContainer onSubmit={handleSubmit(formData)}>
      <JobTimelineModalContainer>
        <HeadSection>
          <TimelineModalTitle>Assign Job Timeline</TimelineModalTitle>
          <Cross onClick={toggle}>
            <CrossIcon />
          </Cross>
        </HeadSection>
        <DataWrapper>
          <DateLabel>Job Timeline</DateLabel>
          <DateContainer>
            <RangePicker
              onChange={(value, dateString) => {
                if (Array.isArray(value)) setDates(dateString)
                setIsDateChanged(true)
              }}
              disabledDate={(current) => disabledDate(dayjs(current))}
              value={
                dates.length
                  ? [dayjs(dates[0]), dayjs(dates[1])]
                  : [
                      dayjs(jobTimeline?.startDate).isValid() ? dayjs(jobTimeline?.startDate) : null,
                      dayjs(jobTimeline?.endDate).isValid() ? dayjs(jobTimeline?.endDate) : null,
                    ]
              }
            />
          </DateContainer>
        </DataWrapper>
        <ModalButtons>
          <CancelButton onClick={toggle}>Back</CancelButton>
          {jobTimeline?.startDate && (
            <Button variant={'text'} onClick={triggerNext} label={'Next'} className="timeline_button" />
          )}
          <SaveButton type="submit" disabled={!isDateChanged} style={{ backgroundColor: activeColor }}>
            Save & Continue
          </SaveButton>
        </ModalButtons>
      </JobTimelineModalContainer>
    </TimelineFormContainer>
  )
}

export default JobTimelineModal
