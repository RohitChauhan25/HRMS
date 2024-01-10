import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux'
import { Checkbox, notification } from 'antd'
import useDelete from 'hooks/useDelete'
import useGet from 'hooks/useGet'
import Modal from 'components/Modal'
import TableSection from 'components/Table'
import AddMemberModal from 'views/Modals/AddMemeberModal'
import EditJobTimeLineModal from 'views/Modals/EditJobTimeLineModal'
import { StepperInterface } from 'interfaces'
import { UserAssignment, UserInfo } from 'interfaces/job'
import DeleteGrayIcon from 'assets/svg/DeleteGrayIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import Team from 'assets/images/team.png'
import {
  MainContainer,
  ImageContainer,
  AddTeam,
  Note,
  Buttons,
  TableContainer,
  TabeleHeadSection,
  Title,
  HeadButtons,
  AddMember,
  Delete,
} from 'styles/views/Jobs/JobsTeamAssignment'
import { CancelButton, SaveButton } from 'styles/views/Jobs/JobPostForm'

const EditJobTeamAssignment = ({ next, prev, getJobData }: StepperInterface) => {
  const { mutateAsync } = useDelete()
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [modal, setModal] = useState(false)
  const [addModal, setaddModal] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const toggleAdd = () => {
    setaddModal(!addModal)
  }

  const toggleTab = () => {
    setModal(!modal)
  }

  const { data: users, refetch: refetchUsers } = useGet(
    'usersdata',
    `job/hiringStageUsers?jobPostId=${getJobData?.id}`,
    {
      token: true,
    },
  )
  const { data: getEditJobData, refetch: refetchJobData1 } = useGet('date-data', `job/jobpost/${getJobData?.id}`, {
    token: true,
  })

  useEffect(() => {
    refetchUsers()
    refetchJobData1()
  }, [])

  const columns: any = [
    {
      title: '',
      dataIndex: 'checkbox',
      render: (_id: any, record: UserInfo) => {
        return <Checkbox onChange={() => onChange(record?.id)} />
      },
    },

    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Role',
      dataIndex: 'roleName',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (_id: any, record: UserInfo) => {
        return <DeleteIcon onClick={() => handleDeleteClick(record?.id)} />
      },
    },
  ]
  const onChange = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows((prevSelected) => prevSelected.filter((value) => value !== id))
    } else {
      setSelectedRows((prevSelected) => [...prevSelected, id])
    }
  }

  const removeMember = async (deleteids: any) => {
    try {
      const res = await mutateAsync({
        url: `job/hiringStageUsers`,
        payload: { ids: deleteids },
        token: true,
      })

      if (res) {
        if (refetchUsers) {
          refetchUsers()
        }

        notification.success({
          message: '',
          description: 'User is deleted successfully!',
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

  const handleDeleteClick = async (selectedUser: number) => {
    try {
      const res = await mutateAsync({
        url: `job/hiringStageUsers`,
        payload: { ids: [selectedUser] },
        token: true,
      })

      if (res) {
        // refetchUsers()
        if (refetchUsers) {
          refetchUsers()
        }

        notification.success({
          message: '',
          description: 'User is deleted successfully!',
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

  const usersDataForTable = users?.map((member: UserAssignment) => {
    return {
      name: member?.userName,
      email: member?.userEmail,
      roleName: member?.roleName,
      id: member?.id,
    }
  })

  return (
    <>
      {users?.length ? (
        <TableContainer>
          <TabeleHeadSection>
            <Title>Team Assignment</Title>
            <HeadButtons>
              <AddMember style={{ backgroundColor: activeColor }} onClick={toggleAdd}>
                Add Member
              </AddMember>
              <Delete
                onClick={() => {
                  removeMember(selectedRows)
                }}
                disabled={!(selectedRows?.length > 1)}
              >
                <DeleteGrayIcon />
                Delete
              </Delete>
            </HeadButtons>
          </TabeleHeadSection>
          <TableSection dataSource={usersDataForTable} columns={columns} />
          <Buttons>
            <CancelButton onClick={prev}>Back</CancelButton>
            <SaveButton
              onClick={() => {
                setModal(true)
              }}
              style={{ backgroundColor: activeColor }}
            >
              Next
            </SaveButton>
          </Buttons>
        </TableContainer>
      ) : (
        <MainContainer>
          <ImageContainer>
            <img src={Team} alt="Team" />
          </ImageContainer>
          <AddTeam>Add Team Members</AddTeam>
          <Note>Add your team members</Note>
          <Buttons>
            <CancelButton onClick={prev}>Back</CancelButton>
            <SaveButton onClick={() => setaddModal(!addModal)} style={{ backgroundColor: activeColor }}>
              Add Member
            </SaveButton>
          </Buttons>
        </MainContainer>
      )}

      <Modal isOpen={modal} className="timeline_modal">
        <EditJobTimeLineModal
          toggleTimeLineModal={next}
          toggle={toggleTab}
          jobTimeline={getJobData?.startDate && getJobData?.endData ? getJobData : getEditJobData}
        />
      </Modal>

      <Modal isOpen={addModal} className="modal">
        <AddMemberModal toggleadd={toggleAdd} refetchUsers={refetchUsers} id={getJobData?.id} usersList={[]} />
      </Modal>
    </>
  )
}

export default EditJobTeamAssignment
