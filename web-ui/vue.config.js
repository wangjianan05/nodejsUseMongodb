/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-18 14:06:43
 * @LastEditTime: 2019-08-16 09:23:37
 * @LastEditors: Please set LastEditors
 */
let path = require('path')
module.exports = {
  publicPath: './',
  lintOnSave: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
        path.resolve(__dirname, 'src/assets/stylus/*.styl')
        // 打开之后common.styl的加载顺序有问题
      ]
    }
  },
  // liswan add  2019-04-15 start
  pwa: {
    iconPaths: { // 修改favicon favicon.ico这个路径不对，所以不显示favicon.ico的，需要改成正确的才会显示
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
  // liswan add  2019-04-15 end
}
