import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";

Vue.use(VueRouter)

const routes = [
    //重定向 在页面启动得时候 直接打开Login页面
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
