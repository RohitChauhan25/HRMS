import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Modal, notification } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import useDelete from 'hooks/useDelete'
import { RootState } from 'store/store'
import { updateCurrentPage, updatepageSize, resetPagination } from 'store/slice/jobApplicationSwitch'
import { RoleUsersRoute } from 'constants/routes'
import { DataType, RolesTablesProps } from 'interfaces'
import EditIcon from 'assets/svg/EditIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import { NameWrapper } from 'styles/views/Employees'
import { ActionWrapper } from 'styles/views/Structure'

const RolesData = ({ roles, refetchRole }: RolesTablesProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mutateAsync } = useDelete()
  const { currentPage, pageSize } = useSelector((state: RootState) => state?.jobApplicationSwitch)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)

  const handleRowClick = (record: string) => {
    if (PermittedEndPoint['/auth/role']?.includes('CREATE')) {
      navigate(RoleUsersRoute?.path, { state: record })
    }
  }

  const deleteRow = async (roleId: string) => {
    try {
      const res = await mutateAsync({
        url: `auth/role/${roleId}`,
        token: true,
      })
      if (res) {
        notification.success({
          message: '',
          description: 'Role is deleted successfully!',
        })
        if (refetchRole) {
          refetchRole()
        }
      }
    } catch (error: any) {
      notification.error({
        message: '',
        description: error?.response?.data?.message,
        duration: 2,
      })
    }
  }

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'roleName',
      render: (data: string) => {
        return <NameWrapper color={activeColor}>{data}</NameWrapper>
      },
    },
    {
      title: 'Description',
      dataIndex: 'roleDescription',
    },
    {
      title: 'Users',
      dataIndex: 'allotedUsersCount',
      render: (allotedUsersCount: number, record: any) => {
        return allotedUsersCount !== 0 ? (
          <NameWrapper color={activeColor} onClick={() => handleRowClick(record)} users={allotedUsersCount}>
            {allotedUsersCount === 1 ? `${allotedUsersCount} User` : `${allotedUsersCount} Users`}
          </NameWrapper>
        ) : (
          <NameWrapper color={activeColor} users={allotedUsersCount}>{`${allotedUsersCount} User`}</NameWrapper>
        )
      },
    },
    {
      title: 'Action',
      dataIndex: 'key',
      render: (key: React.Key, record: DataType) => {
        return (
          <ActionWrapper color={activeColor}>
            {PermittedEndPoint['/auth/role']?.includes('UPDATE') && (
              <EditIcon
                onClick={() => {
                  navigate(`/structure/Roles/addPermission/${record?.id}`, {
                    state: record,
                  })
                }}
              />
            )}
            {PermittedEndPoint['/auth/role']?.includes('DELETE') && (
              <DeleteIcon className="deleteIcon" onClick={() => showConfirm(record)} />
            )}
          </ActionWrapper>
        )
      },
    },
  ]

  if (!PermittedEndPoint['/auth/role']?.includes('UPDATE') && !PermittedEndPoint['/auth/role']?.includes('DELETE')) {
    columns.pop()
  }

  const showConfirm = (record: any) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this role?',
      onOk() {
        deleteRow(record?.id)
      },
      onCancel() {
        return
      },
    })
  }

  //resets the pagination for unmounted table
  useEffect(() => {
    return () => {
      dispatch(resetPagination())
    }
  }, [])

  return (
    <>
      {roles && roles?.length > 0 && (
        <Table
          columns={columns}
          dataSource={roles}
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
      )}
    </>
  )
}

export default RolesData
