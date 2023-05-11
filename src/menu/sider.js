import xgc from './modules/xgc'
import x2c from './modules/x2c'

export default [
  {
    path: '/home',
    title: '首頁',
    header: 'home',
    auth: ['hidden']
  },
  {
    path: '/cac',
    title: '清關費',
    header: 'home',
    custom: 'fas fa-ship'
  },
  ...xgc,
  ...x2c,
  // {
  //   path: '/profile/setup',
  //   title: '個人設置',
  //   header: 'home',
  //   custom: 'fas fa-user-cog'
  // },
  // {
  //   path: '/upload',
  //   title: '上傳頁面',
  //   header: 'home',
  //   custom: 'fas fa-cloud-upload-alt'
  // },
  // 系統
  {
    path: '/log',
    title: '前端日誌',
    header: 'system',
    auth: ['hidden']
  }
]
