import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, notification } from 'antd'
import { Modal as DeleteModal } from 'antd'
import { updateCurrentPage, updatepageSize, resetPagination } from 'store/slice/jobApplicationSwitch'
import useDelete from 'hooks/useDelete'
import { RootState } from 'store/store'
import Modal from 'components/Modal'
import UpdateJobProfileQuestionsModal from 'components/UpdateJobProfileQuestion'
import { Iprops, IUpdateQuestion } from 'interfaces'
import EditIcon from 'assets/svg/EditIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import { OptionWrapper } from 'styles/pages/Workflow'
import { TableWrapper } from 'styles/views/Employees'

const ProfileQuestionsList = ({ getProfileQuestions, profileQuestionsRefetch }: Iprops) => {
  const dispatch = useDispatch()
  const { currentPage, pageSize } = useSelector((state: RootState) => state.jobApplicationSwitch)
  const [profileQuestionModal, setProfileQuestionModal] = useState(false)
  const [updateProfileQuestion, setUpdateProfileQuestion] = useState<IUpdateQuestion>()
  const [questionId, setQuestionId] = useState<string>()
  const activeColor = useSelector((state: RootState) => state?.colorSlice?.activeColor)
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)

  const { mutateAsync } = useDelete()

  const deleteQuestion = async (id: string) => {
    try {
      const res = await mutateAsync({
        url: `job/master/profilequestions/${id}`,
        payload: id,
        token: true,
      })

      if (res) {
        if (profileQuestionsRefetch) {
          profileQuestionsRefetch()
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
        description: 'This record cannot be deleted because it is marked as default or marked as notDelete',
      })
    } else {
      DeleteModal.confirm({
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this Question?',
        onOk() {
          deleteQuestion(id)
        },
        onCancel() {
          return
        },
      })
    }
  }

  const columns = [
    {
      title: 'Questions',
      dataIndex: 'fieldName',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: string, record: any) => {
        const canDelete = record.canDelete || false
        const isDefault = record.isDefault || false
        return (
          <OptionWrapper color={activeColor}>
            {PermittedEndPoint['/job/master/profilequestions']?.includes('UPDATE') && !isDefault && (
              <EditIcon
                onClick={() => {
                  setQuestionId(id), setProfileQuestionModal(true)
                }}
              />
            )}
            {PermittedEndPoint['/job/master/profilequestions']?.includes('DELETE') && canDelete && (
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
    !PermittedEndPoint['/job/master/profilequestions']?.includes('UPDATE') &&
    !PermittedEndPoint['/job/master/profilequestions']?.includes('DELETE')
  ) {
    columns.pop()
  }

  const onRow = (record: IUpdateQuestion) => {
    return {
      onClick: () => {
        setUpdateProfileQuestion(record)
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
        dataSource={getProfileQuestions}
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
        <UpdateJobProfileQuestionsModal
          showModal={(value: boolean) => setProfileQuestionModal(value)}
          updateProfileQuestion={updateProfileQuestion}
          id={questionId}
          profileQuestionsRefetch={profileQuestionsRefetch}
        />
      </Modal>
    </TableWrapper>
  )
}

export default ProfileQuestionsList
