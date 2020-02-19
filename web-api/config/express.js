/*
 * @Author: your name
 * @Date: 2020-01-09 16:02:39
 * @LastEditTime : 2020-01-17 15:10:57
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web-api\config\express.js
 */
var express = require('express')
var app = express();
const cors = require("cors");
var bodyParser = require('body-parser')
app.use(cors()); //就这一步就已经解决了跨域
app.use(bodyParser.json());

// 每次应用程序收到请求时，它将消息“ LOGGED”打印到终端。
// 中间件加载的顺序很重要：首先加载的中间件功能也将首先执行。
// 如果myLogger在到达根路径的路由之后加载，则请求永远不会到达请求，并且应用程序不会显示“ LOGGED”，因为根路径的路由处理程序会终止请求-响应周期。
// 中间件函数myLogger仅打印一条消息，然后通过调用该next()函数将请求传递到堆栈中的下一个中间件函数。
var myLogger = function (req, res, next) { //通用中间件功能，打印一段字符串
  console.log('LOGGED')
  next() //回调函数，表示进入下一步
}
app.use(myLogger)
module.exports = function(){
  console.log('init express...');
  require('../route/user.route.server')(app)
  app.use(function(req, res, next){
    res.status(404);
    try{
      return res.json('not found')
    }catch(e){
      console.log(e)
    }
  });
  app.use(function(err, req, res, next){
    if(!err){
      return next()
    };
    res.status(500);
    try{
      return res.json(err.message || 'server error')
    }catch(e){
      console.log(e)
    }
  })
  return app;
}