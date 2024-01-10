import { useQuery } from 'react-query'
import axiosInstance from 'services/axiosInstance'

const useGet = (key: string, url: string, configs?: any) => {
  const get = async () => {
    let headers: any = {}
    const authToken = localStorage.getItem('token')
    if (configs?.token) headers = { Authorization: `Bearer ${authToken}` }

    const { data } = await axiosInstance.get(url, { headers })
    return data
  }

  const defaultConfig = {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
    ...configs,
  }
  return useQuery(key, get, defaultConfig)
}

export const useGetAsArraybuffer = (key: string, url: string, configs?: any) => {
  const get = async () => {
    let headers: any
    const authToken = localStorage.getItem('token')
    if (configs?.token)
      headers = {
        Authorization: `Bearer ${authToken}`,
      }

    const { data } = await axiosInstance.get(url, { responseType: 'arraybuffer', headers })
    return data
  }

  const defaultConfig = {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
    ...configs,
  }
  return useQuery(key, get, defaultConfig)
}

export default useGet
