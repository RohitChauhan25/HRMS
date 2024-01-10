import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useGet from 'hooks/useGet'
import { RootState } from 'store/store'
import { AddDepartment } from 'constants/labels'
import Modal from 'components/Modal'
import Button from 'components/Button'
import DepartmentList from 'views/Master/Department'
import AddDepartmentModal from 'views/Modals/AddDepartment'
import { EmployeeContainer, ContentWrapper, HeadSection, Title, EmployeeListContainer } from 'styles/pages/Employees'

const Departments = () => {
  const [addDepartmentModal, setAddDepartmentModal] = useState(false)
  const menu = useSelector((state: RootState) => state?.user?.menu)
  const [permission, setPermission] = useState<any>([])
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const { data: getDepartment, refetch: departmentsRefect } = useGet('get-department', `job/masters/department`, {
    token: true,
  })

  useEffect(() => {
    const menuItem: any = menu?.find((item: any) => item?.resource === 'department')
    if (menuItem) {
      setPermission(menuItem?.permissions)
    }
  }, [menu])

  useEffect(() => {
    departmentsRefect()
  }, [])

  return (
    <EmployeeContainer>
      <ContentWrapper>
        <HeadSection>
          <Title>Departments</Title>
          {permission?.includes('CREATE') && (
            <Button
              label={AddDepartment}
              variant="contained"
              type="submit"
              onClick={() => setAddDepartmentModal(true)}
              style={{ backgroundColor: activeColor }}
            />
          )}
        </HeadSection>
        <EmployeeListContainer>
          <DepartmentList getDepartment={getDepartment} departmentsRefect={departmentsRefect} />
        </EmployeeListContainer>
      </ContentWrapper>
      <Modal isOpen={addDepartmentModal} hideModal={() => setAddDepartmentModal(false)}>
        <AddDepartmentModal
          showModal={(value: boolean) => setAddDepartmentModal(value)}
          departmentsRefect={departmentsRefect}
        />
      </Modal>
    </EmployeeContainer>
  )
}

export default Departments
