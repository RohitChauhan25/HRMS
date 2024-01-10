import { useSelector } from 'react-redux'
import { RolesTablesProps } from 'interfaces'
import RolesData from 'views/Structure/Roles/RolesTable'
import { RolesWrapper, TableWrapper, TitleSection } from 'styles/views/Structure'

const RolesTables = ({ roles, refetchRole }: RolesTablesProps) => {
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  return (
    <RolesWrapper>
      <TitleSection></TitleSection>
      <TableWrapper color={activeColor}>
        <RolesData roles={roles} refetchRole={refetchRole} />
      </TableWrapper>
    </RolesWrapper>
  )
}

export default RolesTables
