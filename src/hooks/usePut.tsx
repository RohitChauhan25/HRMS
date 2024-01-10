import { useMutation } from 'react-query'
import axiosInstance from 'services/axiosInstance'

interface IParams {
  url: string
  payload?: any
  token?: boolean
}

const put = async ({ url, payload, token = true }: IParams) => {
  let headers: any
  if (token) {
    const authToken = localStorage.getItem('token')
    headers = { Authorization: `Bearer ${authToken}` }
  }

  const { data } = await axiosInstance.put(url, payload, { headers })
  return data
}

const usePut = () => useMutation(put)

export default usePut
