import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { ReuqestInterceptors, RequestConfig } from './types'

class Request {
  instance: AxiosInstance
  interceptor?: ReuqestInterceptors
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptor = config.interceptors

    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responseInterceptorCatch
    )
  }
  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log('res', res)
    })
  }
  // get() {}
}

export default Request
