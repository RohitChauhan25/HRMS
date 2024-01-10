import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { Select } from 'antd'
import useGet from 'hooks/useGet'
import usePost from 'hooks/usePost'
import usePatch from 'hooks/usePatch'
import { updateValue } from 'store/slice/jobApplicationSwitch'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Hiringstage from 'views/Modals/AddHiringStage'
import { HiringStageTypes, RoleDataType, StepperInterface } from 'interfaces'
import { Label, MainContainer, Buttons } from 'styles/views/Jobs/JobPostForm'
import {
  FlowContainer,
  StagesTitle,
  StageType,
  StageName,
  StageNameDesign,
  SelectRole,
  DroppableDiv,
  ProvidedDiv,
} from 'styles/views/Jobs/JobWorkflow'

const JobWorkflow = ({ prev, next }: StepperInterface) => {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState<boolean>(false)
  const [roles, setRoles] = useState([])
  const [selectedRoles, setSelectedRoles] = useState<any>([])
  const { mutateAsync } = usePost()
  const { mutateAsync: mutateAsync2 } = usePatch()
  const dispatch = useDispatch()
  const [savedData, setSavedData] = useState([])
  const jobPostId = useSelector((state: any) => state.JobPostData.id)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const { data: getRole, refetch: refetchRole } = useGet('auth-role', `auth/role`, {
    token: true,
  })

  const getJobPostIdFromLocalStorage = () => {
    return jobPostId
  }

  const { data: getStages, refetch: refetchStages } = useGet(
    '/job/hiring-stage2-role',
    `/job/hiring-stage2-role?jobPostId=${getJobPostIdFromLocalStorage()}`,
    {
      token: true,
    },
  )

  const { data: gethiringstage, refetch: refetchhiringstage } = useGet(
    '/job/master/hiringstages',
    `/job/master/hiringstages`,
    {
      token: true,
    },
  )

  useEffect(() => {
    refetchRole()
    dispatch(updateValue('1'))
  }, [])

  useEffect(() => {
    if (getRole?.length > 0) {
      setRoles(
        getRole.map((item: RoleDataType) => {
          return {
            label: item?.roleName,
            value: item?.id,
          }
        }),
      )
    }
  }, [getRole])

  useEffect(() => {
    refetchhiringstage()
  }, [])

  useEffect(() => {
    const jobPostId = getJobPostIdFromLocalStorage()
    setItems(gethiringstage)
    setSelectedRoles(
      gethiringstage?.map((item: HiringStageTypes, index: number) => {
        return {
          seqNum: index,
          roleId: '',
          hiringStageId: item?.id,
          jobPostId: jobPostId,
        }
      }),
    )
  }, [gethiringstage])

  const handleClick = async () => {
    try {
      const res = await mutateAsync({
        url: `/job/hiring-stage2-role`,
        payload: selectedRoles,
        token: true,
      })
      if (res) {
        return res
      }
    } catch (error) {
      return { error: error }
    }
  }

  useEffect(() => {
    refetchStages()
  }, [])

  useEffect(() => {
    if (getStages?.length > 0) {
      const modifiedData = getStages?.map((item: any) => {
        return {
          id: item?.hiringStage?.id,
          stageName: item?.hiringStage?.stageName,
          seqNum: item?.seqNum,
          roleId: item?.roleId,
          jobPostId: item?.jobPostId,
        }
      })
      setItems(modifiedData)
      setSavedData(modifiedData)
      setSelectedRoles(
        modifiedData?.map((data: any, index: number) => {
          return {
            seqNum: index,
            roleId: data?.roleId,
            hiringStageId: data?.id,
            jobPostId: data?.jobPostId,
          }
        }),
      )
    }
  }, [getStages])

  const onDragEnd = (result: any) => {
    if (result?.destination && result?.destination?.index >= 0) {
      const newItems = Array.from(items)
      newItems.splice(result?.source?.index, 1)
      newItems.splice(result.destination.index, 0, items[result?.source?.index])
      setItems(newItems)
    } else {
      return
    }
  }

  const ChangeRole = async (selectedRoleId: string, item: any) => {
    const payload = {
      roleId: selectedRoleId,
      seqNum: item.seqNum,
      hiringStageId: item.id,
      jobPostId: item?.jobPostId,
    }
    try {
      const res = await mutateAsync2({
        url: `/job/hiring-stage2-role?hiringStageId=${item.id}&jobPostId=${item?.jobPostId}`,
        payload: payload,
        token: true,
      })
      if (res) {
        setSavedData([])
        refetchStages()
        return res
      }
    } catch (error) {
      return { error: error }
    }
  }

  const handleNext = () => {
    next?.()
  }

  return (
    <MainContainer>
      <FlowContainer>
        <Label>Recruiting Workflow Template</Label>
        <StagesTitle>Hiring Stages</StagesTitle>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <DroppableDiv {...provided.droppableProps} ref={provided.innerRef}>
                {savedData?.length > 0
                  ? savedData?.map((item: any, index: number) => (
                      <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                        {(provided) => (
                          <ProvidedDiv
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <StageType>
                              <StageName color={activeColor}>
                                <StageNameDesign color={activeColor} />
                                {index + 1}. {item?.stageName || item?.hiringStage?.stageName}
                                <SelectRole>
                                  {item?.roleId ? (
                                    <Select
                                      value={item?.roleId}
                                      options={roles?.length > 0 ? roles : []}
                                      placeholder="Select Role"
                                      onChange={(selectedRoleId: any) => {
                                        ChangeRole(selectedRoleId, item)
                                      }}
                                    />
                                  ) : (
                                    <Select
                                      options={roles?.length > 0 ? roles : []}
                                      placeholder="Select Role"
                                      onChange={(selectedRoleId: any) => {
                                        ChangeRole(selectedRoleId, item)
                                      }}
                                    />
                                  )}
                                </SelectRole>
                              </StageName>
                            </StageType>
                          </ProvidedDiv>
                        )}
                      </Draggable>
                    ))
                  : items?.map((item: any, index: number) => {
                      return (
                        <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                          {(provided) => (
                            <ProvidedDiv
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <StageType>
                                <StageName color={activeColor}>
                                  <StageNameDesign color={activeColor} />
                                  {index + 1}. {item?.stageName || item?.hiringStage?.stageName}
                                  <SelectRole>
                                    <Select
                                      defaultValue={item?.roleId}
                                      options={roles?.length > 0 ? roles : []}
                                      placeholder="select Role"
                                      onChange={(selectedRoleId: any) => {
                                        const updatedSelectedRoles = [...selectedRoles]
                                        updatedSelectedRoles[index].roleId = selectedRoleId
                                        setSelectedRoles(updatedSelectedRoles)
                                      }}
                                    />
                                  </SelectRole>
                                </StageName>
                              </StageType>
                            </ProvidedDiv>
                          )}
                        </Draggable>
                      )
                    })}
                {provided.placeholder}
              </DroppableDiv>
            )}
          </Droppable>
        </DragDropContext>

        <Buttons>
          <Button type={'reset'} label={'Back'} variant={'text'} onClick={prev} />
          {savedData?.length > 0 && <Button variant={'text'} onClick={next} label={'Next'} />}
          <Button
            type={'submit'}
            label={'Save & Continue'}
            variant={'contained'}
            onClick={() => {
              handleNext()
              handleClick()
            }}
            style={{ backgroundColor: activeColor }}
          />
        </Buttons>
      </FlowContainer>
      <Modal isOpen={modal}>
        <Hiringstage setModal={setModal} items={items} setitems={setItems} />
      </Modal>
    </MainContainer>
  )
}

export default JobWorkflow
