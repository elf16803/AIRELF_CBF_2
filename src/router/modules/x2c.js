export default[
  {
    path: '/x2c',
    name: 'x2c',
    meta: {
      title: 'X2 關稅',
      auth: true,
      cache: true
    },
    component: () => import('@/pages/x2c')
  },
  {
    path: '/x2c/detail',
    name: 'x2c-detail',
    meta: {
      title: 'X2 關稅明細',
      auth: true,
      tabs: false
    },
    component: () => import('@/pages/x2c/detail')
  },
  {
    path: '/x2c/imprt',
    name: 'x2c-imprt',
    meta: {
      title: 'X2 關稅匯入失敗明細',
      auth: true,
      tabs: false
    },
    component: () => import('@/pages/x2c/imprt')
  }
]
