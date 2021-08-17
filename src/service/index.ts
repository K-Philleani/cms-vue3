// service 统一出口
import Request from './request'
import { BASEURL, TIMEOUT } from './request/config'

const apiRequest = new Request({
  baseURL: BASEURL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('实例请求拦截成功')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('实例请求拦截失败')
      return err
    },
    responseInterceptor: (config) => {
      console.log('实例响应拦截成功')
      return config
    },
    responseInterceptorCatch: (err) => {
      console.log('实例响应拦截失败')
      return err
    }
  }
})

export default apiRequest
