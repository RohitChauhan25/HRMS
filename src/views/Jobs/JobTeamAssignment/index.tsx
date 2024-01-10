import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux'
import { Checkbox, notification } from 'antd'
import useDelete from 'hooks/useDelete'
import useGet from 'hooks/useGet'
import Modal from 'components/Modal'
import TableSection from 'components/Table'
import JobTimelineModal from 'views/Modals/JobTimelineModal'
import AddMemberModal from 'views/Modals/AddMemeberModal'
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

const JobTeamAssignment = ({ next, prev }: StepperInterface) => {
  const { mutateAsync } = useDelete()
  const [modal, setModal] = useState(false)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [addModal, setaddModal] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const toggleAdd = () => {
    setaddModal(!addModal)
  }

  const toggleTab = () => {
    setModal(!modal)
  }

  const jobPostId = window.localStorage.getItem('postId')

  const { data: users, refetch: refetchUsers } = useGet('users', `job/hiringStageUsers?jobPostId=${jobPostId}`, {
    token: true,
  })

  const { data: jobTimeline, refetch: refetchTimeline } = useGet('jobTimeline', `job/jobPost/${jobPostId}`, {
    token: true,
  })

  useEffect(() => {
    refetchTimeline()
  }, [])

  const columns: any = [
    {
      title: ' ',
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
      title: 'Hiring Stage',
      dataIndex: 'hiringStageName',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
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

  const removeMember = async (userId: any) => {
    if (userId?.length > 0)
      try {
        const res = await mutateAsync({
          url: `job/hiringStageUsers`,
          payload: { ids: userId },
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
      hiringStageName: member?.hiringStageName,
      role: member?.roleName,
      id: member?.id,
    }
  })

  return (
    <>
      {users?.length ? (
        // headingAfter Adding Members
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
              style={{ backgroundColor: activeColor }}
              onClick={() => {
                // next?.()
                setModal(true)
              }}
            >
              Next
            </SaveButton>
          </Buttons>
        </TableContainer>
      ) : (
        // First Time When There is no Member Added
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
            <SaveButton
              style={{ backgroundColor: activeColor }}
              onClick={() => {
                // next?.()
                setModal(true)
              }}
            >
              Next
            </SaveButton>
          </Buttons>
        </MainContainer>
      )}
      <Modal isOpen={modal} className="timeline_modal">
        <JobTimelineModal triggerNext={next} toggle={toggleTab} jobTimeline={jobTimeline} />
      </Modal>
      <Modal isOpen={addModal} className="modal">
        <AddMemberModal toggleadd={toggleAdd} refetchUsers={refetchUsers} id={jobPostId} usersList={users} />
      </Modal>
    </>
  )
}

export default JobTeamAssignment
