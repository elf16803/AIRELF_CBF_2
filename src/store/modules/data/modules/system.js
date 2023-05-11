import {
  GET_SYS_DATE,
  GET_CB_NAME
} from '@/grpc/api/sys'

import storage from '@/libs/storage'
import dayjs from 'dayjs'
import { decode } from 'js-base64'

export default {
  namespaced: true,
  state: {
    dateList: [],
    companyList: [],
    currentCompanyName: ''
  },
  mutations: {
    setDateList (state, dateList) {
      state.dateList = dateList
    },
    setCompanyList (state, companyList) {
      state.companyList = companyList
    },
    setCurrentCompanyName (state, currentCompanyName) {
      state.currentCompanyName = currentCompanyName
    }
  },
  actions: {
    getSystemDate ({ commit }) {
      return new Promise((resolve, reject) => {
        GET_SYS_DATE()
          .then(response => {
            const systemDate = new Date(response)
            const year = systemDate.getFullYear()
            const month = systemDate.getMonth()

            const systemDateFirstDay = new Date(year, month, 1)

            const dateList = []

            for (let i = 0; i <= 3; i++) {
              const label = dayjs(systemDateFirstDay).format('YYYY 年 MM 月')
              const value = dayjs(systemDateFirstDay).format('YYYY/MM/DD')

              dateList.push({
                label,
                value
              })

              systemDateFirstDay.setMonth(systemDateFirstDay.getMonth() - 1)
            }

            commit('setDateList', dateList)
            resolve({
              systemDate: response,
              defaultSearchDate: dateList[0].value
            })
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getCompanyList ({ commit }) {
      return new Promise((resolve, reject) => {
        GET_CB_NAME()
          .then(response => {
            // 取 token 資訊
            const token = storage.get('token')
            const { comIDs, companyid } = JSON.parse(decode((token.split('.')[1])))

            const companyIdArray = comIDs.split(',')

            const companyList = response.filter(company => companyIdArray.includes(company['清關公司']))

            const currentCompany = companyList.find(company => company['清關公司'] === companyid)

            commit('setCompanyList', companyList)
            commit('setCurrentCompanyName', currentCompany['名稱'])

            resolve({
              response,
              companyDefault: companyid
            })
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
