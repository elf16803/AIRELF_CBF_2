import Setting from '@/setting'

import util from '@/libs/util'

const { storageType, storagePre } = Setting

const storage = {
  set: (name, value) => {
    if (storageType === 'session') {
      return sessionStorage.setItem(`${storagePre}-${name}`, value)
    }

    return util.cookies.set(name, value)
  },
  get: (name) => {
    if (storageType === 'session') {
      return sessionStorage.getItem(`${storagePre}-${name}`)
    }

    return util.cookies.get(name)
  },
  remove: (name) => {
    if (storageType === 'session') {
      return sessionStorage.removeItem(`${storagePre}-${name}`)
    }

    return util.cookies.remove(name)
  }
}

export default storage
