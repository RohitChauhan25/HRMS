import axios from 'axios'

const getLocation: (locationKey: string) => any = async (locationKey: string) => {
  try {
    const response = await axios({
      method: 'get',
      url: process.env.REACT_APP_LOCATION_SEARCH_ENDPOINT + '&query=' + locationKey,
      headers: {
        'Accept-Language': 'en-US',
      },
    })
    const locations = response?.data?.features || []

    return locations?.map((data: any) => {
      return { value: data?.properties?.name, label: data?.properties?.label }
    })
  } catch (_error) {
    return []
  }
}

export default getLocation
