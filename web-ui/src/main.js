/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 14:54:47
 * @LastEditTime: 2019-08-28 14:54:47
 * @LastEditors: your name
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import moment from 'moment'
import request from './request/http'
import urlConfig from './request/api/index'
import regExp from './utils/regExp' // 正则表达式
import utils from './utils/utils'// 工具类函数
import '@/assets/stylus/common.styl' // 公共的样式文件
import 'element-ui/lib/theme-chalk/index.css' // elementUI的样式
import VueClipboard from 'vue-clipboard2'

/** ========= VUE全局变量 start ========= **/
Vue.prototype.$api = request
Vue.prototype.$urlConfig = urlConfig
Vue.prototype.$regExp = regExp
Vue.prototype.$utils = utils
Vue.prototype.$moment = moment
/** ========= VUE全局变量 end ========= **/
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueClipboard)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
