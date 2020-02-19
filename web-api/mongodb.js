/*
 * @Author: your name
 * @Date: 2020-01-10 15:29:27
 * @LastEditTime: 2020-02-19 13:45:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web-api\model\mysql.js
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user',{ //没有数据库的话自动创建user
  useNewUrlParser:true, //使用新的解析器
  useUnifiedTopology:true, //使用新的引擎
  useCreateIndex:true, //索引
  poolSize:5 //连接池
})
module.exports = mongoose;
