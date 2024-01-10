import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import useGet from 'hooks/useGet'
import usePut from 'hooks/usePut'
import { EmployeeListRoute } from 'constants/routes'
import Button from 'components/Button'
import SelectContainer from 'components/Select'
import RightIcon from 'assets/svg/RightArrowIcon'
import {
  EmployeeContainer,
  ContentWrapper,
  TitleSection,
  EmployeeTitle,
  EmployeeHeading,
  EmployeeDetailWrapper,
  EmployeeDetailSection,
  MainHeading,
  EmployeeDetailContainer,
  DetailsSection,
  DeatilsWrapper,
  DetailTitle,
  DetailDescription,
  RolesWrapper,
  RolesTitle,
  RolesContainer,
  RoleHeading,
  ButtonWrapper,
} from 'styles/pages/Employees/EmployeeDetails'

const EmployeeDetail = () => {
  const navigate = useNavigate()
  const { control, setValue, handleSubmit } = useForm()
  const location = useLocation()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const id = location.state

  const { data: allRoles, refetch: refeachAllRoles } = useGet('all-roles', `/auth/role/`, {
    token: true,
  })
  const { data: getEmployeeDetail, refetch: refetchGetEmployeeDetail } = useGet(
    'get-employee-detail',
    `/auth/user/${id}`,
    {
      token: true,
    },
  )
  const { mutateAsync: updateAsync } = usePut()

  const [roleList, setRoleList] = useState<any>([])
  useEffect(() => {
    refetchGetEmployeeDetail()
    refeachAllRoles()
  }, [])
  useEffect(() => {
    setValue('selectedRoles', getEmployeeDetail?.roles[0]?.roleName)
  }, [getEmployeeDetail])

  useEffect(() => {
    allRoles?.map((role: any) => {
      return setRoleList((prev: any) => [...prev, { label: role?.roleName, value: role?.id }])
    })
  }, [allRoles])

  const formData = async (data: any) => {
    const payload = {
      userId: getEmployeeDetail.id,
      roleIds: [data.selectedRoles],
    }
    try {
      const response = await updateAsync({
        url: 'auth/user/grant',
        payload: payload,
        token: true,
      })
      if (response) {
        notification.success({
          message: 'Roles edited successfully',
          description: 'Your roles has been edited successfully!',
        })
        navigate(EmployeeListRoute.path)
      }
    } catch (error: any) {
      notification.error({
        message: '',
        description: error?.message,
        duration: 2,
      })
      return { error: error?.response?.data?.message }
    }
  }

  return (
    <EmployeeContainer>
      <ContentWrapper>
        <TitleSection>
          <EmployeeTitle
            color={activeColor}
            onClick={() => {
              navigate(EmployeeListRoute?.path)
            }}
          >
            Employee
          </EmployeeTitle>
          <RightIcon />
          <EmployeeHeading color={activeColor}>Employee Detail</EmployeeHeading>
        </TitleSection>
        <form onSubmit={handleSubmit(formData)} className="form">
          <EmployeeDetailWrapper>
            <EmployeeDetailSection>
              <MainHeading>Employee Detail</MainHeading>
              <>
                <EmployeeDetailContainer>
                  <DetailsSection>
                    <DeatilsWrapper>
                      <DetailTitle>User Name</DetailTitle>
                      <DetailDescription>{getEmployeeDetail?.userName}</DetailDescription>
                    </DeatilsWrapper>
                    <DeatilsWrapper>
                      <DetailTitle>Email ID</DetailTitle>
                      <DetailDescription>{getEmployeeDetail?.email}</DetailDescription>
                    </DeatilsWrapper>
                  </DetailsSection>
                </EmployeeDetailContainer>
                <RolesWrapper>
                  <RolesTitle>Roles</RolesTitle>
                  <RoleHeading>Select Roles</RoleHeading>
                  <RolesContainer>
                    <SelectContainer
                      placeholder={getEmployeeDetail?.roles[0]?.roleName}
                      control={control}
                      name="selectedRoles"
                      options={roleList}
                    />
                  </RolesContainer>
                </RolesWrapper>
              </>

              {/* <RolesWrapper>
              <RolesTitle>Grants</RolesTitle>
              <GrantWrapper>
                <GrantsContainer>
                  <RoleHeading>Resources</RoleHeading>
                  <SelectContainer control={control} name="department" placeholder="Select Roles" options={roleData} />
                </GrantsContainer>
                <GrantsContainer>
                  <RoleHeading>Permissions</RoleHeading>
                  <SelectContainer control={control} name="department" placeholder="Select Roles" options={roleData} />
                </GrantsContainer>
                <GrantsContainer>
                  <RoleHeading>Expiration</RoleHeading>
                  <SelectContainer control={control} name="department" placeholder="Select Roles" options={roleData} />
                </GrantsContainer>
                <GrantsButton>
                  <Button label={GrantButton} variant="contained" />
                </GrantsButton>
              </GrantWrapper>
            </RolesWrapper>
            <GrantTable /> */}
            </EmployeeDetailSection>
            {/* <Button type="submit" label={'ok'} variant="contained" /> */}
            <ButtonWrapper>
              <Button label="Change Role" variant="contained" type="submit" style={{ backgroundColor: activeColor }} />
              <Button
                label="Back"
                variant="text"
                type="reset"
                onClick={() => {
                  navigate(EmployeeListRoute?.path)
                }}
              />
            </ButtonWrapper>
          </EmployeeDetailWrapper>
        </form>
      </ContentWrapper>
    </EmployeeContainer>
  )
}

export default EmployeeDetail
