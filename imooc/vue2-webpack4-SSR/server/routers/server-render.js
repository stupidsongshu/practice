const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.header['Content-Type'] = 'text/html'
  const context = {
    url: ctx.path,
    user: ctx.session.user
  }
  try {
    const appString = await renderer.renderToString(context)

    // console.log('path1-------', context.router.currentRoute.fullPath)
    // console.log('path2-------', ctx.path)
    // 服务端重定向(如用户未登录重定向到login页面)
    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

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
