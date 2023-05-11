import BasicLayout from '@/layouts/basic-layout'

import xgc from './modules/xgc'
import x2c from './modules/x2c'

/**
 * 在主框架内显示
 */

const frameIn = [
  {
    path: '/',
    redirect: {
      name: 'login'
    },
    component: BasicLayout,
    children: [
      {
        path: 'index',
        name: 'index',
        redirect: {
          name: 'login'
        }
      },
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首頁',
          auth: true,
          closable: false
        },
        component: () => import('@/pages/home')
      },
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日誌',
          auth: true
        },
        component: () => import('@/pages/system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(instance => instance.$router.replace(from.fullPath))
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(instance => instance.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h()
        }
      },
      // 側邊選單頁面
      {
        path: 'cac',
        name: 'cac',
        meta: {
          title: '清關費',
          auth: true,
          cache: true
        },
        component: () => import('@/pages/cac')
      },
      ...xgc,
      ...x2c
      // {
      //   path: 'profile/setup',
      //   name: 'profile-setup',
      //   meta: {
      //     title: '個人設置',
      //     auth: true
      //   },
      //   component: () => import('@/pages/profile/setup')
      // },
      // {
      //   path: 'upload',
      //   name: 'upload',
      //   meta: {
      //     title: '上傳頁面',
      //     auth: true
      //   },
      //   component: () => import('@/pages/upload')
      // }
    ]
  }
]

/**
 * 在主框架之外显示
 */

const frameOut = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登入'
    },
    component: () => import('@/pages/account/login')
  },
  {
    path: '/login/verify',
    name: 'login-verify',
    meta: {
      title: '二步驟驗證'
    },
    component: () => import('@/pages/account/verify')
  }
]

/**
 * 错误页面
 */

const errorPage = [
  {
    path: '/403',
    name: '403',
    meta: {
      title: '403'
    },
    component: () => import('@/pages/system/error/403')
  },
  {
    path: '/500',
    name: '500',
    meta: {
      title: '500'
    },
    component: () => import('@/pages/system/error/500')
  },
  {
    path: '*',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import('@/pages/system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
