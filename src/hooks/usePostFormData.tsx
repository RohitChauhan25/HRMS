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

  const { data } = await axiosInstance.post(url, payload, { headers })
  return data
}

const usePostFormData = () => useMutation(post)

export default usePostFormData
