/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 09:16:45
 * @LastEditTime : 2020-01-14 13:59:12
 * @LastEditors  : Please set LastEditors
 */
/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import store from '../store/index'
import { Message } from 'element-ui'
import router from '@/router'
import tip from '@/utils/tip'
import regExp from '@/utils/regExp'
/**
  * @Description: 携带当前页面路由，以期在登录页面完成登录后返回当前页面
  * @Author: WangJiaNan
  * @Date: 2019-04-19 16:36:23
  * @LastEditors: ZLL -- 点设备时无权限，地址跳转到设备无法再次登录
  * @LastEditTime:2019-05-09 13:12:02
 */
const toLogin = () => {
  router.replace({
    path: '/',
    query: {
      // redirect: router.currentRoute.fullPath
      redirect: router.fullPath // 本次迭代暂定跳转到首页
    }
  })
}
/**
   * @Description: 接口返回值错误处理
   * @Author: WangJiaNan
   * @param {number} status:状态返回值
   * @param {String} other:状态返回描述
   * @Date: 2019-04-19 16:36:23
   * @LastEditors: ZLL -- 无权限时清空sessionStorage中的token
   * @LastEditTime:2019-05-09 13:12:02
   */
const errorHandle = (status, other) => {
  let message = other
  switch (status) {
    case '401':
      message = tip.LogonFailure
      let curToken = sessionStorage.getItem('token')
      if (curToken) {
        sessionStorage.removeItem('token')
      }
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    case '404':
      message = tip.networkError
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    default: console.log(other)
      Message.error(other)
      break
  }
}

var instance = axios.create({ timeout: 1000 * 12 }) // 设置超时
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
instance.defaults.headers['Accept-Language'] = 'zh-CN'

// instance.defaults.baseURL = 'http://10.125.24.167:10002/api/v1.0' // zlj后台地址
// instance.defaults.baseURL = 'http://10.20.200.175:30009/api/v1.0' // zlj后台地址
// instance.defaults.baseURL = 'http://iot-config-center:10002/api/v1.0' // zlj后台地址
// 根据环境变量配置不同的基础路径
store.commit('SET_BASEURL', process.env.NODE_ENV)
console.log(process.env.NODE_ENV)
// store.commit('SET_BASEURL', 'test')
instance.defaults.baseURL = store.getters.getBaseUrl
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const tokenStore = store.state.token
    // window.sessionStorage.setItem('token', 'edccf8f598aa019a134cba0fd8e64387')
    const tokenSesstion = window.sessionStorage.getItem('token')
    tokenSesstion && (config.headers.token = tokenSesstion)
    // console.log('tokenSesstion', tokenSesstion)
    // tokenSesstion && (config.headers.token = tokenSesstion) // 首页侧边栏
    return config
  },
  error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    res.status === 200 ? Promise.resolve(res) : Promise.reject(res)
    return res
  },
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false)
      alert(tip.networkError)
      return false
    }
  })

// let loadingOPtions = { // loading 配置
//   fullscreen: false,
//   text: '加载中...'
// }

/**
 * @Description:统一处理code非200时的弹窗提醒
 * @Author: LiSuwan
 * @param {String} code:服务器端返回的处理器状态码
 * @param:{String} message:服务器端返回的处理信息
 * @Date: 2019-04-19 09:03:33
 */
/* const errorHandle = (code, message) => {
  code = code * 1
  switch (code) {
    case 401:
      message = tip.LogonFailure
      break
    default: console.log(1111)
    
      break
  }
  Message.error(message)
}
 */
var request = {
  /**
   * @Description: axios的post请求方法
   * @Author: LiSuwan
   * @param {Object} obj.url:请求路径，obj.params:请求参数，默认值是null
   * @Date: 2019-03-27 21:14:21
   */
  post: (obj) => {
    // let loading = Loading.service(loadingOPtions)
    return new Promise(function (resolve, reject) {
      let { url, params = null } = obj
      return instance.post(url, params).then(res => {
        if (res) {
          console.log(res)
          if (res.data.code === '0') {
            resolve(res.data)
          } else {
            errorHandle(res.data.code, res.data.msg)
            reject(res)
          }
        }
      }).catch((e) => {
        console.log(e)
      }).finally(() => {
        // loading.close()
      })
    })
  },
  /**
   * @Description: axios的get请求方法 以"/"的方式拼接url
   * @Author: LiSuwan
   * @param {Object} obj.url:请求路径，obj.params:请求参数，默认值是null
   * @Date: 2019-03-27 21:14:21
   */
  get: (obj) => {
    // let loading = Loading.service(loadingOPtions)
    return new Promise(function (resolve, reject) {
      let { url, params = '', option = null } = obj
      if (params instanceof Object) { // 把对象转换成字符串
        let paramsArray = Object.values(params)
        params = paramsArray.join('/')
      }
      return instance.get(url + params, option).then(res => {
        console.log(res)
        if (res) {
          if (res.data.code === '0') {
            resolve(res.data)
          } else {
            errorHandle(res.data.code, res.data.message)
          }
        }
      }).catch((e) => {
        console.log(e)
      }).finally(() => {
        // loading.close()
      })
    })
  },
  /**
  * @Description: axios的get请求方法 多个参数，以问号的方式拼接
  * @Author: LiSuwan
  * @param {Object} obj.url:请求路径，obj.params:请求参数，默认值是null
  * @Date: 2019-03-27 21:14:21
  */
  getParams: (obj) => {
    // let loading = Loading.service(loadingOPtions)
    return new Promise(function (resolve, reject) {
      let { url, params = '' } = obj
      return instance.get(url, { params: params }).then(res => {
        if (res) {
          if (res.data.code === '0' ) {
            resolve(res.data)
          } else {
            errorHandle(res.data.code, res.data.message)
          }
        }
      }).catch((e) => {
        console.log(e)
      }).finally(() => {
        // loading.close()
      })
    })
  },
  /**
   * @Description: axios的put请求方法
   * @Author: LiSuwan
   * @param {Object} obj.url:请求路径，obj.params:请求参数，默认值是null
   * @Date: 2019-04-16 16:22:44
   */
  put: (obj) => {
    // let loading = Loading.service(loadingOPtions)
    return new Promise(function (resolve, reject) {
      let { url, params = '' } = obj
      return instance.put(url + params).then(res => {
        if (res) {
          if (res.data.code === '0') {
            resolve(res.data)
          } else {
            errorHandle(res.data.code, res.data.message)
          }
        }
      }).catch((e) => {
        console.log(e)
      }).finally(() => {
        // loading.close()
      })
    })
  },
  /**
   * @Description: axios的get请求方法 以"/"的方式拼接url
   * @Author: LiSuwan
   * @param {Object} obj.url:请求路径，obj.params:请求参数，默认值是null
   * @Date: 2019-03-27 21:14:21
   */
  delete: (obj) => {
    return new Promise(function (resolve, reject) {
      let { url, params = '' } = obj
      if (params instanceof Object) { // 把对象转换成字符串
        let paramsArray = Object.values(params)
        params = paramsArray.join('/')
      }

      return instance.delete(url + params).then(res => {
        if (res) {
          if (res.data.code === '0') {
            resolve(res.data)
          } else {
            errorHandle(res.data.code, res.data.message)
          }
        }
      }).catch((e) => {
        console.log(e)
      }).finally(() => {

      })
    })
  },
  /** 2019-04-23 19:33 添加 张建强 开始 */
  putWithBody: (obj) => {
    // let loading = Loading.service(loadingOPtions)
    return new Promise(function (resolve, reject) {
      let { url, params = '' } = obj
      return instance.put(url, params).then(res => {
        if (res) {
          if (res.data.code === '0') {
            resolve(res.data)
          } else {
            errorHandle(res.data.code, res.data.message)
          }
        }
      }).catch((e) => {
        console.log(e)
      }).finally(() => {
        // loading.close()
      })
    })
    /** 2019-04-23 19:33 添加 张建强 开始 */
  },
  /** 2019-04-23 19:33 添加 张建强 开始 */
  deleteWithBody: (obj) => {
    // let loading = Loading.service(loadingOPtions)
    return new Promise(function (resolve, reject) {
      let { url, data } = obj
      return instance.delete(url, data).then(res => {
        if (res) {
          if (res.data.code === '0') {
            resolve(res.data)
          } else {
            errorHandle(res.data.code, res.data.message)
            reject(res.data)
          }
        }
      }).catch((e) => {
        console.log(e)
      }).finally(() => {
        // loading.close()
      })
    })
  }
}
export default request
