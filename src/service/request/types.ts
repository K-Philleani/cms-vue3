import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface ReuqestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}
interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ReuqestInterceptors<T>
  showLoading?: boolean
}

export { ReuqestInterceptors, RequestConfig }
