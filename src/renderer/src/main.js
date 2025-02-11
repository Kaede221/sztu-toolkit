import { createApp } from 'vue'
import App from './App.vue'

// 引入Toast 作为弹窗组件
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

createApp(App)
  .use(Vue3Toastify, {
    autoClose: 3000
  })
  .mount('#app')
