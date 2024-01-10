import { useMutation } from 'react-query'
import axiosInstance from 'services/axiosInstance'

interface IParams {
  url: string
  payload?: any
  token?: boolean
}

const Patch = async ({ url, payload, token = true }: IParams) => {
  let headers: any
  if (token) {
    const authToken = localStorage.getItem('token')
    headers = { Authorization: `Bearer ${authToken}` }
  }

  const { data } = await axiosInstance.patch(url, payload, { headers })
  return data
}

const usePatch = () => useMutation(Patch)

export default usePatch
