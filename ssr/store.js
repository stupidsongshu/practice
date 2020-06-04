import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItems({commit}, id) {
        // TODO
        commit('setItem', {id, item: 123456})
      }
    },
    mutations: {
      setItem(state, {id, item}) {
        Vue.set(state.items, id, item)
      }
    }
  })
}