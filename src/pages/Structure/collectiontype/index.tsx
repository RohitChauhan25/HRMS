import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGet from 'hooks/useGet'
import { ResourcesRoute, RolesRoute } from 'constants/routes'
import Modal from 'components/Modal'
import Resource from 'components/Resource'
import Button from 'components/Button'
import CollectionTables from 'views/Structure/CollectionTypes'
import RightIcon from 'assets/svg/RightArrowIcon'
import { ButtonWrapper } from 'styles/pages/editor'
import { ContentWrapper, HeadSection, RolesListContainer, StructureContainer } from 'styles/pages/Roles'
import { EmployeeHeading, EmployeeTitle, TitleSection } from 'styles/pages/Employees/EmployeeDetails'

const collection = () => {
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const { data: getResources, refetch: refetchResource } = useGet('auth/resource', `auth/resource`, {
    token: true,
  })

  useEffect(() => {
    refetchResource()
  }, [])

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
              <EmployeeHeading color={activeColor}>Resources</EmployeeHeading>
            </TitleSection>
            <ButtonWrapper>
              <Button
                label="Add Resource"
                variant="contained"
                onClick={() => setModal(true)}
                style={{ backgroundColor: activeColor }}
              />
              <Button
                label="View Resource"
                variant="contained"
                onClick={() => navigate(ResourcesRoute?.path)}
                style={{ backgroundColor: activeColor }}
              />
            </ButtonWrapper>
          </HeadSection>
          <RolesListContainer>
            <CollectionTables getResources={getResources} refetchResource={refetchResource} />
          </RolesListContainer>
        </ContentWrapper>
      </StructureContainer>
      <Modal isOpen={modal} hideModal={() => setModal(false)}>
        <Resource setModal={setModal} refetchResource={refetchResource} />
      </Modal>
    </>
  )
}

export default collection
