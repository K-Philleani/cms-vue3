// service 统一出口
import Request from './request'
import { BASEURL, TIMEOUT } from './request/config'

const apiRequest = new Request({
  baseURL: BASEURL,
  timeout: TIMEOUT
})

export default apiRequest
