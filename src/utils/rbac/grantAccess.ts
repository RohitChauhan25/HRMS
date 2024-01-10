import React from 'react'
import { useSelector } from 'react-redux'

const grantAccess = (roles: Array<string>) => (Component: React.FC<any>, onDeny?: React.FC<any>) => (props: any) => {
  const permissions = useSelector((state: any) => state.user?.user?.permissions)
  const intersection = permissions?.filter((item: string) => roles?.includes(item))
  const hasAccess = intersection?.length
  if (hasAccess) return React.createElement(Component, props, null)
  if (onDeny) return React.createElement(onDeny, props, null)
  return null
}

export default grantAccess
