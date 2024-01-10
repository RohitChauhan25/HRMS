import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Steps } from 'antd'
import useGet from 'hooks/useGet'
import { RootState } from 'store/store'
import EditJobPost from 'views/Jobs/EditJobPostForm/EditJobPost'
import EditJobApplication from 'views/Jobs/EditJobPostForm/EditJobApplication'
import EditJobWorkflow from 'views/Jobs/EditJobPostForm/EditJobWorkFlow'
import EditJobTeamAssignment from 'views/Jobs/EditJobPostForm/EditJobTeamAssignment'
import EditPublishJob from 'views/Jobs/EditJobPostForm/EditPublishJob'
import { StepsContainer, StepTitleContainer, StepNumber, StepTitle } from 'styles/pages/CreateJob'

const EditJobStepper = () => {
  const { id } = useParams()
  const [jobData, setJobData] = useState()
  const [current, setCurrent] = useState(0)
  const { data: getJobData, refetch: refetchJobData } = useGet('job-data', `job/jobpost/${id}`, {
    token: true,
  })
  const Permission = useSelector((state: RootState) => state.JobStepperPermission?.allPermission)

  useEffect(() => {
    refetchJobData()
  }, [id])

  useEffect(() => {
    setJobData(getJobData)
  }, [getJobData])

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const steps = [
    {
      step: 1,
      title: (
        <StepTitleContainer>
          <StepNumber>Step 1</StepNumber>
          <StepTitle>Job Post Form</StepTitle>
        </StepTitleContainer>
      ),
      description: '',
      content: <EditJobPost next={next} prev={prev} getJobData={jobData} refetchJobData={refetchJobData} />,
    },
    {
      step: 2,
      title: (
        <StepTitleContainer>
          <StepNumber>Step 2</StepNumber>
          <StepTitle>Job Application</StepTitle>
        </StepTitleContainer>
      ),
      description: 'To be filled by candidate',
      content: <EditJobApplication next={next} prev={prev} getJobData={jobData} refetchJobData={refetchJobData} />,
    },
    {
      step: 3,
      title: (
        <StepTitleContainer>
          <StepNumber>Step 3</StepNumber>
          <StepTitle>Job Workflow</StepTitle>
        </StepTitleContainer>
      ),
      description: '',
      content: <EditJobWorkflow next={next} prev={prev} getJobData={jobData} refetchJobData={refetchJobData} />,
    },
    {
      step: 4,
      title: (
        <StepTitleContainer>
          <StepNumber>Step 4</StepNumber>
          <StepTitle>Team Assignment</StepTitle>
        </StepTitleContainer>
      ),
      description: '',
      content: <EditJobTeamAssignment next={next} prev={prev} getJobData={jobData} />,
    },
    {
      step: 5,
      title: (
        <StepTitleContainer>
          <StepNumber>Step 5</StepNumber>
          <StepTitle>Publish Job</StepTitle>
        </StepTitleContainer>
      ),
      description: '',
      content: <EditPublishJob prev={prev} getJobData={jobData} />,
    },
  ]

  if (Permission?.length > 0 && !Permission?.includes('hiringStageUsers')) {
    steps.splice(2, 2)
  }

  if (Permission?.length > 0 && !Permission?.includes('jobApplication')) {
    steps.splice(1, 1)
  }

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
    stepnumber: item.step,
  }))
  return (
    <>
      <StepsContainer>
        <Steps current={current} items={items} />
        <div>{steps[current].content}</div>
      </StepsContainer>
    </>
  )
}

export default EditJobStepper
