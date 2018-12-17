const sha1 = require('sha1')
const axios = require('axios')

const className = 'todo'

const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

const createError = (code, resp) => {
  const error = new Error(resp.message)
  error.code = code
  return error
}

const handleRequest = ({ status, data, ...rest }) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      // SHA1（应用ID + 'UZ' + 应用KEY +'UZ' + 当前时间毫秒数）+ '.' +当前时间毫秒数
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  
  return {
    // 查
    async getAllTodos () {
      return handleRequest(
        await request.get(
          `/${className}`,
          { headers: getHeaders() }
        )
      )
    },
    // 增
    async addTodo (todo) {
      return handleRequest(
        await request.post(
          `/${className}`,
          todo,
          { headers: getHeaders() }
        )
      )
    },
    // 改
    async updateTodo (id, todo) {
      return handleRequest(
        await request.put(
          `/${className}/${id}`,
          todo,
          { headers: getHeaders() }
        )
      )
    },
    // 删
    async deleteTodo (id) {
      return handleRequest(
        await request.delete(
          `/${className}/${id}`,
          { headers: getHeaders() }
        )
      )
    },
    // 批处理-删除
    async deleteCompleted (ids) {
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })
      return handleRequest(
        await request.post(
          '/batch',
          { requests },
          { headers: getHeaders() }
        )
      )
    }
  }
}
