/*
 * @module:工具类 - 函数方法
 * @fileName:
 * @Description:
 * @Author: LiSuwan
 * @Date: 2019-04-02 14:31:55
 */
import { isString } from 'lodash'

/**  liswan delete 2019-04-22 start */
// import regExp from './regExp.js'
/**  liswan delete 2019-04-22 start */

export default {
  /**
   * @description 从url上取参数
   * @Author      LiSuwan
   * @DateTime    2018-11-20T15:18:14+0800
   */
  getRequest () {
    var url = location.search // 获取url中"?"符后的字串
    var theRequest = {}
    if (url.indexOf('?') !== -1) {
      var str = url.substr(1)
      let strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
    }
    return theRequest
  },
  /**
   * @description 获取数组对象的key
   * @Author      LiSuwan
   * @DateTime    2018-09-27T14:16:48+0800
   * @param       {Array}                 arr:处理的数据
   * @return      {Array}                 keys：数组对象的key
   */
  getArryKey (arr) {
    let keys = []
    arr.forEach((v, i) => {
      Object.keys(v).forEach(val => {
        if (val === 'id' || val === 'name') { keys.push(val) }
      })
    })
    return keys
  },
  /**
   * @Description:取消按钮与确定按钮弹窗
   * @Author: LiSuwan
   * @param {object} that:this的作用，必填
   * @param {string} content:弹窗提示语的内容，必填
   * @param {object} options:confirm的配置，可选
   * @Date: 2019-04-11 14:19:15
   */
  confirm (that, content, { title = '', confirmButtonText = '确定', cancelButtonText = '取消', showClose = false, type = 'warning', closeOnClickModal = false, dangerouslyUseHTMLString = true } = {}) {
    return that.$confirm(content, title, {
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      dangerouslyUseHTMLString: dangerouslyUseHTMLString,
      showClose: showClose,
      type: type,
      closeOnClickModal: closeOnClickModal
    })
  },
  /**
   * @Description:确定按钮弹窗
   * @Author: LiSuwan
   * @param {object} that:this的作用，必填
   * @param {string} content:弹窗提示语的内容，必填
   * @param {object} options:confirm的配置，可选
   * @Date: 2019-04-11 14:19:15
   */
  alertHtml (that, content, { showClose = false, type = 'warning', dangerouslyUseHTMLString = true } = {}) {
    return that.$alert(content, {
      dangerouslyUseHTMLString: dangerouslyUseHTMLString,
      showClose: showClose,
      type: type
    })
  },
  /**
   * @Description: 获取字符串长度，中文2位，其他1位
   * @param {string} str - 字符串
   * @return: {number} 字符串长度
   * @Author: ZhangJQ
   * @LastEditors: ZhangJQ
   * @LastEditTime: Do not edit
   * @Date: 2019-04-17 19:07:23
   */
  getStringLength (str = '') {
    if (!isString(str)) {
      return console.warn('getStringLength 方法只支持字符串')
    }
    var stringCopy = str
    return stringCopy.replace(/[\u4e00-\u9fa5]/g, 's').length
  },

  /**
   * @Description: 乘法
   * @Author: LiSuwan
   * @param       {number}  x:乘数
   * @param       {number}  y:被乘数 默认值是1000
   * @return {number}  返回毫秒数
   * @Date: 2019-04-18 09:51:55
   */
  handlerMultiplyCoin (x, y = 1000) {
    return (x * 1) * y
  },
  /**
   * @description 除法
   * @Author      LiSuwan
   * @DateTime    2018-10-12T10:54:30+0800
   * @param       {number}  x:除数
   * @param       {number}  y:被除数 默认值是1000
   * @return      {number}  返回秒
   */
  handlerDividedCoin (x, y = 1000) {
    return parseInt((x * 1) / y) // 取整数
  }

}
