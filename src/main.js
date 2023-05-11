import '@babel/polyfill'

// Vue
import Vue from 'vue'
import App from './App'

// 配置
import Setting from './setting'

// 混合
import mixinApp from '@/mixins/app'

// 插件
import plugins from '@/plugins'

// store
import store from '@/store/index'

// iView 和 iView Pro
import ViewUI from 'view-design'
import iViewPro from '@/libs/iview-pro/iview-pro.min.js'

// 菜单和路由
import router from './router'
import menuHeader from '@/menu/header'
import menuSider from '@/menu/sider'
import { frameInRoutes } from '@/router/routes'

// 多语言
import i18n from '@/i18n'

// 方法
import { getHeaderName, getMenuSider, getSiderSubmenu } from '@/libs/system'

// 内置组件
import iLink from '@/components/link'
import iFrame from '@/components/frame'

// 自定義組件
import customCard from '@/components/custom-card'
import pageTable from '@/components/page-table'
import infiniteList from '@/components/infinite-list'
import previous from '@/components/previous'

// 使用样式，修改主题可以在 styles 目录下创建新的主题包并修改 iView 默认的 less 变量
// 参考 https://www.iviewui.com/docs/guide/theme
import './styles/index.less'
import './libs/iview-pro/iview-pro.css'

import './assets/font-awesome/css/all.min.css'
import ScrollLoader from 'vue-scroll-loader'
import base64 from './plugins/base64'

// directive
import './directive'

if (window) window.$t = (key, value) => i18n.t(key, value)

Vue.use(plugins)
Vue.use(ScrollLoader)
Vue.use(base64)

Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value),
  // viewUI 全局配置, 修改 components Icon
  select: {
    customArrow: 'fas fa-angle-down'
  },
  cell: {
    customArrow: 'fas fa-angle-right'
  },
  menu: {
    customArrow: 'fas fa-angle-down'
  },
  tree: {
    customArrow: 'fas fa-angle-right'
  },
  cascader: {
    customArrow: 'fas fa-angle-down',
    customItemArrow: 'fas fa-angle-right'
  },
  colorPicker: {
    customArrow: 'fas fa-angle-down'
  },
  datePicker: {
    customIcon: 'far fa-calendar'
  },
  timePicker: {
    customIcon: 'far fa-clock'
  }
})
Vue.use(iViewPro)

Vue.component('i-link', iLink)
Vue.component('i-frame', iFrame)
Vue.component('custom-card', customCard)
Vue.component('page-table', pageTable)
Vue.component('infinite-list', infiniteList)
Vue.component('previous', previous)

new Vue({
  mixins: [mixinApp],
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('admin/menu/setHeader', menuHeader)
    // 加载用户登录的数据
    this.$store.dispatch('admin/account/load')
    // 初始化全屏监听
    this.$store.dispatch('admin/layout/listenFullscreen')
  },
  watch: {
    // 监听路由 控制侧边栏显示 标记当前顶栏菜单（如需要）
    '$route' (to, from) {
      let path = to.matched[to.matched.length - 1].path
      if (!Setting.dynamicSiderMenu) {
        let headerName = getHeaderName(path, menuSider)
        if (headerName === null) {
          path = to.path
          headerName = getHeaderName(path, menuSider)
        }
        // 在 404 时，是没有 headerName 的
        if (headerName !== null) {
          this.$store.commit('admin/menu/setHeaderName', headerName)
          this.$store.commit('admin/menu/setMenuSider', menuSider)

          const filterMenuSider = getMenuSider(menuSider, headerName)
          this.$store.commit('admin/menu/setSider', filterMenuSider)
          this.$store.commit('admin/menu/setActivePath', to.path)

          const openNames = getSiderSubmenu(path, menuSider)
          this.$store.commit('admin/menu/setOpenNames', openNames)
        }
      }
      this.appRouteChange(to, from)
    }
  }
}).$mount('#app')
