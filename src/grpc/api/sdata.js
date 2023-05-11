import Setting from '@/setting.env'
import { callApi } from '../call-api.js'

import {
  CACReg,
  XGCReg,
  XGCDTReg,
  X2CReg,
  X2FReg,
  X2CDTReg,
  IMPRTReg,
  CKFReg
} from '@/grpc/client/sdata/sdata_pb.js'

import { sdataClient } from '@/grpc/client/sdata/sdata_grpc_web_pb.js'

// eslint-disable-next-line
const sdataService  = new sdataClient(`${Setting.host.ssl}://${Setting.host.name}:${Setting.host.port}`)

// 取得業務員資料
export const GET_CAC = ({
  searchDate = ''
} = {}) => {
  return callApi((resolve, reject, metaData) => {
    const request = new CACReg()

    const DD = new Date(searchDate)
    const year = DD.getFullYear()
    const month = DD.getMonth() + 1

    request.setYear(year)
    request.setMonth(month)

    sdataService.getCAC(request, metaData, (error, response) => {
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

export const GET_XGC = ({
  searchDate = ''
} = {}) => {
  return callApi((resolve, reject, metaData) => {
    const request = new XGCReg()

    const DD = new Date(searchDate)
    const year = DD.getFullYear()
    const month = DD.getMonth() + 1

    request.setYear(year)
    request.setMonth(month)

    sdataService.gETXGC(request, metaData, (error, response) => {
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

export const GET_XGC_DT = ({
  searchDate = ''
} = {}) => {
  return callApi((resolve, reject, metaData) => {
    const request = new XGCDTReg()

    request.setDd(searchDate)

    sdataService.gETXGCDT(request, metaData, (error, response) => {
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

export const GET_X2C = ({
  searchDate = ''
} = {}) => {
  return callApi((resolve, reject, metaData) => {
    const request = new X2CReg()

    const DD = new Date(searchDate)
    const year = DD.getFullYear()
    const month = DD.getMonth() + 1

    request.setYear(year)
    request.setMonth(month)

    sdataService.gETX2C(request, metaData, (error, response) => {
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

export const IMPRT_X2 = ({
  file = '',
  exName = ''
} = {}) => {
  return callApi((resolve, reject, metaData) => {
    const request = new X2FReg()

    request.setFile(file)
    request.setExname(exName)

    sdataService.iMPX2F(request, metaData, (error, response) => {
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

export const GET_X2C_DT = ({
  mawb = ''
} = {}) => {
  return callApi((resolve, reject, metaData) => {
    const request = new X2CDTReg()

    request.setMawb(mawb)

    sdataService.gETX2CDT(request, metaData, (error, response) => {
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

export const GET_IMPRT = () => {
  return callApi((resolve, reject, metaData) => {
    const request = new IMPRTReg()

    sdataService.gETIMPRT(request, metaData, (error, response) => {
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

export const REPORT_CKF = ({
  searchDate = '',
  category = 0
} = {}) => {
  return callApi((resolve, reject, metaData) => {
    const request = new CKFReg()

    const DD = new Date(searchDate)
    const year = DD.getFullYear()
    const month = DD.getMonth() + 1

    request.setCateg(category)
    request.setYear(year)
    request.setMonth(month)

    sdataService.rEPORTCKF(request, metaData, (error, response) => {
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
