import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom'
import routes from 'constants/routes'
import PrivateRoute from 'routes/private-route'
import PublicRoute from 'routes/public-route'
import JobLayout from 'components/Layouts'
import JobDetails from 'pages/careers/job-details'
import ApplyNow from 'pages/careers/apply-now'

const Routes = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route path="/careers/job-details/:id" element={<JobDetails />} />
      <Route path="/careers/apply-now/:id" element={<ApplyNow />} />

      {routes.map((route, index) => {
        const { component: Component, path, restricted } = route

        return (
          <Route
            key={index}
            path={path}
            element={
              restricted ? (
                <JobLayout>
                  <PrivateRoute component={Component} />
                </JobLayout>
              ) : (
                <PublicRoute restricted={false} component={Component} />
              )
            }
          />
        )
      })}
    </ReactRoutes>
  </BrowserRouter>
)

export default Routes
