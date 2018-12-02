const Router = require('koa-router')
const Send = require('koa-send')

const staticRouter = new Router({ prefix: '/public' })
staticRouter.get('/*', async ctx => {
  await Send(ctx, ctx.path)
})

module.exports = staticRouter
