import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { Back } from 'constants/labels'
import { RolesRoute } from 'constants/routes'
// import Button from 'components/Button'
import ResourcesTables from 'views/Structure/Resources'
import RightIcon from 'assets/svg/RightArrowIcon'
import { ContentWrapper, HeadSection, RolesListContainer, StructureContainer } from 'styles/pages/Roles'
import { EmployeeHeading, EmployeeTitle, TitleSection } from 'styles/pages/Employees/EmployeeDetails'

const Resources = () => {
  const navigate = useNavigate()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  return (
    <>
      <StructureContainer>
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
              <EmployeeTitle
                color={activeColor}
                onClick={() => {
                  navigate(-1)
                }}
              >
                Resources
              </EmployeeTitle>
              <RightIcon />
              <EmployeeHeading color={activeColor}>View Resources</EmployeeHeading>
            </TitleSection>
            {/* <Button label={Back} variant="contained" onClick={() => navigate(-1)} /> */}
          </HeadSection>
          <RolesListContainer>
            <ResourcesTables />
          </RolesListContainer>
        </ContentWrapper>
      </StructureContainer>
    </>
  )
}

export default Resources
