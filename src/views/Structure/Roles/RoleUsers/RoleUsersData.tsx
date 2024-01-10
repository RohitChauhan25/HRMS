import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'antd'
import { notification } from 'antd'
import usePut from 'hooks/usePut'
import { EmployeeDetailRoute } from 'constants/routes'
import { updateCurrentPage, updatepageSize, resetPagination } from 'store/slice/jobApplicationSwitch'
import EditIcon from 'assets/svg/EditIcon'
import { OptionWrapper } from 'styles/pages/Workflow'
import { RootState } from 'store/store'
import { ActiveButton, FullName, InActiveButton } from 'styles/views/Employees'

const RoleUsersData = ({ searchedValue, RolesData, role, refetchUserRoleData }: any) => {
  const user = useSelector((state: any) => state.user?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mutateAsync: mutate } = usePut()
  const { currentPage, pageSize } = useSelector((state: RootState) => state.jobApplicationSwitch)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const handleRowClick = (id?: string) => {
    navigate(EmployeeDetailRoute?.path, { state: id })
  }

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
        refetchUserRoleData()
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
                {record?.location ? record?.location : 'NA'} {record?.phone ? ` / ${record?.phone}` : null}{' '}
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
      render: () => {
        return <span>{role}</span>
      },
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
          <OptionWrapper color={activeColor}>
            <EditIcon onClick={() => handleRowClick(id)}></EditIcon>
          </OptionWrapper>
        )
      },
    },

    user?.Role === 'Super Admin'
      ? {
          title: 'Status',
          dataIndex: 'active',
          render: (active: boolean, record: any) => {
            return active ? (
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
            )
          },
        }
      : (null as any),
  ]
  // Filter out null columns (columns that should not be displayed)
  const filteredColumns = columns?.filter((column) => column !== null)

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
        dataSource={RolesData?.allotedUsers}
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

export default RoleUsersData
