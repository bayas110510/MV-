import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// import { Col } from 'element-ui'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  // start progress bar 开始进度条
  NProgress.start()
  // set page title 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  // 确定用户是否已登录
  const hasToken = getToken()
  // 判断有没有token
  if (hasToken) {
    if (to.path === '/login') {
      console.log('已经登陆,重定向到 首页.当前定向是' + to.path)
      // 如果已登录，请重定向到主页
      // next({ path: '/' })
      next({
        path: '/login'
      })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // 判断角色
      if (hasRoles) {
        console.log('已经获取角色了,角色是' + store.getters.roles)
        const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles)
        router.addRoutes(accessRoutes)
        next()
      } else {
        console.log('出错了出错了出错了出错了出错了出错了 ')
        console.log(hasToken)
        await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go d
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // 没有访问权限的其他页将重定向到登录页。
      next(`/login?redirect=${to.path}`) // 202005heye
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar 完成进度条
  NProgress.done()
})

