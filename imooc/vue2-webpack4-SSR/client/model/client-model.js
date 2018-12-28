import axios from 'axios'
import { createError } from './util'

const request = axios.create({
  baseURL: '/'
  /**
   * 浏览器有同域，服务端没有同域。
   * 可以通过VUE_ENV判断服务端环境时，服务端自己给自己发请求，但这样比较怪异，而且最重要的是这样操作无法拿到cookie.
   */
  // baseURL: process.env.VUE_ENV === 'server' ? 'http://127.0.0.1:3333' : '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(res => {
      const data = res.data
      console.log('handleRequest success:', data)
      if (!data) {
        return reject(createError(400, 'No data!'))
      }
      if (!data.success) {
        return reject(createError(400, data.message))
      }
      resolve(data.data)
    }).catch(err => {
      console.error('handleRequest error:', err.message)
      const resp = err.response

      if (resp && resp.status === 401) {
        reject(createError(401, 'need auth'))
      }
    })
  })
}

export default {
  getAllTodos () {
    return handleRequest(request.get('/api/todos'))
  },
  login (userName, password) {
    return handleRequest(request.post('/user/login', { userName, password }))
  },
  addTodo (todo) {
    return handleRequest(request.post('/api/todo', todo))
  },
  updateTodo (id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo))
  },
  deleteTodo (id) {
    return handleRequest(request.delete(`/api/todo/${id}`))
  },
  deleteAllCompleted (ids) {
    return handleRequest(request.post('/api/delete/completed', { ids }))
  }
}
