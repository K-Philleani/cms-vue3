const path = require('path')

module.exports = {
  // 配置方式一: cli提供的配置方式
  outputDir: './dist',
  // publicPath: './',
  // 配置方式二: 和webpack属性完全一致,最后会进行合并
  // configureWebpack: {
  //   alias: {
  //     components: '@/components'
  //   }
  // }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // 配置方式三
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  }
}
