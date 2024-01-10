import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, notification } from 'antd'
import { Modal as DeleteModal } from 'antd'
import { updateCurrentPage, updatepageSize, resetPagination } from 'store/slice/jobApplicationSwitch'
import useDelete from 'hooks/useDelete'
import { RootState } from 'store/store'
import Modal from 'components/Modal'
import UpdateDepartmentModal from 'views/Modals/UpdateDepartmentModal'
import { Iprops, IUpdateQuestion } from 'interfaces'
import EditIcon from 'assets/svg/EditIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import { OptionWrapper } from 'styles/pages/Workflow'
import { TableWrapper } from 'styles/views/Employees'

const DepartmentList = ({ getDepartment, departmentsRefect }: Iprops) => {
  const dispatch = useDispatch()
  const { currentPage, pageSize } = useSelector((state: any) => state.jobApplicationSwitch)
  const [departmentModal, setDepartmentModal] = useState(false)
  const [departmentId, setDepartmentId] = useState<string>()
  const [updateDepartment, setUpdateDepartment] = useState<IUpdateQuestion>()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)

  const { mutateAsync } = useDelete()

  const deleteDepartment = async (id: string) => {
    try {
      const res = await mutateAsync({
        url: `job/masters/department/${id}`,
        payload: id,
        token: true,
      })

      if (res) {
        if (departmentsRefect) {
          departmentsRefect()
        }

        notification.success({
          message: '',
          description: 'Department is deleted successfully!',
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
      content: 'Are you sure you want to delete this department?',
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
      title: 'Department Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: string) => {
        return (
          <OptionWrapper color={activeColor}>
            {PermittedEndPoint['/job/masters/department']?.includes('UPDATE') && (
              <EditIcon
                onClick={() => {
                  setDepartmentModal(true), setDepartmentId(id)
                }}
              />
            )}
            {PermittedEndPoint['/job/masters/department']?.includes('DELETE') && (
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
    !PermittedEndPoint['/job/masters/department']?.includes('UPDATE') &&
    !PermittedEndPoint['/job/masters/department']?.includes('DELETE')
  ) {
    columns.pop()
  }

  const onRow = (record: IUpdateQuestion) => {
    return {
      onClick: () => {
        setUpdateDepartment(record)
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
        dataSource={getDepartment}
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
      <Modal isOpen={departmentModal} hideModal={() => setDepartmentModal(false)}>
        <UpdateDepartmentModal
          showModal={(value: boolean) => setDepartmentModal(value)}
          updateDepartment={updateDepartment}
          id={departmentId}
          departmentsRefect={departmentsRefect}
        />
      </Modal>
    </TableWrapper>
  )
}

export default DepartmentList
