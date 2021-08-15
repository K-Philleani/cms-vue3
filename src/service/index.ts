import axios from 'axios'
import type { AxiosResponse } from 'axios'

// axios基本配置项
axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.timeout = 5000

axios.get('/home/multidata').then((res: AxiosResponse) => {
  console.log(res.data)
})

console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_BASE_URL)
