import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import usePut from 'hooks/usePut'
import useGet from 'hooks/useGet'
import Button from 'components/Button'
import Modal from 'components/Modal'
import SelectContainer from 'components/Select'
import AddMemberModal from 'views/Modals/AddMemeberModal'
import JobDescriptionDetails from 'views/JobDescription'
import RightIcon from 'assets/svg/RightArrowIcon'
import {
  Container,
  ContentWrapper,
  TitleSection,
  JobCreateTitle,
  JobTitle,
  StepperContainer,
} from 'styles/pages/CreateJob'
import {
  JobTitleContainer,
  JobNameContainer,
  JobName,
  JobType,
  JobStatusContainer,
  JobStatus,
  StatusTypeSelect,
  TimelineContainer,
  TypeName,
  DaysNumber,
  ButtonContainer,
} from 'styles/pages/JobDescription'

const JobDescription = () => {
  const { state } = useLocation()
  const { control, setValue } = useForm()
  const { mutateAsync: updateAsync } = usePut()
  const [addModal, setaddModal] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const role = useSelector((state: any) => state?.user?.user?.role?.roleName)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const { data, refetch } = useGet('getJobData', `/job/details/${id}`, {
    token: true,
  })

  const jobStatus = [
    { value: 'open', label: 'Open' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'closed', label: 'Closed' },
  ]

  const handleStatusChange = async (e: string) => {
    try {
      await updateAsync({
        url: 'job/form',
        payload: {
          jobPostId: id,
          subStatus: e,
        },
        token: true,
      })
    } catch (error: any) {
      return { error: error?.response?.data?.message }
    }
  }

  useEffect(() => {
    const filteredData = jobStatus?.filter((item) => item?.value == data?.data?.subStatus.toLowerCase())
    setValue('statusType', { label: filteredData?.[0]?.label, value: filteredData?.[0]?.value })
  }, [data])

  useEffect(() => {
    refetch()
  }, [id])

  const toggleAdd = () => {
    setaddModal(!addModal)
  }
  const currentDate = new Date()
  const createdAtDate = new Date(data?.data?.createdAt)
  const difference = currentDate.getTime() - createdAtDate.getTime()
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
  return (
    <Container>
      <ContentWrapper>
        <TitleSection>
          <JobTitle color={activeColor}>Jobs </JobTitle>
          <RightIcon />
          <JobCreateTitle color={activeColor}>Job: Financial Analyst</JobCreateTitle>
        </TitleSection>
        <JobTitleContainer>
          <JobNameContainer>
            <JobName>Finacial Analyst</JobName>
            <JobType>Finance. Remote Worker</JobType>
          </JobNameContainer>
          {role === 'teammember' ? (
            <JobStatusContainer>
              <TypeName>Job Status:</TypeName>
              <DaysNumber>{data?.data?.status}</DaysNumber>
            </JobStatusContainer>
          ) : (
            <JobStatusContainer>
              <JobStatus>Job Status:</JobStatus>
              <StatusTypeSelect>
                <SelectContainer
                  control={control}
                  name="statusType"
                  options={jobStatus}
                  placeholder="Type"
                  handleValue={(e: any) => handleStatusChange(e)}
                />
              </StatusTypeSelect>
            </JobStatusContainer>
          )}
        </JobTitleContainer>
        <JobTitleContainer>
          <TimelineContainer>
            <TypeName>Open:</TypeName>
            <DaysNumber>{totalDays}</DaysNumber>
          </TimelineContainer>
          {role === 'teammember' ? null : (
            <ButtonContainer>
              <Button label={'Add Team Member'} variant={'outline'} onClick={() => setaddModal(!addModal)} />
              {state?.prop1 === 'Open' ? null : (
                <Button
                  label={'Edit Job Opening'}
                  variant={'contained'}
                  onClick={() => {
                    navigate(`/jobs/create-job/${id}`)
                  }}
                />
              )}
            </ButtonContainer>
          )}
        </JobTitleContainer>
        <StepperContainer>
          <JobDescriptionDetails detail={data} />
        </StepperContainer>
      </ContentWrapper>
      <Modal isOpen={addModal} className="modal">
        <AddMemberModal toggleadd={toggleAdd} jobPostId={id + ''} refetch={refetch} usersList={[]} />
      </Modal>
    </Container>
  )
}

export default JobDescription
