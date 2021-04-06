import axios from 'axios'
import configFile from '~/config'

const instance = {
  api: axios.create()
}
export const createInstance = () => {
  const backendEndpoint = configFile.endpoint.backend
  const axiosInstance = axios.create({
    baseURL: backendEndpoint
  })

  instance.api = axiosInstance
}

export default instance
