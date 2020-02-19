/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-01 09:09:02
 * @LastEditTime : 2020-01-09 15:25:04
 * @LastEditors  : Please set LastEditors
 */
import * as types from './mutation-type'

const mutation = {
  /**
   * @Description:设置基础路径
   * @Author: ZLL
   * @Param:{String} nodeENV：环境变量的值
   * @Date: 2019-07-31 10:39:20
   */
  [types.SET_BASEURL] (state, nodeENV) {
    switch (nodeENV) {
      case 'test': // 测试环境
        state.baseUrl = 'http://10.20.200.175:32434/api/v1.0'
        break
      case 'production':// 生产环境
        state.baseUrl = 'http://192.168.43.52:8010/'
        // state.baseUrl = window.location.protocol + '//' + window.location.host + '/api/v1.0'
        break
      case 'development':// 开发环境
        // state.baseUrl = 'http://10.133.232.58:8010/'
         state.baseUrl = 'http://localhost:3000/'
        break
      default:
        state.baseUrl = ''
    }
  }
}
export default mutation
