import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, notification } from 'antd'
import { Modal as DeleteModal } from 'antd'
import { updateCurrentPage, updatepageSize, resetPagination } from 'store/slice/jobApplicationSwitch'
import useDelete from 'hooks/useDelete'
import { RootState } from 'store/store'
import Modal from 'components/Modal'
import UpdateEmploymentTypeModal from 'views/Modals/UpdateEmploymentTypeModal'
import { Iprops } from 'interfaces'
import EditIcon from 'assets/svg/EditIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import { OptionWrapper } from 'styles/pages/Workflow'
import { TableWrapper } from 'styles/views/Employees'

const EmploymentTypeList = ({ refetchEmploymentType, getEmploymentType }: Iprops) => {
  const dispatch = useDispatch()
  const { currentPage, pageSize } = useSelector((state: RootState) => state.jobApplicationSwitch)
  const activeColor = useSelector((state: RootState) => state?.colorSlice?.activeColor)
  const [employeeModal, setEmployeeModal] = useState(false)
  const [updateEmploye, setUpdateEmploye] = useState(false)
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)
  const [employeeID, setEmployeeID] = useState<string>()

  const { mutateAsync } = useDelete()
  const deleteEmployee = async (id: string) => {
    try {
      const res = await mutateAsync({
        url: `job/masters/employmenttype/${id}`,
        payload: id,
        token: true,
      })
      if (res) {
        if (res) {
          if (refetchEmploymentType) {
            refetchEmploymentType()
          }

          notification.success({
            message: '',
            description: 'Employment Type is deleted successfully!',
          })
        }
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
      content: 'Are you sure you want to delete this Employement type?',
      onOk() {
        deleteEmployee(id)
      },
      onCancel() {
        return
      },
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: string) => {
        return (
          <OptionWrapper color={activeColor}>
            {PermittedEndPoint['/job/masters/employmenttype']?.includes('UPDATE') && (
              <EditIcon
                onClick={() => {
                  setEmployeeModal(true)
                  setEmployeeID(id)
                }}
              />
            )}
            {PermittedEndPoint['/job/masters/employmenttype']?.includes('DELETE') && (
              <DeleteIcon className="deleteIcon" onClick={() => showConfirm(id)} />
            )}
          </OptionWrapper>
        )
      },
    },
  ]

  if (
    !PermittedEndPoint['/job/masters/employmenttype']?.includes('UPDATE') &&
    !PermittedEndPoint['/job/masters/employmenttype']?.includes('DELETE')
  ) {
    columns.pop()
  }

  const onRow = (record: any) => {
    return {
      onClick: () => {
        setUpdateEmploye(record)
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
        dataSource={getEmploymentType}
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
      <Modal isOpen={employeeModal} hideModal={() => setEmployeeModal(false)}>
        <UpdateEmploymentTypeModal
          showModal={(value: boolean) => setEmployeeModal(value)}
          updateEmploye={updateEmploye}
          id={employeeID}
          refetchEmploymentType={refetchEmploymentType}
        />
      </Modal>
    </TableWrapper>
  )
}

export default EmploymentTypeList
