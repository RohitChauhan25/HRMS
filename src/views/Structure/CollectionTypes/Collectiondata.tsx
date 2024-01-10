import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import useGet from 'hooks/useGet'
import { CollectionWrapper, HeaderWrapper, Input } from 'styles/views/Structure/Collectiontypes'
import { Collapse } from 'antd'

interface DataType {
  key: React.Key
  name: string
  Description: string
  Users: string
}

const CollectionData = ({ allPermissionData, setAllpermissionData, getResources }: any) => {
  const [resourceData2, setResoucesData2] = useState<any>([])
  const [uniqeKey, seUnieqKey] = useState(1)
  const params = useParams()
  const { data: getRolesData, refetch: refetchRoleData } = useGet('auth/role/id', `auth/role/${params?.roleId}`, {
    token: true,
  })

  useEffect(() => {
    seUnieqKey(Math.floor(Math.random() * 10 + 1))
    refetchRoleData()
  }, [])

  const givePermission = (id: string, permissison: string) => {
    const prev = allPermissionData?.filter((data: any) => data.resourceId === id)
    const obj = {
      permissions: prev[0]?.permissions?.length > 0 ? [permissison, ...prev[0]?.permissions] : [permissison],
      resourceId: id,
    }

    const allData = allPermissionData

    let index = -1
    allPermissionData?.map((data: any, ind: number) => {
      if (data.resourceId === id) {
        index = ind
      }
    })

    index >= 0 && allData.splice(index, 1)
    setAllpermissionData([...allData, obj])
  }

  const removePermission = (id: string, permissison: string) => {
    const prev = allPermissionData?.filter((data: any) => data.resourceId === id)
    const filterPermission = prev[0]?.permissions?.filter((data: string) => data !== permissison)
    const obj = {
      permissions: filterPermission,
      resourceId: id,
    }
    const allData = allPermissionData
    let index = -1
    allPermissionData?.map((data: any, ind: number) => {
      if (data.resourceId === id) {
        index = ind
      }
    })
    index >= 0 && allData.splice(index, 1)
    setAllpermissionData([...allData, obj])
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '',
      dataIndex: 'resourceName',
    },
    {
      title: '',
      dataIndex: 'resource',
    },
    {
      title: (
        <CollectionWrapper>
          <HeaderWrapper>CREATE</HeaderWrapper>
        </CollectionWrapper>
      ),
      render: (key: React.Key, record: any) => {
        return (
          <CollectionWrapper>
            <Input
              type="checkbox"
              defaultChecked={record?.permissions?.includes('CREATE') ? true : false}
              onChange={(e) => {
                if (e.target.checked) {
                  givePermission(record.id, 'CREATE')
                } else {
                  removePermission(record.id, 'CREATE')
                }
              }}
            />
          </CollectionWrapper>
        )
      },
    },

    {
      title: (
        <CollectionWrapper>
          <HeaderWrapper>READ</HeaderWrapper>
        </CollectionWrapper>
      ),
      render: (key: React.Key, record: any) => {
        return (
          <CollectionWrapper>
            <Input
              type="checkbox"
              defaultChecked={record.permissions?.includes('READ') ? true : false}
              onChange={(e) => {
                if (e.target.checked) {
                  givePermission(record.id, 'READ')
                } else {
                  removePermission(record.id, 'READ')
                }
              }}
            />
          </CollectionWrapper>
        )
      },
    },
    {
      title: (
        <CollectionWrapper>
          <HeaderWrapper>UPDATE</HeaderWrapper>
        </CollectionWrapper>
      ),
      render: (key: React.Key, record: any) => {
        return (
          <CollectionWrapper>
            <Input
              type="checkbox"
              defaultChecked={record.permissions?.includes('UPDATE') ? true : false}
              onChange={(e) => {
                if (e.target.checked) {
                  givePermission(record.id, 'UPDATE')
                } else {
                  removePermission(record.id, 'UPDATE')
                }
              }}
            />
          </CollectionWrapper>
        )
      },
    },
    {
      title: (
        <CollectionWrapper>
          <HeaderWrapper>DELETE</HeaderWrapper>
        </CollectionWrapper>
      ),
      render: (key: React.Key, record: any) => {
        return (
          <CollectionWrapper>
            <Input
              type="checkbox"
              defaultChecked={record.permissions?.includes('DELETE') ? true : false}
              onChange={(e) => {
                if (e.target.checked) {
                  givePermission(record.id, 'DELETE')
                } else {
                  removePermission(record.id, 'DELETE')
                }
              }}
            />
          </CollectionWrapper>
        )
      },
    },
  ]

  useEffect(() => {
    let permission: string[] = []
    if (getRolesData?.resources) {
      permission = Object.keys(getRolesData?.resources)?.map((key) => key)

      const tempPermissisonData = Object.keys(getRolesData?.resources).map(function (key) {
        return {
          permissions: getRolesData?.resources[key],
          resourceId: key,
        }
      })

      setAllpermissionData(tempPermissisonData)
    }

    const data: { name: string; data: { name: string; data: any }[] }[] = Object.keys(getResources || {})?.map(
      (key) => {
        const obj = { name: key, data: [] as { name: string; data: any }[] }
        const submodules = getResources[key]?.submodules
        if (submodules) {
          Object.keys(submodules)?.map((key2) => {
            const TableData = submodules[key2]?.map((item: any) => {
              return {
                ...item,
                permissions: permission?.includes(item?.id) ? getRolesData?.resources[item?.id] : [],
              }
            })

            const sub = {
              name: key2,
              data: submodules[key2],
              key: key2,
              label: key2,
              data2: TableData,
              children: <Table columns={columns} dataSource={TableData} key={uniqeKey} pagination={false} />,
            }
            obj.data.push(sub)
          })
        }

        return obj
      },
    )

    setResoucesData2(data)
  }, [getResources, getRolesData])

  return (
    <>
      {/* <Table
      items={item.data}
        columns={columns}
        dataSource={resourceData?.length > 0 ? resourceData : [],}
        key={uniqeKey}
        pagination={false}
      /> */}
      {/* {getResources?.data?.map((item: any) => (
        <div key={item}>{item}</div>
      ))} */}

      {resourceData2 &&
        resourceData2.map((item: any) => {
          return (
            <div key={item.name}>
              <div style={{ margin: '10px 10px', fontSize: '20px', fontWeight: '700' }}>{item.name}:</div>
              <div>
                <Collapse defaultActiveKey={['1']}>
                  {item?.data?.map((panel: any) => (
                    <Collapse.Panel key={panel.key} header={panel.name}>
                      <Table columns={columns} dataSource={panel.data2} key={uniqeKey} pagination={false} />
                    </Collapse.Panel>
                  ))}
                </Collapse>
                {/* <Table columns={columns} dataSource={item} key={uniqeKey} pagination={false} /> */}
                {/* <Collapse items={item.data} defaultActiveKey={['1']} style={{ background: 'rgb(243, 245, 255)' }} /> */}
              </div>
            </div>
          )
        })}
      {/* <Collapse items={items} defaultActiveKey={['1']} /> */}
    </>
  )
}

export default CollectionData
