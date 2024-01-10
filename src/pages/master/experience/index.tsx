import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useGet from 'hooks/useGet'
import { RootState } from 'store/store'
import { AddExperience } from 'constants/labels'
import Button from 'components/Button'
import Modal from 'components/Modal'
import AddExperienceModal from 'views/Modals/AddExperienceModal'
import ExperienceList from 'views/Master/Experience'
import { EmployeeContainer, ContentWrapper, HeadSection, Title, EmployeeListContainer } from 'styles/pages/Employees'

const Experience = () => {
  const [addExperienceModal, setAddExperienceModal] = useState(false)
  const menu = useSelector((state: RootState) => state?.user?.menu)
  const [permission, setPermission] = useState<any>([])
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const { data: getExperience, refetch: refetchExperience } = useGet(
    'get-experience',
    `job/masters/Minimumexperience`,
    {
      token: true,
    },
  )

  useEffect(() => {
    const menuItem: any = menu?.find((item: any) => item?.resource === 'Minimumexperience')
    if (menuItem) {
      setPermission(menuItem?.permissions)
    }
  }, [menu])

  useEffect(() => {
    refetchExperience()
  }, [])

  return (
    <EmployeeContainer>
      <ContentWrapper>
        <HeadSection>
          <Title>Experience</Title>
          {permission?.includes('CREATE') && (
            <Button
              label={AddExperience}
              variant="contained"
              type="submit"
              onClick={() => setAddExperienceModal(true)}
              style={{ backgroundColor: activeColor }}
            />
          )}
        </HeadSection>
        <EmployeeListContainer>
          <ExperienceList getExperience={getExperience} refetchExperience={refetchExperience} />
        </EmployeeListContainer>
      </ContentWrapper>
      <Modal isOpen={addExperienceModal} hideModal={() => setAddExperienceModal(false)}>
        <AddExperienceModal
          showModal={(value: boolean) => setAddExperienceModal(value)}
          refetchExperience={refetchExperience}
        />
      </Modal>
    </EmployeeContainer>
  )
}

export default Experience
