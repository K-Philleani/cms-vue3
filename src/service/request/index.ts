import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ReuqestInterceptors, RequestConfig } from './types'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEFAULT_LOADING = true

class Request {
  instance: AxiosInstance
  interceptor?: ReuqestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    this.showLoading = config.showLoading ?? DEFAULT_LOADING
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
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '加载中...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器：请求拦截失败')
        return err
      }
    )
    // 所有实例都有的响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有的拦截器：响应拦截成功')
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有实例都有的拦截器：响应拦截失败')
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }
  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING
          console.log('res', res)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'get' })
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'post' })
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request
