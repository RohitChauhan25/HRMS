import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGet from 'hooks/useGet'
import { Steps } from 'antd'
import Button from 'components/Button'
import { AddForm, Back, Delete, Next } from 'constants/labels'
import JobPostForm from 'views/Jobs/JobPostForm'
import { decrementCurrent, incrementCurrent } from 'store/slice/currentIndex'
import PublishWorkflow from './publishModal'
import DynamicForm from './dynamicForm'
import { FormButton } from 'styles/components/Dropables'
import { StepsContainer, StepTitleContainer, StepTitle } from 'styles/pages/CreateJob'

const WorkflowStepper = () => {
  const [newForm, setNewForm] = useState<boolean>(true)
  const [disbaled, setDisabled] = useState(true)
  const [disbaledAddform, setDisabledAddform] = useState(true)
  const dispatch = useDispatch()
  const postId = localStorage.getItem('postId')
  const current1 = useSelector((state: any) => state?.currentSlice?.currentIndex)

  const { data: allForms, refetch: allFomsRefetch } = useGet('get-AllForms', `job/form/all/${postId}`, { token: true })

  const next = () => {
    dispatch(incrementCurrent())
  }

  const prev = () => {
    dispatch(decrementCurrent())
  }

  const disabledNext = (value: boolean) => {
    setDisabled(value)
  }

  const disabledAddFormButton = (value: boolean) => {
    setDisabledAddform(value)
  }

  const enableAll = (value: boolean) => {
    setDisabled(value)
    setDisabledAddform(value)
  }

  const [steps, setSteps] = useState<any>([
    {
      step: 1,
      title: (
        <StepTitleContainer>
          <StepTitle>Job Post Form</StepTitle>
        </StepTitleContainer>
      ),
      content: (
        <JobPostForm disabledNext={disabledNext} disabledAddFormButton={disabledAddFormButton} enableAll={enableAll} />
      ),
    },
    {
      step: 2,
      title: (
        <StepTitleContainer>
          <StepTitle>Publish Workflow</StepTitle>
        </StepTitleContainer>
      ),
      content: <PublishWorkflow />,
    },
  ])

  const handleAdd = () => {
    setNewForm(!newForm)
    const newStep = {
      step: current1 + 1,
      title: (
        <StepTitleContainer>
          <StepTitle>Form {current1 + 1}</StepTitle>
        </StepTitleContainer>
      ),
      content: <DynamicForm allForms={allForms} newForm={newForm} />,
    }
    const insertAtIndex = current1 + 1
    const updatedSteps = [
      ...steps.slice(0, insertAtIndex),
      newStep,
      ...steps.slice(insertAtIndex).map((step: any) => ({ ...step, step: step?.step + 1 })),
    ]

    setSteps(updatedSteps)
    dispatch(incrementCurrent())
    // setCurrent(current + 1)
  }

  // Removing The Particular Form from The Dynamic Forms
  const handleDelete = () => {
    if (current1 <= 0 || current1 >= steps.length) {
      // Don't delete if it's the first or last step
      return
    }

    const deletedStepIndex = current1 // Remove the step from the steps array

    const updatedSteps = [...steps]

    updatedSteps?.splice(deletedStepIndex, 1) // Update the steps state

    setSteps(updatedSteps)

    // setCurrent(Math.max(current - 1, 0))
  }

  const onRefresh = () => {
    if (allForms?.length > 0) {
      const dynamicFormSteps = allForms?.map((_form: any, index: number) => ({
        step: index + 1, // Start from step 2 since step 1 is already present
        title: (
          <StepTitleContainer>
            <StepTitle>Form {index + 1}</StepTitle>
          </StepTitleContainer>
        ),
        content: <DynamicForm allForms={allForms} />,
      }))

      // Combine dynamic form steps with the existing steps
      const updatedSteps = [
        steps[0], // Step 1 remains unchanged
        ...dynamicFormSteps,
        steps[1], // Step 2 (Publish Workflow) remains unchanged
      ]

      setSteps(updatedSteps)
    }
  }

  useEffect(() => {
    if (postId) {
      allFomsRefetch()
    }
  }, [postId])

  useEffect(() => {
    onRefresh()
  }, [allForms])

  const totalSteps = steps?.length - 1
  const items = steps?.map((item: any) => ({ key: item.title, title: item.title, step: item.step }))

  return (
    <>
      <StepsContainer>
        <Steps current={current1} items={items} />
        <div>{steps[current1]?.content}</div>
        <FormButton>
          {current1 !== totalSteps ? (
            <Button label={AddForm} variant="outline" onClick={handleAdd} disabled={disbaledAddform} />
          ) : (
            <Button label={Back} variant="outline" onClick={prev} className="back-button" />
          )}
          {current1 === 0 && <Button label={Next} variant="contained" onClick={next} disabled={disbaled} />}

          {current1 > 0 && current1 !== totalSteps && (
            <>
              <Button label={Back} variant="outline" onClick={prev} />
              <Button label={Next} variant="contained" onClick={next} disabled={disbaled} />
            </>
          )}
          {current1 === 0 ||
            (current1 !== totalSteps && (
              <Button label={Delete} variant="outline" onClick={handleDelete} className="delete-button" />
            ))}
        </FormButton>
      </StepsContainer>
    </>
  )
}

export default WorkflowStepper
