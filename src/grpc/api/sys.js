import Setting from '@/setting.env'
import storage from '@/libs/storage'
import { callApi } from '../call-api.js'

import { publicEncryptBack, privateDecryptFront, privateEncryptFrontSign, tokenDecrypt } from '@/plugins/js-encrypt'

// 引入需要的請求 Function
import {
  LoginReg,
  sysDateReg,
  VailReg,
  CBNAMEReg
} from '@/grpc/client/sys/sys_pb.js'

import { sysClient } from '@/grpc/client/sys/sys_grpc_web_pb.js'
// eslint-disable-next-line
const sysService  = new sysClient(`${Setting.host.ssl}://${Setting.host.name}:${Setting.host.port}`)

// 登入
export const LOGIN = ({
  account = '',
  password = '',
  verifyCode = '',
  loginBeforeToken = ''
} = {}) => {
  return new Promise((resolve, reject) => {
    const request = new LoginReg()

    const token = tokenDecrypt(loginBeforeToken)

    const loginData = `${account},${password}`

    const loginDataEncrypted = publicEncryptBack(loginData)
    const signature = privateEncryptFrontSign(loginData)

    request.setLogindata(loginDataEncrypted) // 傳給後端加密後的登入資料
    request.setSignatrue(signature) // 傳給後端加密後的簽章資料, 用以確認請求來源
    request.setVerifycode(verifyCode)

    sysService.login(request, { Authorization: 'Bearer ' + token }, (error, response) => {
      if (response) {
        const result = response.getResult()

        if (!result.startsWith('Error-')) {
          resolve(result)
        } else {
          reject(new Error(result))
        }
      } else {
        console.error(error)
        reject(error)
      }
    })
  })
}

// 登入二步驟驗證
export const LOGIN_G_AUTH = ({
  verifyCode = ''
} = {}) => {
  return new Promise((resolve, reject) => {
    const request = new LoginReg()

    const account = privateDecryptFront(storage.get('gid')).split(',')[0]

    const loginDataEncrypted = publicEncryptBack(`${account},${verifyCode}`)
    const signature = privateEncryptFrontSign(`${account},${verifyCode}`)

    request.setLogindata(loginDataEncrypted)
    request.setSignatrue(signature)

    sysService.loginGAuth(request, {}, (error, response) => {
      if (response) {
        const result = response.getResult()

        if (!result.startsWith('Error-')) {
          resolve(result)
        } else {
          reject(new Error(result))
        }
      } else {
        console.error(error)
        reject(error)
      }
    })
  })
}

// 取得新 TOKEN
export const REFRESH_TOKEN = ({
  companyId = ''
} = {}) => {
  return callApi((resolve, reject, metaData) => {
    const request = new LoginReg()

    // 2021-7-19 改用token 取token
    // const loginData = privateDecryptFront(storage.get('id'))
    // const account = loginData.split(',')[0]
    // const password = loginData.split(',')[1]
    // const loginDataEncrypted = publicEncryptBack(`${account},${password},${companyId}`)
    // const signature = privateEncryptFrontSign(`${account},${password},${companyId}`)
    // request.setLogindata(loginDataEncrypted)
    // request.setSignatrue(signature)

    //放入清關公司編號
    request.setLogindata(companyId);

    sysService.refreshToken(request, metaData, (error, response) => {
      if (response) {
        const result = response.getResult()

        if (!result.startsWith('Error-')) {
          resolve(result)
        } else {
          reject(new Error(result))
        }
      } else {
        console.error(error)
        reject(error)
      }
    })
  }, true)
}

// 取得 server 端時間
export const GET_SYS_DATE = () => {
  return callApi((resolve, reject, metaData) => {
    // eslint-disable-next-line
    const request = new sysDateReg()

    sysService.sysDate(request, metaData, (error, response) => {
      if (response) {
        const result = response.getResult()

        if (!result.startsWith('Error-')) {
          resolve(result)
        } else {
          reject(new Error(result))
        }
      } else {
        console.error(error)
        reject(error)
      }
    })
  })
}

// 取得驗證碼圖片
export const GET_VAIL_IMG = () => {
  return new Promise((resolve, reject) => {
    const request = new VailReg()

    const key = publicEncryptBack('ELFIMG')
    const signature = privateEncryptFrontSign('ELFIMG')

    request.setV1(key)
    request.setV2(signature)

    sysService.getVailIMG(request, {}, (error, response) => {
      if (response) {
        let result = response.getResult()

        if (!result.startsWith('Error-')) {
          result = result.split(',')

          resolve({
            imgSrc: 'data:image/png;base64,' + result[0],
            loginBeforeToken: result[1]
          })
        } else {
          reject(new Error(result))
        }
      } else {
        console.error(error)
        reject(error)
      }
    })
  })
}

// 取得清關公司名稱
export const GET_CB_NAME = () => {
  return callApi((resolve, reject, metaData) => {
    const request = new CBNAMEReg()

    sysService.gETCBNAME(request, metaData, (error, response) => {
      if (response) {
        const result = response.getResult()

        if (!result.startsWith('Error-')) {
          resolve(JSON.parse(result))
        } else {
          reject(new Error(result))
        }
      } else {
        console.error(error)
        reject(error)
      }
    })
  })
}
