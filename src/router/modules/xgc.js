export default[
  {
    path: '/xgc',
    name: 'xgc',
    meta: {
      title: 'X3G1 轉報關稅',
      auth: true,
      cache: true
    },
    component: () => import('@/pages/xgc')
  },
  {
    path: '/xgc/detail',
    name: 'xgc-detail',
    meta: {
      title: 'X3G1 轉報關稅明細',
      auth: true,
      tabs: false
    },
    component: () => import('@/pages/xgc/detail')
  }
]
