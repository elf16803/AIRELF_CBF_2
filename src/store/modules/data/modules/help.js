export default {
  namespaced: true,
  state: {
    openDrawer: false,
    helpTitle: '',
    helpContent: '<h1>測試</h1>'
  },
  mutations: {
    triggerDrawer (state, value) {
      state.openDrawer = value
    },
    setHelpTitle (state, title) {
      state.helpTitle = title
    },
    setHelpContent (state, content) {
      state.helpContent = content
    }
  },
  actions: {
    getHelp () {
      // 進入頁面時, 請求 API 取得該頁面的幫助說明資料放進 helpContent
    },
    saveHelp ({ commit, dispatch }, params) {
      // 請求 API 保存新資料內容
      commit('setHelpContent', params.content)
    }
  }
}
