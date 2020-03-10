import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式
import './assets/css/global.css'
import './plugins/element.js'
// 导入阿里icon图标
import './assets/fonts/iconfont.css'
/*阿里icon的使用方法：
1、导入字体样式图标
2、挑选相应图标并获取类名
   必须要有基类 class = "iconfont icon-xxx"*/
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//设置拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  //在最后必须return config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
