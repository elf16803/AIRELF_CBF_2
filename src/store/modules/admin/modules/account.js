import storage from '@/libs/storage'
import router from '@/router'
import Setting from '@/setting'

import { Modal } from 'view-design'
import { decode } from 'js-base64'
import { publicEncryptFront } from '@/plugins/js-encrypt'

import { LOGIN, GET_VAIL_IMG, REFRESH_TOKEN, LOGIN_G_AUTH } from '@/grpc/api/sys.js'

const loginSetUserData = async ({ dispatch, token, id }) => {
  const userInfo = JSON.parse(decode(token.split('.')[1]))
  const { nameid, name, nbf } = userInfo

  storage.set('token', token)
  storage.set('uuid', nameid)
  // storage.set('id', id) // 將帳密加密存在 cookie 或 session, 重取 Token 需要使用

  // 设置 vuex 用户信息
  await dispatch('admin/user/set', {
    name,
    nbf,
    access: [] // iview 必須要有 access
  }, { root: true })

  await dispatch('load', { loadOpenedTabs: Setting.page.loadOpenedTabs })

  // 跳轉到首頁
  router.replace('/home')
}

export default {
  namespaced: true,
  actions: {
    getVailImg () {
      return new Promise((resolve, reject) => {
        GET_VAIL_IMG()
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }, 
    autoLogin ({ dispatch }) {
      return new Promise((resolve, reject) => {
        const token = storage.get('auto');
        storage.remove('auto')
        if(token === undefined)
          return;

          loginSetUserData({
            dispatch,
            token
          })
          dispatch('refreshToken')
      })
    },
    login ({ dispatch }, {
      account = '',
      password = '',
      verifyCode = '',
      loginBeforeToken = '',
      isRememberAccount = false
    } = {}) {
      return new Promise((resolve, reject) => {
        LOGIN({
          account,
          password,
          verifyCode,
          loginBeforeToken
        })
          .then(async response => {
            // 帳號記在 vuex
            if (isRememberAccount) {
              const accountEncrypt = publicEncryptFront(account)
              await dispatch('admin/user/setRID', accountEncrypt, { root: true })
            } else {
              await dispatch('admin/user/setRID', '', { root: true })
            }

            if (response === '二段式驗證') {
              // 如果需要二段式驗證, 先將帳密加密後暫時存在 cookie 或 session, 離開二步驟登入頁面就會刪除
              storage.set('gid', publicEncryptFront(`${account},${password}`))

              router.replace('/login/verify')

              resolve(response)
              return
            }

            loginSetUserData({
              dispatch,
              token: response,
              id: publicEncryptFront(`${account},${password}`)
            })

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    loginAuth ({ dispatch }, {
      verifyCode = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        LOGIN_G_AUTH({
          verifyCode
        })
          .then(response => {
            loginSetUserData({
              dispatch,
              token: response,
              id: storage.get('gid')
            })

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 重取 Token
    refreshToken ({ dispatch }, {
      companyId = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        REFRESH_TOKEN({ companyId })
          .then(newToken => {
            storage.set('token', newToken)

            resolve(newToken)
          })
          .catch(error => {
            // 重取 Token 發生錯誤, 則登出
            dispatch('logout', { error })
            reject(error)
          })
      })
    },
    logout ({ commit, dispatch }, {
      confirm = false,
      error = '',
      success = ''
    } = {}) {
      const logoutHandler = async () => {
        commit('admin/log/clean', {}, { root: true })

        // 清空 vuex 使用者信息與菜單權限
        await dispatch('admin/user/set', {}, { root: true })

        storage.remove('token')
        storage.remove('uuid')
        storage.remove('id')

        router.replace('/login')
      }

      if (confirm) {
        // 使用者登出時, 詢問是否確定登出
        Modal.confirm({
          title: '登出確認',
          content: '您確定要登出帳號嗎 ?',
          onOk: () => logoutHandler()
        })
      } else if (error) {
        // 重取 Token 發生錯誤, 強制登出
        Modal.error({
          title: '錯誤訊息',
          content: error.message + '，請重新登入',
          onOk: () => logoutHandler()
        })
      } else if (success) {
        // 密碼, 二步驟驗證 ... 等變更成功的系統登出
        Modal.success({
          title: '成功訊息',
          content: success,
          onOk: () => logoutHandler()
        })
      } else {
        // Token 期限過期, 強制登出
        Modal.info({
          title: '登出訊息',
          content: '已被登出，請重新登入',
          onOk: () => logoutHandler()
        })
      }
    },
    load ({ dispatch }, { loadOpenedTabs = true } = {}) {
      return new Promise(async resolve => {
        // 加载用户登录信息
        await dispatch('admin/user/load', null, { root: true })
        // 持久化数据加载上次退出时的多页列表
        await dispatch('admin/page/openedLoad', { loadOpenedTabs }, { root: true })
        // end
        resolve()
      })
    }
  }
}
