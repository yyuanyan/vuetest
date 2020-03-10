import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Home from "../components/Home";

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
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 从哪个路径跳转而来
  //next 是一个函数 表示放行
  //    next() 放行 ； next('/login') 强制跳转
  //如果跳转页面为login，则直接放行
  if(to.path === '/login') return next()
  //else
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  //if token不存在，则跳转至login 获取权限
  if (!tokenStr) return next('/login')
  //else
  next()
})
export default router
