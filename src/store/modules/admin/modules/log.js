import dayjs from 'dayjs'
import { get } from 'lodash'
import storage from '@/libs/storage'

export default {
  namespaced: true,
  state: {
    /**
     * @description 错误日志，单条属性：
     * message: 必填，日志信息
     * type: 非必填，类型，可选值为 info（默认值）| success | warning | error，其中 error 会以具体数目强调显示，其它以点轻量显示
     * time: 必填，日志记录时间
     * meta: 非必填，其它携带信息
     * */
    log: []
  },
  getters: {
    /**
     * @description 返回现存 log (all) 的条数
     * @param {*} state vuex state
     */
    length (state) {
      return state.log.length
    },
    /**
     * @description 返回现存 log (error) 的条数
     * @param {*} state vuex state
     */
    lengthError (state) {
      return state.log.filter(log => log.type === 'error').length
    }
  },
  actions: {
    /**
     * @description 添加一个日志
     * @param {String} param message {String} 信息
     * @param {String} param type {String} 类型
     * @param {Object} param meta {Object} 附带的信息
     */
    push ({ rootState, commit }, { message, type = 'info', meta }) {
      commit('push', {
        message,
        type,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        meta: {
          // 当前用户信息
          user: rootState.admin.user.info,
          // 当前用户的 uuid
          uuid: storage.get('uuid'),
          // 当前的 token
          token: storage.get('token'),
          // 当前地址
          url: get(window, 'location.href', ''),
          // 用户设置
          ...meta
        }
      })
    }
  },
  mutations: {
    /**
     * @description 添加日志
     * @param {Object} state vuex state
     * @param {Object} log data
     */
    push (state, log) {
      state.log.push(log)
    },
    /**
     * @description 清空日志
     * @param {Object} state vuex state
     */
    clean (state) {
      state.log = []
    }
  }
}
