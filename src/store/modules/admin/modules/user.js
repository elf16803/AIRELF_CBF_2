/**
 * 用户信息
 * */
import dayjs from 'dayjs'

export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    RID: ''
  },
  actions: {
    setRID ({ state, dispatch }, account) {
      return new Promise(async resolve => {
        state.RID = account

        await dispatch('admin/db/set', {
          dbName: 'sys',
          path: 'user.RID',
          value: account
        }, { root: true })

        resolve()
      })
    },
    set ({ state, dispatch }, info) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = info
        // 持久化
        await dispatch('admin/db/set', {
          dbName: 'sys',
          path: 'user.info',
          value: info,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },

    load ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = await dispatch('admin/db/get', {
          dbName: 'sys',
          path: 'user.info',
          defaultValue: {},
          user: true
        }, { root: true })
        // end
        resolve()
      })
    }
  },
  getters: {
    loginDate (state) {
      const date = new Date(state.info.nbf * 1000)

      return dayjs(date).format('YYYY/MM/DD HH:mm')
    }
  }
}
