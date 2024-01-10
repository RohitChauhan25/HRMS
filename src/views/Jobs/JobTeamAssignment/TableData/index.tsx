import type { ColumnsType } from 'antd/es/table'
import { IDataType } from 'interfaces'

export const columns: ColumnsType<IDataType> = [
  {
    title: 'Email',
    dataIndex: 'email',
    render: (text: string) => <a>{text}</a>,
  },

  {
    title: 'Role',
    dataIndex: 'hiringStage',
    render: (text: any) => text?.hiringStageName,
  },
  {
    title: 'Actions',
    dataIndex: 'action',
  },
]

export const data: IDataType[] = [
  {
    key: '1',
    name: 'John Brown',

    email: 'example',
    department: 'example',
    role: 'example',
    actions: 'example',
  },
  {
    key: '2',
    name: 'Jim Green',

    email: 'example',
    department: 'example',
    role: 'example',
    actions: 'example',
  },
  {
    key: '3',
    name: 'Joe Black',

    email: 'example',
    department: 'example',
    role: 'example',
    actions: 'example',
  },
  {
    key: '4',
    name: 'Disabled User',

    email: 'example',
    department: 'example',
    role: 'example',
    actions: 'example',
  },
]
