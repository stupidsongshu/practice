const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  const data = ctx.request.body
  if (data.userName === 'zys' && data.password === 'zys') {
    // koa-session 给客户端种入session
    ctx.session.user = {
      userName: 'zys'
    }
    ctx.body = {
      success: true,
      data: {
        userName: 'zys'
      }
    }
  } else {
    // ctx.status = 400
    ctx.body = {
      success: false,
      message: 'userName or password error'
    }
  }
})

module.exports = userRouter
