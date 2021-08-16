import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface ReuqestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
interface RequestConfig extends AxiosRequestConfig {
  interceptors?: ReuqestInterceptors
}

export { ReuqestInterceptors, RequestConfig }
