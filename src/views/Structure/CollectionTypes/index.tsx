import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { notification } from 'antd'
import usePost from 'hooks/usePost'
import { RolesRoute } from 'constants/routes'
import { Cancel, Submit } from 'constants/labels'
import Button from 'components/Button'
import CollectionData from 'views/Structure/CollectionTypes/Collectiondata'
import { CollectionTableProps } from 'interfaces'
import {
  Adminsection,
  AdminArea,
  AdminField,
  AdminTextWrapper,
  DescriptionField,
  Discription,
  RolesWrapper,
  TableWrapper,
  TitleSection,
  WrapperTitle,
  ButtonWrapper,
} from 'styles/views/Structure'

const CollectionTables = ({ refetchResource, getResources }: CollectionTableProps) => {
  const [allPermissionData, setAllpermissionData] = useState([])
  const { state } = useLocation()
  const { mutateAsync } = usePost()
  const navigate = useNavigate()
  const params = useParams()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const submitData = async () => {
    const payload = {
      id: params.roleId,
      policies: allPermissionData,
    }

    try {
      const res = await mutateAsync({
        url: `auth/role`,
        payload: payload,
        token: true,
      })
      if (res) {
        notification.success({
          message: '',
          description: 'Permissions are updated successfully!',
        })
        refetchResource()
        navigate(RolesRoute.path)
      }
    } catch (error: any) {
      notification.error({
        message: '',
        description: error?.response?.data?.message,
        duration: 2,
      })
      return { error: error?.response?.data?.message }
    }
  }

  return (
    <RolesWrapper>
      <AdminTextWrapper>
        <Adminsection>
          <AdminArea>
            <AdminField>Name</AdminField>
            <div contentEditable suppressContentEditableWarning>
              {state?.roleName}
            </div>
          </AdminArea>
        </Adminsection>
        <DescriptionField>
          <Discription>Description</Discription>
          <div contentEditable suppressContentEditableWarning>
            {state?.roleDescription}
          </div>
        </DescriptionField>
      </AdminTextWrapper>
      <TitleSection>
        <WrapperTitle>Resources</WrapperTitle>
      </TitleSection>
      <TableWrapper color={activeColor}>
        <CollectionData
          allPermissionData={allPermissionData}
          setAllpermissionData={setAllpermissionData}
          getResources={getResources}
          refetchResource={refetchResource}
        />
      </TableWrapper>
      <ButtonWrapper>
        <Button
          label={Cancel}
          variant="text"
          onClick={() => {
            navigate(RolesRoute.path)
          }}
        />
        <Button
          label={Submit}
          variant="contained"
          type="submit"
          onClick={submitData}
          style={{ backgroundColor: activeColor }}
        />
      </ButtonWrapper>
    </RolesWrapper>
  )
}

export default CollectionTables
