import { useEffect, useState } from 'react'
import { Table, notification } from 'antd'
import { Modal as DeleteModal } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentPage, updatepageSize, resetPagination } from 'store/slice/jobApplicationSwitch'
import useDelete from 'hooks/useDelete'
import { RootState } from 'store/store'
import Modal from 'components/Modal'
import UpdateScreeningQuestionsModal from 'views/Modals/UpdateScreeningQuestionModal'
import { Iprops, IUpdateQuestion } from 'interfaces'
import EditIcon from 'assets/svg/EditIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import { OptionWrapper } from 'styles/pages/Workflow'
import { TableWrapper } from 'styles/views/Employees'

const ScreeningQuestionsList = ({ getScreeningQuestions, screenQuestionsRefetch }: Iprops) => {
  const dispatch = useDispatch()
  const { currentPage, pageSize } = useSelector((state: RootState) => state.jobApplicationSwitch)
  const [profileQuestionModal, setProfileQuestionModal] = useState(false)
  const [updateQuestion, setUpdateQuestion] = useState<IUpdateQuestion>()
  const [questionId, setQuestionId] = useState<string>()
  const activeColor = useSelector((state: RootState) => state?.colorSlice?.activeColor)
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)

  const { mutateAsync } = useDelete()

  const deleteDepartment = async (id: string) => {
    try {
      const res = await mutateAsync({
        url: `job/master/screeningQuestions/${id}`,
        payload: id,
        token: true,
      })

      if (res) {
        if (screenQuestionsRefetch) {
          screenQuestionsRefetch()
        }

        notification.success({
          message: '',
          description: 'Question is deleted successfully!',
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

  const showConfirm = (id: string, canDelete: boolean) => {
    if (!canDelete) {
      notification.warning({
        message: 'Cannot Delete',
        description: 'This record cannot be deleted because it is marked as notDelete',
      })
    } else {
      DeleteModal.confirm({
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this Question?',
        onOk() {
          deleteDepartment(id)
        },
        onCancel() {
          return
        },
      })
    }
  }

  const columns = [
    {
      title: 'Field Name',
      dataIndex: 'fieldName',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: string, record: any) => {
        const canDelete = record.canDelete || false
        return (
          <OptionWrapper color={activeColor}>
            {PermittedEndPoint['/job/master/screeningQuestions']?.includes('UPDATE') && (
              <EditIcon
                onClick={() => {
                  setProfileQuestionModal(true), setQuestionId(id)
                }}
              />
            )}
            {PermittedEndPoint['/job/master/screeningQuestions']?.includes('DELETE') && canDelete && (
              <DeleteIcon
                className="deleteIcon"
                onClick={() => {
                  showConfirm(id, canDelete)
                }}
              />
            )}
          </OptionWrapper>
        )
      },
    },
  ]

  if (
    !PermittedEndPoint['/job/master/screeningQuestions']?.includes('UPDATE') &&
    !PermittedEndPoint['/job/master/screeningQuestions']?.includes('DELETE')
  ) {
    columns.pop()
  }

  const onRow = (record: IUpdateQuestion) => {
    return {
      onClick: () => {
        setUpdateQuestion(record)
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
        dataSource={getScreeningQuestions}
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
      <Modal isOpen={profileQuestionModal} hideModal={() => setProfileQuestionModal(false)}>
        <UpdateScreeningQuestionsModal
          showModal={(value: boolean) => setProfileQuestionModal(value)}
          updateQuestion={updateQuestion}
          id={questionId}
          screenQuestionsRefetch={screenQuestionsRefetch}
        />
      </Modal>
    </TableWrapper>
  )
}

export default ScreeningQuestionsList
