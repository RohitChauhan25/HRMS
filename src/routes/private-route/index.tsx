import { Navigate } from 'react-router-dom'
import { isLogin } from 'utils'

const PrivateRoute = ({ component: RouteComponent }: any) => {
  if (isLogin()) {
    return <RouteComponent />
  }

  return <Navigate to="/" />
}

export default PrivateRoute
