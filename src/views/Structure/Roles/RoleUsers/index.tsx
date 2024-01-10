import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGet from 'hooks/useGet'
import { RolesRoute } from 'constants/routes'
import { AddEmployee } from 'constants/labels'
import Modal from 'components/Modal'
import Button from 'components/Button'
import SearchInput from 'components/SearchInput'
import RoleUsersData from 'views/Structure/Roles/RoleUsers/RoleUsersData'
import AddEmployeeModal from 'views/Modals/AddEmployeeModal'
import SearchIcon from 'assets/svg/SearchIcon'
import RightIcon from 'assets/svg/RightArrowIcon'
import { EmployeeContainer, ContentWrapper, HeadSection, EmployeeListContainer } from 'styles/pages/Employees'
import { EmployeeWrapper, TitleSection, WrapperTitle, SearchSection, TableWrapper } from 'styles/views/Employees'
import { EmployeeHeading, EmployeeTitle } from 'styles/pages/Employees/EmployeeDetails'

const RoleUsers = () => {
  const [addEmployeeModal, setAddEmployeeModal] = useState(false)
  const [searchedValue, setSearchedValue] = useState('')
  const location = useLocation()
  const record = location.state
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const navigate = useNavigate()

  const addEmployee = () => {
    setAddEmployeeModal(true)
  }

  const { data: getUserRoleData, refetch: refetchUserRoleData } = useGet(
    'getUserRoleData',
    `/auth/role/users/${record?.id}`,
    {
      token: true,
    },
  )

  useEffect(() => {
    refetchUserRoleData()
  }, [])

  return (
    <EmployeeContainer>
      <ContentWrapper>
        <HeadSection>
          <TitleSection>
            <EmployeeTitle
              color={activeColor}
              onClick={() => {
                navigate(RolesRoute?.path)
              }}
            >
              Roles
            </EmployeeTitle>
            <RightIcon />
            <EmployeeHeading color={activeColor}>Users</EmployeeHeading>
          </TitleSection>
          <Button
            label={AddEmployee}
            variant="contained"
            type="submit"
            onClick={addEmployee}
            style={{ backgroundColor: activeColor }}
          />
        </HeadSection>
        <EmployeeListContainer>
          <EmployeeWrapper>
            <TitleSection>
              <WrapperTitle>{`${record?.roleName}'s`}</WrapperTitle>
              <SearchSection>
                <SearchInput
                  placeholder="Search"
                  prefix={<SearchIcon />}
                  onChange={(e) => setSearchedValue(e.target.value)}
                />
              </SearchSection>
            </TitleSection>
            <TableWrapper color={activeColor}>
              <RoleUsersData
                searchedValue={searchedValue}
                RolesData={getUserRoleData}
                role={record.roleName}
                refetchUserRoleData={refetchUserRoleData}
              />
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

export default RoleUsers
