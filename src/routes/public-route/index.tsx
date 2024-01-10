import { Navigate, useLocation } from 'react-router-dom'
import { isLogin } from 'utils'
import { JobDashboardRoute } from 'constants/routes'

export const PublicRoute = ({ component: RouteComponent, restricted }: any) => {
  const location = useLocation()
  if (isLogin() && location.pathname === '/') {
    return <Navigate to={JobDashboardRoute?.path} />
  }

  if (isLogin() && restricted) {
    return <Navigate to={JobDashboardRoute?.path} />
  }

  return <RouteComponent />
}

export default PublicRoute
