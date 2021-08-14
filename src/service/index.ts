import axios, { AxiosResponse } from 'axios'

// axios基本配置项
axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.timeout = 5000

axios.get('/home/multidata').then((res: AxiosResponse) => {
  console.log(res.data)
})
