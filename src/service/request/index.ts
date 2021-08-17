import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ReuqestInterceptors, RequestConfig } from './types'

class Request {
  instance: AxiosInstance
  interceptor?: ReuqestInterceptors
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptor = config.interceptors

    // 实例请求拦截器
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    )
    // 实例响应拦截器
    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responseInterceptorCatch
    )

    // 所有实例都有的请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器：请求拦截成功')
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器：请求拦截失败')
        return err
      }
    )
    // 所有实例都有的响应拦截器
    this.instance.interceptors.response.use(
      (config) => {
        console.log('所有实例都有的拦截器：响应拦截成功')
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器：响应拦截失败')
        return err
      }
    )
  }
  request(config: RequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log('res', res)
    })
  }
  // get() {}
}

export default Request
