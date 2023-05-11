import JsEncrypt from 'jsencrypt'
import cryptoJS from 'crypto-js'

// 前端私鑰解密
export const privateDecryptFront = (value) => {
  const decrypt = new JsEncrypt()
  decrypt.default_key_size = 2048
  decrypt.setPrivateKey(process.env.VUE_APP_FRONT_END_PRIVATE_KEY)

  return decrypt.decrypt(value)
}

// 前端私鑰解密 token 第三段
export const tokenDecrypt = (token) => {
  const tokenSplit = token.split('.')
  const tokenThirdDecrypt = privateDecryptFront(tokenSplit[2])

  return `${tokenSplit[0]}.${tokenSplit[1]}.${tokenThirdDecrypt}`
}

// 前端公鑰匙加密
export const publicEncryptFront = (value) => {
  const encrypt = new JsEncrypt()
  encrypt.default_key_size = 2048
  encrypt.setPublicKey(process.env.VUE_APP_FRONT_END_PUBLIC_KEY)

  return encrypt.encrypt(value)
}

// 後端公鑰加密
export const publicEncryptBack = (value) => {
  const encrypt = new JsEncrypt()
  encrypt.default_key_size = 2048
  encrypt.setPublicKey(process.env.VUE_APP_BACK_END_PUBLIC_KEY)

  return encrypt.encrypt(value)
}

// 前端私鑰加密簽章
export const privateEncryptFrontSign = (value) => {
  const signEncrypt = new JsEncrypt()
  signEncrypt.default_key_size = 2048
  signEncrypt.setPrivateKey(process.env.VUE_APP_FRONT_END_PRIVATE_KEY)

  return signEncrypt.sign(value, cryptoJS.SHA256, 'sha256')
}
