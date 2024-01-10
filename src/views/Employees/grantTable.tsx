import React from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: React.Key
  resources: string
  permissions: string
  expirationDate: string
  action: string
}

const GrantTable: React.FC = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Resources',
      dataIndex: 'resources',
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expirationDate',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ]

  const data: DataType[] = [
    {
      key: '1',
      resources: 'Candidate',
      permissions: 'CRUD',
      expirationDate: '30/07/23',
      action: 'Delete',
    },
    {
      key: '2',
      resources: 'Employee',
      permissions: 'CRUD',
      expirationDate: '30/07/23',
      action: 'Delete',
    },
    {
      key: '3',
      resources: 'Candidate',
      permissions: 'CRUD',
      expirationDate: '30/07/23',
      action: 'Delete',
    },
    {
      key: '3',
      resources: 'Employee',
      permissions: 'CRUD',
      expirationDate: '30/07/23',
      action: 'Delete',
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default GrantTable
