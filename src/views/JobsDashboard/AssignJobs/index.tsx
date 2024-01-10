import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { ColumnsType } from 'antd/es/table'
import useGet from 'hooks/useGet'
import TableSection from 'components/Table'
import Button from 'components/Button'
import Modal from 'components/Modal'
import AssignJobModal from 'views/Modals/AssignJobTeamMemberModal'
import { Assign } from 'constants/labels'
import { AllJobsDataType } from 'interfaces'
import { JobTitleWrapper, JobSubTitle, ActionIconWrapper } from 'styles/pages/DashboardJob'
import { TitleSection, Wrapper, WrapperTitle } from 'styles/pages/DashboardJob'

const AssignJobs = () => {
  const navigate = useNavigate()
  const [jobId, setJobId] = useState<any>()
  const [approvalModal, setApprovalModal] = useState(false)
  const [jobPostUsers, setJobPostUsers] = useState()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const user = useSelector((state: any) => state.user?.user)

  const handleClose = () => {
    setApprovalModal(false)
  }

  const { data: getPublishedJobs, refetch: refetchJob } = useGet(
    'publishedJobs',
    `/job/publish/jobsByStatus?status=PUBLISHED`,
    {
      token: true,
    },
  )

  const { data: userProfile, refetch: refetchUser } = useGet('getUserProfile', `/auth/user/profile`, {
    token: true,
  })

  const { data: getTeamMembers, refetch: refetchTeamMembers } = useGet(
    'teamMembers',
    `/auth/user/teamMembers/${userProfile?.id}`,
    {
      token: true,
    },
  )

  useEffect(() => {
    refetchJob()
    refetchUser()
    if (userProfile?.id) {
      refetchTeamMembers()
    }
  }, [userProfile?.id])

  const columns: ColumnsType<AllJobsDataType> = [
    {
      title: 'Job Title',
      key: 'jobTitle',
      dataIndex: 'jobTitle',
      render: (jobTitle: string, record: any) => (
        <JobTitleWrapper
          color={activeColor}
          onClick={() => {
            navigate(`/jobs/view/${record?.id}`)
          }}
        >
          {jobTitle} <JobSubTitle>{jobTitle}</JobSubTitle>
        </JobTitleWrapper>
      ),
    },

    {
      title: 'Actions',
      dataIndex: 'id',
      render: (id: string, record: any) => {
        return (
          <ActionIconWrapper color={activeColor}>
            <Button
              disabled={user?.Role !== 'Level 1' && user?.Role !== 'Level 2' && user?.Role !== 'Super Admin'}
              variant="text"
              label={Assign}
              onClick={() => {
                setJobId(id)
                setApprovalModal(true)
                setJobPostUsers(record?.JobPostUsers)
              }}
            />
          </ActionIconWrapper>
        )
      },
    },
  ]

  return (
    <Wrapper color={activeColor}>
      <TitleSection>
        <WrapperTitle>Assign Jobs</WrapperTitle>
      </TitleSection>
      <Modal isOpen={approvalModal} className="timeline_modal">
        <AssignJobModal isClose={handleClose} teamMembers={getTeamMembers} jobId={jobId} jobPostUsers={jobPostUsers} />
      </Modal>
      <TableSection dataSource={getPublishedJobs} columns={columns} />
    </Wrapper>
  )
}

export default AssignJobs
