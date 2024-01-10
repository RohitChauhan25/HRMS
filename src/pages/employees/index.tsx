import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AddEmployee } from 'constants/labels'
import Modal from 'components/Modal'
import Button from 'components/Button'
import SearchInput from 'components/SearchInput'
import AddEmployeeModal from 'views/Modals/AddEmployeeModal'
import EmployeesData from 'views/Employees/employeeTable'
import SearchIcon from 'assets/svg/SearchIcon'
import { EmployeeContainer, ContentWrapper, HeadSection, Title, EmployeeListContainer } from 'styles/pages/Employees'
import { EmployeeWrapper, TitleSection, WrapperTitle, SearchSection, TableWrapper } from 'styles/views/Employees'
import { RootState } from 'store/store'

const EmployeeList = () => {
  const [addEmployeeModal, setAddEmployeeModal] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)

  const addEmployee = () => {
    setAddEmployeeModal(true)
  }
  const [searchedValue, setSearchedValue] = useState('')

  return (
    <EmployeeContainer>
      <ContentWrapper>
        <HeadSection>
          <Title>Employees</Title>
          {PermittedEndPoint['/auth/user']?.includes('CREATE') && (
            <Button
              label={AddEmployee}
              variant="contained"
              type="submit"
              onClick={addEmployee}
              style={{ backgroundColor: activeColor }}
            />
          )}
        </HeadSection>
        <EmployeeListContainer>
          <EmployeeWrapper>
            <TitleSection>
              <WrapperTitle>Employees</WrapperTitle>
              <SearchSection>
                <SearchInput
                  placeholder="Search"
                  prefix={<SearchIcon />}
                  onChange={(e) => setSearchedValue(e.target.value)}
                />
              </SearchSection>
            </TitleSection>
            <TableWrapper color={activeColor}>
              <EmployeesData searchedValue={searchedValue} addEmployeeModal={addEmployeeModal} />
            </TableWrapper>
          </EmployeeWrapper>
        </EmployeeListContainer>
      </ContentWrapper>
      <Modal isOpen={addEmployeeModal} hideModal={() => setAddEmployeeModal(false)}>
        <AddEmployeeModal showModal={(value: boolean) => setAddEmployeeModal(value)} />
      </Modal>
    </EmployeeContainer>
  )
}

export default EmployeeList
