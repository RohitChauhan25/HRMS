import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, notification } from 'antd'
import { Modal as confirmModal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import useGet from 'hooks/useGet'
import useDelete from 'hooks/useDelete'
import Modal from 'components/Modal'
import UpdateResource from 'components/UpdateResource'
import EditIcon from 'assets/svg/EditIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import { NameWrapper } from 'styles/views/Employees'
import { ActionWrapper } from 'styles/views/Structure'

// Define the structure of the data received from the API
interface DataType {
  key: React.Key
  name: string
  resource: string
  module: string
  subModule: string
}

const ResourcesData = () => {
  const [resources, setResources] = useState<DataType[]>([])
  const [modal, setModal] = useState(false)
  const [record, setRecord] = useState<DataType>()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const { mutateAsync } = useDelete()

  // Function to delete a resource
  const deleteResource = async (roleId: string) => {
    try {
      const res = await mutateAsync({
        url: `auth/resource/${roleId}`,
        token: true,
      })
      if (res) {
        notification.success({
          message: '',
          description: 'Resource is deleted successfully!',
        })
        refetchResource()
      }
    } catch (error: any) {
      notification.error({
        message: '',
        description: error?.response?.data?.message[0],
        duration: 2,
      })
    }
  }

  // Fetch resources data from the API
  const { data: getResources, refetch: refetchResource } = useGet('auth/resource', `auth/resource`, {
    token: true,
  })
  useEffect(() => {
    refetchResource()
  }, [])

  // Effect to update resources when the data from the API changes
  useEffect(() => {
    if (getResources) {
      const allModules = Object.keys(getResources)

      // Iterate through each module
      const allResources = allModules.flatMap((module) => {
        if (getResources[module] && getResources[module].submodules) {
          // Flatten the array of resources from each submodule
          return Object.values(getResources[module].submodules).flat()
        }

        return []
      })

      if (Array.isArray(allResources)) {
        setResources(
          allResources.map((resource: any) => ({
            key: resource.id,
            name: resource.resourceName,
            resource: resource.resource,
            module: resource.module,
            subModule: resource.subModule,
          })),
        )
      }
    }
  }, [getResources])

  // Function to open the update modal
  const Update = () => {
    setModal(true)
  }

  // Function to show the delete confirmation modal
  const showConfirm = (record: any) => {
    confirmModal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this Resource?',
      onOk() {
        deleteResource(record?.key)
      },
      onCancel() {
        return
      },
    })
  }

  // Define the columns for the Ant Design Table
  const columns: ColumnsType<DataType> = [
    {
      title: 'Module',
      dataIndex: 'module',
    },
    {
      title: 'Submodule',
      dataIndex: 'subModule',
    },
    {
      title: 'ResourceName',
      dataIndex: 'name',
      render: (data: string) => {
        return <NameWrapper color={activeColor}>{data}</NameWrapper>
      },
    },
    {
      title: 'Resource',
      dataIndex: 'resource',
    },
    {
      title: 'Action',
      dataIndex: 'key',
      render: (key: React.Key, record: any) => {
        return (
          <ActionWrapper color={activeColor}>
            <EditIcon
              onClick={() => {
                setRecord(record)
                Update()
              }}
            />
            <DeleteIcon onClick={() => showConfirm(record)} className="deleteIcon" />
          </ActionWrapper>
        )
      },
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={resources} />
      <Modal isOpen={modal}>
        <UpdateResource setModal={setModal} record={record} refetchResource={refetchResource} />
      </Modal>
    </>
  )
}

export default ResourcesData
