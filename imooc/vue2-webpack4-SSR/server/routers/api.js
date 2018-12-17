const Router = require('koa-router')

const apiRouter = new Router({
  prefix: '/api'
})

const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter
  // get
  .get('/todos', async ctx => {
    const todos = await ctx.db.getAllTodos()
    console.log('todos:', todos)
    ctx.body = successResponse(todos)
  })
  // add
  .post('/todo', async ctx => {
    console.log('post body:', ctx.request.body)
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = data
  })
  // update
  .put('/todo/:id', async ctx => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = data
  })
  // delete
  .delete('/todo/:id', async ctx => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = data
  })
  .post('/delete/completed', async ctx => {
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = data
  })

module.exports = apiRouter
