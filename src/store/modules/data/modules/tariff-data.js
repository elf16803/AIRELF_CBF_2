import {
  GET_CAC,
  GET_XGC,
  GET_XGC_DT,
  GET_X2C,
  IMPRT_X2,
  GET_X2C_DT,
  GET_IMPRT,
  REPORT_CKF
} from '@/grpc/api/sdata'

export default {
  namespaced: true,
  state: {
    cacList: [],
    xgcList: [],
    x2cList: []
  },
  mutations: {
    setCacList (state, cacList) {
      state.cacList = cacList
    },
    setXgcList (state, xgcList) {
      state.xgcList = xgcList
    },
    setX2cList (state, x2cList) {
      state.x2cList = x2cList
    }
  },
  actions: {
    // 清關費
    getCacList ({ commit }, {
      searchDate = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        GET_CAC({
          searchDate
        })
          .then(response => {
            commit('setCacList', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // X3G1 轉報關稅
    getXgcList ({ commit }, {
      searchDate = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        GET_XGC({
          searchDate
        })
          .then(response => {
            commit('setXgcList', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getXgcDetail ({ commit }, {
      searchDate = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        GET_XGC_DT({
          searchDate
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // X2 關稅
    getX2cList ({ commit }, {
      searchDate = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        GET_X2C({
          searchDate
        })
          .then(response => {
            commit('setX2cList', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    imprtX2 ({ commit }, {
      file = '',
      exName = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        IMPRT_X2({
          file,
          exName
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getX2cDetail ({ commit }, {
      mawb = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        GET_X2C_DT({
          mawb
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getImprtList ({ commit }) {
      return new Promise((resolve, reject) => {
        GET_IMPRT()
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 下載文件
    reportCkf ({ commit, dispatch, state, rootState }, {
      searchDate = '',
      category = 0,
      vm
    } = {}) {
      return new Promise((resolve, reject) => {
        REPORT_CKF({
          searchDate,
          category
        })
          .then(response => {
            const currentCompanyName = rootState.data.system.currentCompanyName
            const categoryName = category === 1 ? '清關費' : 'X2 關稅'

            let yearAndMonth = searchDate.split('/')
            yearAndMonth = `${yearAndMonth[0]}年${yearAndMonth[1]}月`

            const a = `${currentCompanyName}_${categoryName}_${yearAndMonth}`;
            vm.$base64.download({
              fileName: `${currentCompanyName}_${categoryName}_${yearAndMonth}`,
              base64: response
            })

            resolve(response)
          })
          .catch(error => {
            vm.$Modal.error({
              title: '錯誤訊息',
              content: error.message
            })

            reject(error)
          })
      })
    }
  }
}
