import Vuex from 'vuex'
import state from './states/states'
import mutations from './mutations/mutations'
import actions from './actions/actions'

const store = _ => {
  return new Vuex.Store({
    // state: {
    //   count: 0
    // },
    // mutations: {
    //   increment(state, payload) {
    //     state.count++
    //   }
    // }

    state,
    mutations,
    actions
  })
}

export default store
