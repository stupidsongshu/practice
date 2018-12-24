import model from '../../model/client-model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = (err) => {
  console.log('handleError:', err, err.message)
  if (err.code === 401) {
    notify({
      content: '给我滚去登录！'
    })
    // bus.$router.push('/login')
    bus.$emit('needLogin')
  }
}

const actions = {
  fetchTodos ({ commit }) {
    model.getAllTodos().then(res => {
      commit('fillTodos', res)
    }).catch(err => {
      handleError(err)
    })
  },
  login ({ commit }, { userName, password }) {
    return new Promise((resolve, reject) => {
      model.login(userName, password).then(res => {
        console.log('action login success:', res)
        commit('userInfo', res)
        resolve()
      }).catch(err => {
        console.log('action login err:', err)
        handleError(err)
        reject(err)
      })
    })
  },
  addTodo ({ commit }, todo) {
    model.addTodo(todo).then(res => {
      console.log('addTodo:', res)
      commit('addTodo', res)
      notify({
        content: '你又多了一件事要做'
      })
    }).catch(err => {
      handleError(err)
    })
  },
  updateTodo ({ commit }, { id, todo }) {
    model.updateTodo(id, todo).then(res => {
      console.log('updateTodo:', res)
      commit('updateTodo', { id, todo })
    }).catch(err => {
      handleError(err)
    })
  },
  deleteTodo ({ commit }, id) {
    model.deleteTodo(id).then(res => {
      console.log('deleteTodo:', res)
      commit('deleteTodo', id)
      notify({
        content: '你又少了一件事要做'
      })
    }).catch(err => {
      handleError(err)
    })
  },
  deleteAllCompleted ({ commit }, { ids }) {
    model.deleteAllCompleted(ids).then(res => {
      console.log('deleteAllCompleted:', res)
      commit('deleteAllCompleted')
      notify({
        content: '删除成功所有已做完的事情'
      })
    }).catch(err => {
      handleError(err)
    })
  }
}

export default actions
