import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, notification } from 'antd'
import { Modal as DeleteModal } from 'antd'
import { updateCurrentPage, updatepageSize, resetPagination } from 'store/slice/jobApplicationSwitch'
import useDelete from 'hooks/useDelete'
import { RootState } from 'store/store'
import Modal from 'components/Modal'
import UpdateExperienceModal from 'views/Modals/UpdateExperienceModal'
import { Iprops, IUpdateQuestion } from 'interfaces'
import EditIcon from 'assets/svg/EditIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import { OptionWrapper } from 'styles/pages/Workflow'
import { TableWrapper } from 'styles/views/Employees'

const ExperienceList = ({ getExperience, refetchExperience }: Iprops) => {
  const dispatch = useDispatch()
  const { currentPage, pageSize } = useSelector((state: RootState) => state.jobApplicationSwitch)
  const [experienceModal, setExperienceModal] = useState(false)
  const [updateExperience, setUpdateExperience] = useState<IUpdateQuestion>()
  const [experienceId, setExperienceId] = useState<string>()
  const activeColor = useSelector((state: RootState) => state?.colorSlice?.activeColor)
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)

  const { mutateAsync } = useDelete()
  const formattedExperienceData = getExperience?.map((item: any) => {
    return {
      name: `${item.name} (${item.start}-${item.end}) ${item.type}`,
      id: item.id,
    }
  })

  const deleteDepartment = async (id: string) => {
    try {
      const res = await mutateAsync({
        url: `job/masters/Minimumexperience/${id}`,
        payload: id,
        token: true,
      })
      if (res) {
        if (refetchExperience) {
          refetchExperience()
        }

        notification.success({
          message: '',
          description: 'Experience is deleted successfully!',
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

  const showConfirm = (id: any) => {
    DeleteModal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this experience?',
      onOk() {
        deleteDepartment(id)
      },
      onCancel() {
        return
      },
    })
  }

  const columns = [
    {
      title: 'Experience',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: string) => {
        return (
          <OptionWrapper color={activeColor}>
            {PermittedEndPoint['/job/masters/Minimumexperience']?.includes('UPDATE') && (
              <EditIcon
                onClick={() => {
                  setExperienceModal(true), setExperienceId(id)
                }}
              />
            )}
            {PermittedEndPoint['/job/masters/Minimumexperience']?.includes('DELETE') && (
              <DeleteIcon
                className="deleteIcon"
                onClick={() => {
                  showConfirm(id)
                }}
              />
            )}
          </OptionWrapper>
        )
      },
    },
  ]

  if (
    !PermittedEndPoint['/job/masters/Minimumexperience']?.includes('UPDATE') &&
    !PermittedEndPoint['/job/masters/Minimumexperience']?.includes('DELETE')
  ) {
    columns.pop()
  }

  const onRow = (record: IUpdateQuestion) => {
    return {
      onClick: () => {
        setUpdateExperience(record)
      },
    }
  }

  //resets the pagination for unmounted table
  useEffect(() => {
    return () => {
      dispatch(resetPagination())
    }
  }, [])

  return (
    <TableWrapper color={activeColor}>
      <Table
        columns={columns}
        dataSource={formattedExperienceData}
        onRow={onRow}
        pagination={{
          pageSizeOptions: ['1', '5', '10', '20'],
          showSizeChanger: true,
          locale: { items_per_page: 'Records Per Page' },
          current: currentPage,
          pageSize: pageSize,
          onChange: (currentPage, pageSize) => {
            dispatch(updateCurrentPage(currentPage))
            dispatch(updatepageSize(pageSize))
          },
        }}
      />
      <Modal isOpen={experienceModal} hideModal={() => setExperienceModal(false)}>
        <UpdateExperienceModal
          showModal={(value: boolean) => setExperienceModal(value)}
          updateExperience={updateExperience}
          id={experienceId}
          refetchExperience={refetchExperience}
        />
      </Modal>
    </TableWrapper>
  )
}

export default ExperienceList
