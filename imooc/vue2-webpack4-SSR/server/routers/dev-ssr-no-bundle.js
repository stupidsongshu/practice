const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server-render-no-bundle')

const NativeModule = require('module')
const vm = require('vm')

const serverCompiler = webpack(serverConfig)
/**
 * 开发环境使用memory-fs直接从内存中读取可以提高速度
 * 但是vue-router组件异步加载时会出现问题
 * 目前没有好的解决方案：1.vue-router不使用异步组件；2.开发环境不使用memory-fs
 */
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (error, stats) => {
  if (error) throw error
  stats = stats.toJson()
  stats.errors.forEach(error => console.error(error))
  stats.warnings.forEach(warn => console.warn(warn))

  // const bundlePath = path.join(
  //   serverConfig.output.path,
  //   'server-entry.js'
  // )

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )

  try {
    // 从server-entry.js里面读出的是js字符串，以下为处理成可执行代码
    const bundleStr = mfs.readFileSync(bundlePath, 'utf-8')
    const m = { exports: {} }
    const wrapper = NativeModule.wrap(bundleStr)
    const script = new vm.Script(wrapper, {
      filename: 'server-entry.js',
      displayErrors: true
    })
    const result = script.runInThisContext()
    result.call(m.exports, m.exports, require, m)
    bundle = m.exports.default
  } catch (error) {
    console.error('compile js error:', error)
  }
  console.log('new bundle generated')
})

const handleSSR = async ctx => {
  if (!bundle) {
    ctx.body = 'please wait a little'
    return
  }

  const clientManifestRes = await axios.get('http://127.0.0.1:8000/public/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestRes.data

  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

  const renderer = VueServerRenderer.createRenderer({
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
