const ejs = require('ejs')

module.exports = async (ctx, renderer, template, bundle) => {
  ctx.header['Content-Type'] = 'text/html'
  const context = {
    url: ctx.path,
    user: ctx.session.user
  }
  try {
    const app = await bundle(context)

    // 服务端重定向(如用户未登录重定向到login页面)
    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    const appString = await renderer.renderToString(app, context)

    const {
      title
    } = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      initialState: context.renderState()
    })
    ctx.body = html
  } catch (error) {
    console.error('render error', error)
    throw error
  }
}
