import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useGet from 'hooks/useGet'
import { RootState } from 'store/store'
import { ADDQUESTION } from 'constants/labels'
import Button from 'components/Button'
import Modal from 'components/Modal'
import ProfileQuestionsList from 'views/Master/profileQuestions'
import AddJobProfileQuestionModal from 'views/Modals/AddProfileQuestionModal'
import { EmployeeContainer, ContentWrapper, HeadSection, Title, EmployeeListContainer } from 'styles/pages/Employees'

const ProfileQuestions = () => {
  const [addQuestionModal, setAddQuestionModal] = useState(false)
  const menu = useSelector((state: RootState) => state?.user?.menu)
  const [permission, setPermission] = useState<any>([])
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const { data: getProfileQuestions, refetch: profileQuestionsRefetch } = useGet(
    'get-Profile-questions',
    `job/master/profilequestions`,
    {
      token: true,
    },
  )

  useEffect(() => {
    const menuItem: any = menu?.find((item: any) => item?.resource === 'profilequestions')
    if (menuItem) {
      setPermission(menuItem?.permissions)
    }
  }, [menu])

  useEffect(() => {
    profileQuestionsRefetch()
  }, [])

  return (
    <EmployeeContainer>
      <ContentWrapper>
        <HeadSection>
          <Title>Profile Questions</Title>
          {permission?.includes('CREATE') && (
            <Button
              label={ADDQUESTION}
              variant="contained"
              type="submit"
              onClick={() => setAddQuestionModal(true)}
              style={{ backgroundColor: activeColor }}
            />
          )}
        </HeadSection>
        <EmployeeListContainer>
          <ProfileQuestionsList
            getProfileQuestions={getProfileQuestions}
            profileQuestionsRefetch={profileQuestionsRefetch}
          />
        </EmployeeListContainer>
      </ContentWrapper>
      <Modal isOpen={addQuestionModal} hideModal={() => setAddQuestionModal(false)}>
        <AddJobProfileQuestionModal
          showModal={(value: boolean) => setAddQuestionModal(value)}
          profileQuestionsRefetch={profileQuestionsRefetch}
        />
      </Modal>
    </EmployeeContainer>
  )
}

export default ProfileQuestions
