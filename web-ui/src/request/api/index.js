/*
 * @module:
 * @fileName:
 * @Description:
 * @Author: LiSuwan
 * @Date: 2019-08-28 14:54:47
 */
/**
 * api接口的统一出口
 */
// 用户管理
import environment from './environment'
import login from './login'
import service from './service'
import delMax from './delMax'

let urlConfig = Object.assign( // 合并对象
  environment,
  login,
  service,
  delMax
)

export default urlConfig
