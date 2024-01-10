import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useGet from 'hooks/useGet'
import { RootState } from 'store/store'
import { ADDQUESTION } from 'constants/labels'
import Button from 'components/Button'
import Modal from 'components/Modal'
import ScreeningQuestionsList from 'views/Master/screeningQuestions'
import AddScreeningQuestionModal from 'views/Modals/AddScreeningQuestionModal'
import { EmployeeContainer, ContentWrapper, HeadSection, Title, EmployeeListContainer } from 'styles/pages/Employees'

const ScreeningQuestions = () => {
  const [addQuestionModal, setAddQuestionModal] = useState(false)
  const menu = useSelector((state: RootState) => state?.user?.menu)
  const [permission, setPermission] = useState<any>([])
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const { data: getScreeningQuestions, refetch: screenQuestionsRefetch } = useGet(
    'get-screening-questions',
    `job/master/screeningQuestions`,
    {
      token: true,
    },
  )

  useEffect(() => {
    const menuItem: any = menu?.find((item: any) => item?.resource === 'screeningQuestions')
    if (menuItem) {
      setPermission(menuItem?.permissions)
    }
  }, [menu])

  useEffect(() => {
    screenQuestionsRefetch()
  }, [])

  return (
    <EmployeeContainer>
      <ContentWrapper>
        <HeadSection>
          <Title>Screening Questions</Title>
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
          <ScreeningQuestionsList
            getScreeningQuestions={getScreeningQuestions}
            screenQuestionsRefetch={screenQuestionsRefetch}
          />
        </EmployeeListContainer>
      </ContentWrapper>
      <Modal isOpen={addQuestionModal} hideModal={() => setAddQuestionModal(false)}>
        <AddScreeningQuestionModal
          showModal={(value: boolean) => setAddQuestionModal(value)}
          screenQuestionsRefetch={screenQuestionsRefetch}
        />
      </Modal>
    </EmployeeContainer>
  )
}

export default ScreeningQuestions
