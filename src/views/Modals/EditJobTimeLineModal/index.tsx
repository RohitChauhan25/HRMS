import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { DatePicker, notification } from 'antd'
import dayjs from 'dayjs'
import usePut from 'hooks/usePut'
import { Next } from 'constants/labels'
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

const EditJobTimeLineModal = ({ toggleTimeLineModal, toggle, jobTimeline }: any) => {
  const { RangePicker } = DatePicker
  const [dates, setDates] = useState<any>({})
  const [isDateChanged, setIsDateChanged] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const { handleSubmit } = useForm()
  const { mutateAsync } = usePut()

  const disabledDate = (current: any) => {
    const today = dayjs()
    const currentMonth = dayjs(current).startOf('month')

    // Disable dates in the past only for the current month
    return currentMonth.isSame(today.startOf('month')) && current.date() < today.date()
  }

  const HandleTimeLineUpdate = async () => {
    const payload = {
      startDate: dates[0] + 'T00:00:00.000Z',
      endDate: dates[1] + 'T00:00:00.000Z',
    }

    if (dates?.length) {
      try {
        const res = await mutateAsync({
          url: `job/jobpost/dateTime/${jobTimeline?.id}`,
          payload,
          token: true,
        })
        if (res?.msg) {
          notification.success({
            message: '',
            description: res.msg,
            duration: 2,
          })
          toggleTimeLineModal()
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
    <TimelineFormContainer onSubmit={handleSubmit(HandleTimeLineUpdate)}>
      <JobTimelineModalContainer>
        <HeadSection>
          <TimelineModalTitle>Assign Job Timeline</TimelineModalTitle>
          <Cross onClick={toggleTimeLineModal ? toggleTimeLineModal : toggle}>
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
          <CancelButton onClick={toggleTimeLineModal ? toggleTimeLineModal : toggle}>Back</CancelButton>
          {jobTimeline?.JobStatus?.status !== 'PUBLISHED' && (
            <Button variant={'text'} onClick={toggleTimeLineModal} label={Next} className="timeline_button" />
          )}
          <SaveButton type="submit" disabled={!isDateChanged} style={{ backgroundColor: activeColor }}>
            Submit
          </SaveButton>
        </ModalButtons>
      </JobTimelineModalContainer>
    </TimelineFormContainer>
  )
}

export default EditJobTimeLineModal
