import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import 'react-quill/dist/quill.snow.css'
import { notification } from 'antd'
import usePost from 'hooks/usePost'
import CollapseFun from '../collapse'
import { SaveAsDraft } from 'constants/labels'
import { PlaceHolder } from 'constants/placeholderData'
import { CombinedData } from 'interfaces/job'
import { IFormDynamicData } from 'interfaces'
import useGet from 'hooks/useGet'
import Dropables from 'components/Dropables'
import TextinputContainer from 'components/TextInput'
import Button from 'components/Button'
import SelectContainer from 'components/Select'
import {
  Form,
  FormText,
  FormContainer,
  ApprovalSection,
  ApprovalWrapper,
  ApprovalContainer,
  LocationLabel,
} from 'styles/views/Jobs/JobPostForm'
import { MainWrapper, MainContainer, FieldOptionsContainer, ButtonSection } from 'styles/components/Dropables'

const DynamicForm = ({ allForms, newForm }: any) => {
  const [keyValuePairs, setKeyValuePairs] = useState<any>([])
  const [matchedId, setMatchId] = useState<any>()
  const [widgets, setWidgets] = useState<any>([])
  const { mutateAsync } = usePost()
  const postId = localStorage?.getItem('postId')
  const current1 = useSelector((state: any) => state?.currentSlice?.currentIndex)
  const { handleSubmit, control } = useForm<IFormDynamicData>()

  const { data: userData, refetch: userProfile } = useGet('get-user', `/auth/user/profile`, { token: true })

  const parentId = userData?.parentUserId

  const { data: approvalsData, refetch: fetchapprovals } = useGet('get-approvals', `/auth/user/${parentId}`, {
    token: true,
  })

  const { data: dataForm, refetch: dataFormReftch } = useGet('get-AllForms', `job/form/${matchedId}`, {
    token: true,
  })

  const approvalUserId = approvalsData?.email

  useEffect(() => {
    const filteredPairs = keyValuePairs?.find((pair: any) => pair.current1 === current1)
    setMatchId(filteredPairs?.id)
  }, [current1])

  const requiredApprovals: any = [
    {
      value: approvalsData?.id,
      label: approvalsData?.userName,
      employmenTypeId: approvalsData?.id,
    },
  ]

  const formData = async (data: any) => {
    const formattedObjects = widgets?.map((obj: any, index: number) => ({
      label: obj?.label,
      name: obj?.name,
      description: obj?.description,
      type: obj?.type,
      isRequired: obj?.isRequired,
      seqNumber: index,
      pattern: '^[^\\s].*',
      defaultValue: obj?.defaultValue || {},
    }))

    const payload = {
      formFields: formattedObjects,
      seqNumber: Math.floor(Math.random() * 1000 + 1),
      name: data?.formTitle,
      approverUserId: parentId,
      approverEmail: approvalUserId,
      jobPostId: postId,
    }

    try {
      const response = await mutateAsync({
        url: 'job/form',
        payload,
        token: true,
      })

      if (response) {
        const id = response?.id
        setKeyValuePairs((prevKeyValuePairs: any) => [...prevKeyValuePairs, { current1, id }])

        notification.success({
          message: '',
          description: 'Form Created successfully!',
        })
      }
    } catch (error: any) {
      if (error?.response?.data?.statusCode) {
        notification.error({
          message: '',
          description: error?.response?.data?.message,
          duration: 2,
        })
      }
    }
  }

  const handleDelete = (index: number) => {
    const updatedWidgets = [...widgets]
    updatedWidgets?.splice(index, 1)
    const updatedInputFields = updatedWidgets?.map((field: any, index: any) => {
      return {
        ...field,
        // Set the seqNumber to the index
        seqNumber: index,
      }
    })
    setWidgets(updatedInputFields)
    // Get the field name from the widget at the specified index
    const fieldName = widgets[index]?.label
    if (fieldName) {
      // Unregister the field from the form
      control.unregister(fieldName)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    const widgetType = e?.dataTransfer?.getData('widgetType') as string
    const widgetTypeObject = JSON.parse(widgetType)
    widgetTypeObject.id = Math.random()
    const dropWidgets = [...widgets, widgetTypeObject]
    const updatedInputFields = dropWidgets?.map((field: any, index: any) => {
      return {
        ...field,
        seqNumber: index, // Set the seqNumber to the index
      }
    })
    setWidgets(updatedInputFields)
  }

  const onDragEnd: any = (result: CombinedData) => {
    if (!result?.destination) return
    const sourceIndex = result?.source?.index
    const destinationIndex = result?.destination?.index
    if (sourceIndex === destinationIndex) return
    const items = Array.from(widgets)
    const updatedInputFields = items?.map((field: any, index: any) => {
      return {
        ...field,
        seqNumber: index, // Set the seqNumber to the index
      }
    })
    setWidgets(updatedInputFields)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleRequiredChange = (index: number, required: boolean) => {
    const updatedWidgets = [...widgets]
    updatedWidgets[index].isRequired = required
    setWidgets(updatedWidgets)
  }

  const { data: fields, refetch: formFields } = useGet('getField', 'job/field', { token: true })

  useEffect(() => {
    formFields()
  }, [newForm])

  useEffect(() => {
    if (matchedId && matchedId !== 'undefined') {
      dataFormReftch()
    }
  }, [matchedId])

  useEffect(() => {
    userProfile()
    if (matchedId && matchedId !== 'undefined') {
      dataFormReftch()
    }
  }, [matchedId, dataFormReftch])

  useEffect(() => {
    if (dataForm?.formFields && matchedId != 'undefined') {
      setWidgets(dataForm?.formFields)
    } else {
      setWidgets([])
    }
  }, [dataForm, current1])

  useEffect(() => {
    userProfile()

    if (allForms[current1 - 1]?.formFields) {
      setWidgets(allForms[current1 - 1]?.formFields)
    } else {
      setWidgets([])
    }
  }, [current1])

  useEffect(() => {
    if (parentId) {
      fetchapprovals()
    }
  }, [parentId])

  return (
    <MainWrapper>
      <MainContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided: any) => (
              <FormContainer ref={provided.innerRef} {...provided.droppableProps}>
                <Form
                  onSubmit={handleSubmit(formData)}
                  className="form"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <TextinputContainer
                    placeholder={PlaceHolder.formTitle}
                    control={control}
                    name="formTitle"
                    defaultValue={allForms[current1 - 1]?.name || dataForm[current1 - 1]?.name}
                  />
                  {widgets?.length === 0 && <FormText>Please drag your fields here</FormText>}
                  {widgets?.map((widget: any, index: number) => (
                    <Draggable key={widget?.id} draggableId={widget?.id?.toString()} index={index}>
                      {(provided: any) => (
                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided?.innerRef}>
                          <div className="dropped-widget" key={index}>
                            <Controller
                              name={widget?.label}
                              control={control}
                              defaultValue={widget}
                              render={({ field }) => (
                                <CollapseFun
                                  all={widgets}
                                  setAll={setWidgets}
                                  handleDelete={handleDelete}
                                  index={index}
                                  required={widget.isRequired} // Pass the required prop from the widget
                                  onRequiredChange={(required: any) => handleRequiredChange(index, required)} // Pass the callback
                                  {...field}
                                  widget={widget}
                                />
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <ApprovalSection length={widgets?.length}>
                    <ApprovalWrapper>
                      <ApprovalContainer>
                        <LocationLabel>Required for Approval*</LocationLabel>
                        <SelectContainer
                          control={control}
                          name="employmentType"
                          options={requiredApprovals}
                          defaultValue={allForms[current1 - 1]?.approverUserId}
                        />
                      </ApprovalContainer>
                      <ButtonSection>
                        <Button label={SaveAsDraft} variant="outline" className="formSubmit" />
                      </ButtonSection>
                    </ApprovalWrapper>
                  </ApprovalSection>
                </Form>
              </FormContainer>
            )}
          </Droppable>
        </DragDropContext>

        <FieldOptionsContainer>
          <Dropables fields={fields} />
        </FieldOptionsContainer>
      </MainContainer>
    </MainWrapper>
  )
}

export default DynamicForm
