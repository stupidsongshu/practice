const Koa = require('koa')
const KoaSend = require('koa-send')
const KoaBody = require('koa-body')
const KoaSession = require('koa-session')
const path = require('path')

const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')
const appConfig = require('../app.config')
const createDb = require('./db/db')

const db = createDb(appConfig.db.appId, appConfig.db.appKey)

const isDev = process.env.NODE_ENV === 'development'
const app = new Koa()

app.keys = ['vue ssr tech']
const KoaSessionConfig = {
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000
}
app.use(KoaSession(KoaSessionConfig, app))

app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (error) {
    console.error(error)
    ctx.status = 500
    if (isDev) {
      ctx.body = error.message
    } else {
      ctx.body = 'please try agian later'
    }
  }
})

// 数据库
app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})
// 处理favicon
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await KoaSend(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})
// koa默认没有处理post请求body体，需要使用中间件koa-body
app.use(KoaBody())
// 静态资源
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
// api接口请求
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
  // pageRouter = require('./routers/dev-ssr-no-bundle')
  // pageRouter = require('./routers/dev-ssr-no-bundle-no-memoryfs')
} else {
  // pageRouter = require('./routers/ssr')
  pageRouter = require('./routers/ssr-no-bundle')
}
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
