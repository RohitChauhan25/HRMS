import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { RootState } from 'store/store'
import { updateCurrentPage, updatepageSize, resetPagination } from 'store/slice/jobApplicationSwitch'
import DeleteIcon from 'assets/svg/DeleteIcon'
// import Vector from 'assets/svg/Vector'
import { DetailWrapper } from 'styles/views/Jobs/CandidateRecord'
import Rating from 'components/Rating'
import { useForm } from 'react-hook-form'
import VectorIcon from 'assets/svg/VectorIcon'
import { CandidateDetailsRoute } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
const CandidateList = ({ searchedValue }: any) => {
  const navigate = useNavigate()
  const { control } = useForm()
  const dispatch = useDispatch()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const { currentPage, pageSize } = useSelector((state: RootState) => state.jobApplicationSwitch)
  //resets the pagination for unmounted table
  useEffect(() => {
    return () => {
      dispatch(resetPagination())
    }
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchedValue],
      onFilter: (value: any, record: any) => {
        return String(record.name).toLowerCase()?.includes(value.toLowerCase())
      },
      render: (data: string) => {
        return (
          <DetailWrapper
            color={activeColor}
            onClick={() => {
              navigate(CandidateDetailsRoute?.path)
            }}
          >
            {data}
          </DetailWrapper>
        )
      },
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      render: () => {
        return <VectorIcon />
      },
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: () => {
        return <Rating name={''} control={control} rules={{ required: true }} defaultValue={3} />
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: () => {
        return <DeleteIcon />
      },
    },
  ]

  const data = [
    {
      key: '1',
      name: 'John Stone',
      appliedDate: '21 Feb 2023',
      source: 'Mannual',
      stage: 'Active',
      rating: '',
    },
    {
      key: '2',
      name: 'Rohit Chauhan',
      appliedDate: '21 Feb 2023',
      source: 'Mannual',
      stage: 'Active',
      rating: '',
    },
    {
      key: '3',
      name: 'Vishesh Wasnik',
      appliedDate: '21 Feb 2023',
      source: 'Mannual',
      stage: 'Active',
      rating: '',
    },
    {
      key: '4',
      name: 'XYZ',
      appliedDate: '21 Feb 2023',
      source: 'Atomatic',
      stage: 'Active',
      rating: '',
    },
    {
      key: '2',
      name: 'Rohit Chauhan',
      appliedDate: '21 Feb 2023',
      source: 'Mannual',
      stage: 'Active',
      rating: '',
    },
    {
      key: '3',
      name: 'Vishesh Wasnik',
      appliedDate: '21 Feb 2023',
      source: 'Mannual',
      stage: 'Active',
      rating: '',
    },
    {
      key: '4',
      name: 'XYZ',
      appliedDate: '21 Feb 2023',
      source: 'Atomatic',
      stage: 'Active',
      rating: '',
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
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
  )
}

export default CandidateList
