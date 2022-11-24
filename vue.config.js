
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  outputDir: 'docs',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 8090,
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true
    },
  },
  chainWebpack: config => {
    // 修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
      .end()
  }
}
