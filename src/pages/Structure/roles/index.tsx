import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useGet from 'hooks/useGet'
import Button from 'components/Button'
import Modal from 'components/Modal'
import AddRoleModal from 'views/Modals/AddRoleModal'
import RolesTables from 'views/Structure/Roles'
import { RolesData } from 'interfaces'
import { ContentWrapper, HeadSection, RolesListContainer, StructureContainer, Title } from 'styles/pages/Roles'
import { RootState } from 'store/store'

const Roles = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [roles, setRoles] = useState<RolesData[]>()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const PermittedEndPoint = useSelector((state: RootState) => state.JobStepperPermission.PermitedEndPoint)

  const { data: getRole, refetch: refetchRole } = useGet('auth-roles', `auth/role`, {
    token: true,
  })

  useEffect(() => {
    refetchRole()
  }, [])

  useEffect(() => {
    setRoles(getRole)
  }, [getRole])

  return (
    <>
      <StructureContainer>
        <ContentWrapper>
          <HeadSection>
            <Title>Roles</Title>
            {PermittedEndPoint['/auth/role']?.includes('CREATE') && (
              <Button
                label="Add New Role"
                variant="contained"
                onClick={() => setModal(true)}
                style={{ backgroundColor: activeColor }}
              />
            )}
          </HeadSection>
          <RolesListContainer>
            <RolesTables roles={roles} refetchRole={refetchRole} />
          </RolesListContainer>
        </ContentWrapper>
      </StructureContainer>
      <Modal isOpen={modal} hideModal={() => setModal(false)}>
        <AddRoleModal setModal={setModal} refetchRole={refetchRole} />
      </Modal>
    </>
  )
}

export default Roles
