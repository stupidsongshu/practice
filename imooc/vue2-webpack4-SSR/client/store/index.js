import Vuex from 'vuex'

const store = _ => {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment(state, payload) {
        state.count++
      }
    }
  })
}

export default store
