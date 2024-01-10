import { getCollapseColor, getTabColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'
import styled from 'styled-components'

export const EmployeeContainer = styled.div`
  background: #f3f5ff;
  min-height: 100vh;
  overflow-x: hidden;
  width: 100%;
`
export const ContentWrapper = styled.div`
  margin: 20px 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`
export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
export const EmployeeTitle = styled.div<TabProps>`
  padding: 10px;
  border: 1px solid ${(props) => getCollapseColor(props)};
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`
export const EmployeeHeading = styled.div<TabProps>`
  background: ${(props) => getTabColor(props)};
  border-radius: 6px;
  padding: 12px;
  color: rgb(255, 255, 255);
  font-weight: 600;
  font-size: 14px;
`
export const EmployeeDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgb(255, 255, 255);
  border-radius: 16px;
  padding: 30px;
  min-height: 570px;
`
export const EmployeeDetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
export const MainHeading = styled.div`
  color: #1d1d1d;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: capitalize;
`
export const EmployeeDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const DetailsSection = styled.div`
  display: flex;
  gap: 40px;
`
export const DeatilsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
`
export const DetailTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1d1d1d;
`
export const DetailDescription = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #4a4a4a;
`
export const EmployeeStatusWrapper = styled.div`
  width: max-content;
  height: 16px;
  padding: 6px 12px;
  border: 2px solid #bcc6fc;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #1d2e88;
`
export const RolesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const RolesTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #1d1d1d;
`
export const RolesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
`
export const RoleHeading = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #1d1d1d;
`
export const GrantWrapper = styled.div`
  display: flex;
  gap: 20px;
`
export const GrantsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
`
export const GrantsButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 150px;
  width: 100%;
  button {
    margin-top: 24px;
    height: 43px;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  button {
    max-width: 160px;
  }
`
