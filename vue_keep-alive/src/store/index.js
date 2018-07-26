import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    indexToListCount: 1,
    listNeedRefresh: false
  },
  mutations: {
    INDEX_TO_LIST_COUNT(state, payload) {
      state.indexToListCount = payload
    },
    LIST_NEED_REFRESH(state, payload) {
      state.listNeedRefresh = payload
    }
  }
})

export default store
