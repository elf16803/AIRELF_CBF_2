import store from '@/store'

import storage from '@/libs/storage'
import { decode } from 'js-base64'
import { tokenDecrypt } from '@/plugins/js-encrypt'

export const getTokenStatus = (isRefresh = false) => {
  try {
    const currentToken = tokenDecrypt(storage.get('token'))
    const tokenInfo = JSON.parse(decode(currentToken.split('.')[1]))
    const { exp, aud, iss } = tokenInfo
    const now = Math.floor(new Date().getTime() / 1000) // 以秒為單位, 所以除以 1000

    const result = {
      status: '',
      token: currentToken
    }

    if (!currentToken || now > exp ) { //|| aud !== process.env.VUE_APP_TOKEN_AUD || iss !== process.env.VUE_APP_TOKEN_ISS
      result.status = 'invalid'
    } else if (now < exp && now > exp - 300 && !isRefresh) {
      result.status = 'refresh'
    } else {
      result.status = 'valid'
    }

    return result
  } catch (error) {
    return {
      status: 'invalid',
      token: storage.get('token'),
      error: new Error(error)
    }
  }
}

export const callApi = async (apiFun, isRefresh) => {
  const { status, token } = getTokenStatus(isRefresh)

  if (status === 'invalid') {
    // token 無效, 則登出
    store.dispatch('admin/account/logout')

    return new Promise(() => {})
  } else if (status === 'refresh') {
    // 如果在 Token 有效時最後5分鐘內, 則重取新的 Token, 用新 Token 去請求 API
    try {
      const newToken = await store.dispatch('admin/account/refreshToken')

      const newTokenDecrypt = tokenDecrypt(newToken)
      const metaData = {
        Authorization: 'Bearer ' + newTokenDecrypt
      }

      return new Promise((resolve, reject) => apiFun(resolve, reject, metaData))
    } catch (error) {
      store.dispatch('admin/account/logout', { error })
      return new Promise(() => {})
    }
  } else if (status === 'valid') {
    const metaData = {
      Authorization: 'Bearer ' + token
    }

    return new Promise((resolve, reject) => apiFun(resolve, reject, metaData))
  }
}
