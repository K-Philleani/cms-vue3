import { createApp } from 'vue'
import rootApp from './App.vue'
import Router from './router'
import Store from './store'
import type { App } from 'vue'
import apiRequest from './service'
// 全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
// 局部引入
import 'element-plus/lib/theme-chalk/base.css'
import { globalRegister } from './global'
apiRequest.request({
  url: '/home/multidata',
  method: 'get'
})

const app: App = createApp(rootApp)

app.use(globalRegister)
app.use(Router)
app.use(Store)
app.mount('#app')
