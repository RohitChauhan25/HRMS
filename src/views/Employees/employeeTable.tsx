import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'antd'
import { notification } from 'antd'
import usePut from 'hooks/usePut'
import { EmployeeDetailRoute } from 'constants/routes'
import { updateCurrentPage, updatepageSize, resetPagination } from 'store/slice/jobApplicationSwitch'
import useGet from 'hooks/useGet'
import EditIcon from 'assets/svg/EditIcon'
import { OptionWrapper } from 'styles/pages/Workflow'
import { RootState } from 'store/store'
import { ActiveButton, FullName, InActiveButton } from 'styles/views/Employees'

const EmployeesData = ({ addEmployeeModal, searchedValue }: any) => {
  const user = useSelector((state: any) => state.user?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mutateAsync: mutate } = usePut()
  const { currentPage, pageSize } = useSelector((state: RootState) => state.jobApplicationSwitch)
  const [deleteEmployeeData, setDeleteEmployeeData] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)
  const handleRowClick = (id?: string) => {
    navigate(EmployeeDetailRoute?.path, { state: id })
  }

  const { data: getEmployeeList, refetch: refetchEmployeeList } = useGet('get-employee-list', `/auth/user`, {
    token: true,
  })

  const updateStatus = async (status: boolean, id: string) => {
    const payload = {
      userId: id,
      active: status,
    }

    try {
      const response = await mutate({
        url: `auth/user/active`,
        payload,
        token: true,
      })

      if (response) {
        notification.success({
          message: '',
          description: response.message,
        })
        refetchEmployeeList()
      }
    } catch (error: any) {
      if (error.response?.data?.statusCode) {
        notification.error({
          message: '',
          description: error.response.data.message,
          duration: 2,
        })
      }
    }
  }

  useEffect(() => {
    refetchEmployeeList()
  }, [addEmployeeModal, setDeleteEmployeeData, deleteEmployeeData])

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      render: (fullName: string, record: any) => {
        return (
          <>
            <FullName color={activeColor}>{fullName}</FullName>
            <div>
              <span>
                {record?.location ? record?.location : 'NA'} {record?.phone ? ` / ${record?.phone}` : null}
              </span>
            </div>
          </>
        )
      },
    },

    {
      title: 'Email',
      dataIndex: 'email',
      filteredValue: [searchedValue],
      onFilter: (value: any, record: any) => {
        return (
          String(record.email).toLowerCase()?.includes(value.toLowerCase()) ||
          String(record.userName).toLowerCase()?.includes(value.toLowerCase())
        )
      },
    },

    {
      title: 'Role',
      dataIndex: 'roles',
      render: (roles: any[]) => roles?.map((role) => role?.roleName).join(', '),
    },
    {
      title: 'Username',
      dataIndex: 'userName',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: string) => {
        return (
          PermittedEndPoint['/auth/user']?.includes('UPDATE') && (
            <OptionWrapper color={activeColor}>
              <EditIcon onClick={() => handleRowClick(id)}></EditIcon>
              {/* <DeleteIcon onClick={() => showConfirm(id)} className="deleteIcon"></DeleteIcon> */}
            </OptionWrapper>
          )
        )
      },
    },

    user?.Role === 'Super Admin'
      ? {
          title: 'Status',
          dataIndex: 'active',
          render: (active: boolean, record: any) =>
            active ? (
              <ActiveButton
                color={activeColor}
                style={{
                  cursor: `${user?.userName === record?.userName ? 'not-allowed' : 'pointer'}`,
                }}
                onClick={() => (user?.userName === record?.userName ? null : updateStatus(false, record.id))}
              >
                Active
              </ActiveButton>
            ) : (
              <InActiveButton onClick={() => updateStatus(true, record.id)}>Inactive</InActiveButton>
            ),
        }
      : (null as any),
  ]

  // Filter out null columns (columns that should not be displayed)
  const filteredColumns = columns.filter((column) => column !== null)

  if (!PermittedEndPoint['/auth/user']?.includes('UPDATE')) {
    filteredColumns.pop()
  }

  //resets the pagination for unmounted table
  useEffect(() => {
    return () => {
      dispatch(resetPagination())
    }
  }, [])

  return (
    <>
      <Table
        columns={filteredColumns}
        dataSource={getEmployeeList}
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
    </>
  )
}

export default EmployeesData
