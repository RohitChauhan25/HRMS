import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Steps } from 'antd'
import useGet from 'hooks/useGet'
import { updateApprovalStep } from 'store/slice/jobApplicationSwitch'
import JobPostForm from 'views/Jobs/JobPostForm'
import JobApplication from 'views/Jobs/JobApplication'
import JobWorkflow from 'views/Jobs/JobWorkflow'
import JobTeamAssignment from 'views/Jobs/JobTeamAssignment'
import PublishJob from 'views/Jobs/PublishJob'
import { StepsContainer, StepTitleContainer, StepNumber, StepTitle } from 'styles/pages/CreateJob'

const Stepper = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const Permission = useSelector((state: any) => state.JobStepperPermission?.allPermission)
  const { data: getStepData, refetch } = useGet('getUser-StepInfo', `job/form/step/${id}`, { token: true })
  const { approvalStep } = useSelector((state: any) => state.jobApplicationSwitch)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (getStepData?.stepNumber) setCurrent(getStepData?.stepNumber)
    else if (approvalStep === 3) {
      setCurrent(approvalStep)
      dispatch(updateApprovalStep(1))
    }
  }, [getStepData])
  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  useEffect(() => {
    if (id) {
      refetch()
    }
  }, [])

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
      content: <JobPostForm next={next} prev={prev} />,
    },
    {
      step: 2,
      title: (
        <StepTitleContainer>
          <StepNumber>Step 2</StepNumber>
          <StepTitle>Job Application</StepTitle>
        </StepTitleContainer>
      ),

      description: 'Filled by candidate',
      content: <JobApplication next={next} prev={prev} />,
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
      content: <JobWorkflow next={next} prev={prev} />,
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
      content: <JobTeamAssignment next={next} prev={prev} />,
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
      content: <PublishJob prev={prev} />,
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
        <div>{steps[current]?.content}</div>
      </StepsContainer>
    </>
  )
}

export default Stepper
