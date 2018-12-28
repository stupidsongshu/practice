const mutations = {
  fillTodos (state, payload) {
    state.todos = payload
  },
  userInfo (state, payload) {
    state.user = payload
  },
  addTodo (state, payload) {
    state.todos.unshift(payload)
  },
  updateTodo (state, { id, todo }) {
    state.todos.splice(state.todos.findIndex(t => t.id === id), 1, todo)
  },
  deleteTodo (state, id) {
    state.todos.splice(state.todos.findIndex(t => t.id === id), 1)
  },
  deleteAllCompleted (state) {
    state.todos = state.todos.filter(t => !t.completed)
  },
  startLoading (state) {
    state.loading = true
  },
  endLoading (state) {
    state.loading = false
  }
}

export default mutations
