import regexUtil from 'regex-util'

export const isChinese = (rule, value, callback) => {
  if (!value) {
    callback(new Error(rule.msg))
  } else if (!regexUtil.isChinese(value)) {
    callback(new Error('請輸入中文'))
  } else {
    callback()
  }
}

export const isPhone = (rule, value, callback) => {
  const phoneRegex = /^(09)[0-9]{8}$/

  if (!value) {
    callback(new Error(rule.msg))
  } else if (phoneRegex.test(value) !== true) {
    callback(new Error('請輸入正確的手機號碼'))
  } else {
    callback()
  }
}

// 修改新密碼驗證
export const newPasswordValidate = (rule, value, callback) => {
  const { vm, formName, checkField } = rule
  const passwordRegex = /^(?=\D*\d)(?=[^a-z]*[a-z])[0-9a-z]+$/

  if (!value) {
    callback(new Error(rule.msg))
  } else if (passwordRegex.test(value) !== true) {
    callback(new Error('需要至少一個英文、一個數字'))
  } else if (value.length < 8) {
    callback(new Error('最少需要 8 個字'))
  } else if (value.length > 16) {
    callback(new Error('不可以超過 16 個字'))
  } else if (value === vm[formName][checkField]) {
    callback(new Error('請與舊密碼不同'))
  } else {
    callback()
  }
}

// 確認密碼驗證是否與密碼符合
export const checkPassword = (rule, value, callback) => {
  const { vm, formName, checkField } = rule

  if (value !== vm[formName][checkField]) {
    callback(new Error('確認密碼錯誤'))
  } else {
    callback()
  }
}
