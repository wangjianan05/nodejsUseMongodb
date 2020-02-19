/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 10:45:30
 * @LastEditTime: 2019-08-16 09:25:42
 * @LastEditors: Please set LastEditors
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
