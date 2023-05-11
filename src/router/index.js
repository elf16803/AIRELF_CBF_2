import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'view-design'

import util from '@/libs/util'

import Setting from '@/setting'
import store from '@/store'

import { getTokenStatus } from '@/grpc/call-api.js'

// 路由数据
import routes from './routes'

// 修復 router 跳轉錯誤
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes,
  mode: Setting.routerMode,
  base: Setting.routerBase
})

const loadingStart = () => {
  if (Setting.showProgressBar) iView.LoadingBar.start()
}

router.beforeEach(async (to, from, next) => {
  // 當前子頁面跳轉路由時, 如果前往的路由不是同系的頁面則停止跳轉路由
  if (to.meta.tabs === false && from.path !== '/') {
    const fromParentRoute = from.name.split('-')[0]
    const toParentRoute = to.name.split('-')[0]

    if (fromParentRoute !== toParentRoute) {
      next(false)
      return
    }
  }

  const tokenStatus = getTokenStatus().status

  if (to.meta.cache && tokenStatus === 'refresh') {
    // 如果前往的路由有緩存, 則判斷需不要重取 toke
    await store.dispatch('admin/account/refreshToken')
  }

  if (to.matched.some(_ => _.meta.auth)) {
    // 前往的路由需要登入
    if (tokenStatus !== 'invalid') {
      // 需要登入, 且 token 狀態 !== 'invalid' (有效), 正常跳轉
      loadingStart()
      next()
    } else {
      if (!from.meta.auth) {
        // Token 無效且當前頁面不用登入 , 則跳轉至 login
        next({ name: 'login' })
      } else {
        // Token 無效則登出
        store.dispatch('admin/account/logout')
      }
    }
  } else if (to.name === 'login' && tokenStatus !== 'invalid') {
    // 如果 token 狀態 !== 'invalid' (有效), 直接跳轉至首頁 (home)
    next({ name: 'home' })
  } else {
    // 前往的路由不需要登入, 直接跳轉
    loadingStart()
    next()
  }
})

router.afterEach(to => {
  if (Setting.showProgressBar) iView.LoadingBar.finish()
  // 多页控制 打开新的页面
  if (!('meta' in to) || (to.meta && !('tabs' in to.meta)) || (to.meta && to.meta.tabs)) {
    store.dispatch('admin/page/open', to)
  }

  // 更改标题
  util.title({
    title: to.meta.title
  })

  // 返回页面顶端
  window.scrollTo(0, 0)
})

export default router
