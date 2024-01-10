import { useMutation } from 'react-query'
import axiosInstance from 'services/axiosInstance'

interface IParams {
  url: string
  payload?: any
  token?: boolean
}

const post = async ({ url, payload, token = true }: IParams) => {
  let headers: any
  if (token) {
    const authToken = localStorage.getItem('token')
    headers = { Authorization: `Bearer ${authToken}`, 'content-type': 'multipart/form-data; boundary=AaB03x' }
  }

  const { data } = await axiosInstance.put(url, payload, { headers })
  return data
}

const usePutFormData = () => useMutation(post)

export default usePutFormData
