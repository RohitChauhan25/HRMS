import axios from 'axios'
import { toggleLoader } from 'store/slice/loader'
import { resetAllState } from 'store/slice/resetState'
import { store } from 'store/store'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

instance.interceptors.request.use((req) => {
  if (!req?.data?.disableLoader) store.dispatch(toggleLoader(true))
  return req
})

instance.interceptors.response.use(
  function (response) {
    store.dispatch(toggleLoader(false))
    return response
  },

  function (error) {
    if (error.request.status === 401) {
      window.localStorage.removeItem('token')
      store.dispatch(resetAllState())
    }

    store.dispatch(toggleLoader(false))
    return Promise.reject(error)
  },
)

export default instance
