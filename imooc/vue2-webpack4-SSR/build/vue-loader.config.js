module.exports = (isDev) => {
  return {
    preserveWhitespace: true,
    extractCSS: !isDev, // 开发环境不允许设置为true否则会报错，只允许在生产环境设置是否要将vue组件内的css提取到单独的文件中
    // hotReload: false,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:8]' : '[hash:base64:8]',
      camelCase: true
    }
  }
}
