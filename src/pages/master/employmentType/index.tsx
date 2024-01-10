import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useGet from 'hooks/useGet'
import { RootState } from 'store/store'
import { AddEmployment } from 'constants/labels'
import Button from 'components/Button'
import Modal from 'components/Modal'
import AddEmploymentTypeModal from 'views/Modals/AddEmploymentType'
import EmploymentTypeList from 'views/Master/EmploymentType'
import { EmployeeContainer, ContentWrapper, HeadSection, Title, EmployeeListContainer } from 'styles/pages/Employees'

const EmploymentType = () => {
  const [addEmploymentModal, setAddEmploymentModal] = useState(false)
  const menu = useSelector((state: RootState) => state?.user?.menu)
  const [permission, setPermission] = useState<any>([])
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const addEmploymentType = () => {
    setAddEmploymentModal(true)
  }

  const { data: getEmploymentType, refetch: refetchEmploymentType } = useGet(
    'get-employmentype',
    `job/masters/employmenttype`,
    {
      token: true,
    },
  )
  useEffect(() => {
    const menuItem: any = menu?.find((item: any) => item?.resource === 'employmenttype')
    if (menuItem) {
      setPermission(menuItem?.permissions)
    }
  }, [menu])

  useEffect(() => {
    refetchEmploymentType()
  }, [])

  return (
    <EmployeeContainer>
      <ContentWrapper>
        <HeadSection>
          <Title>Employment Type </Title>
          {permission?.includes('CREATE') && (
            <Button
              label={AddEmployment}
              variant="contained"
              type="submit"
              onClick={addEmploymentType}
              style={{ backgroundColor: activeColor }}
            />
          )}
        </HeadSection>
        <EmployeeListContainer>
          <EmploymentTypeList refetchEmploymentType={refetchEmploymentType} getEmploymentType={getEmploymentType} />
        </EmployeeListContainer>
      </ContentWrapper>
      <Modal isOpen={addEmploymentModal} hideModal={() => setAddEmploymentModal(false)}>
        <AddEmploymentTypeModal
          showModal={(value: boolean) => setAddEmploymentModal(value)}
          refetchEmploymentType={refetchEmploymentType}
        />
      </Modal>
    </EmployeeContainer>
  )
}

export default EmploymentType
