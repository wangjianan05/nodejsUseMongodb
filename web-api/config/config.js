/*
 * @Author: your name
 * @Date: 2020-01-09 16:01:52
 * @LastEditTime : 2020-01-09 16:39:36
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web-api\config\config.js
 */
var config = null;
if(process && process.env && process.env.NODE_ENV){
  config= require('./env/' +  process.env.NODE_ENV)
} else {
  config = require('./env/development')
}
module.exports = config