import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'antd'
import { updateCurrentPage, updatepageSize, resetPagination } from 'store/slice/jobApplicationSwitch'

const TableSection = (props: any) => {
  const dispatch = useDispatch()
  const { currentPage, pageSize } = useSelector((state: any) => state.jobApplicationSwitch)

  //resets the pagination for unmounted table
  useEffect(() => {
    return () => {
      dispatch(resetPagination())
    }
  }, [])

  return (
    <div>
      <Table
        {...props}
        pagination={{
          pageSizeOptions: ['1', '5', '10', '20'],
          showSizeChanger: true,
          locale: { items_per_page: 'Records Per Page' },
          current: currentPage,
          pageSize: pageSize,
          total: props?.total,
          onChange: (currentPage, pageSize) => {
            dispatch(updateCurrentPage(currentPage))
            dispatch(updatepageSize(pageSize))
          },
        }}
      />
    </div>
  )
}

export default TableSection
