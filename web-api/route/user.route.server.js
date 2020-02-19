/*
 * @Author: your name
 * @Date: 2020-01-09 15:13:18
 * @LastEditTime : 2020-01-15 13:19:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web-api\route\user.route.server.js
 */
var userController = require('../controllers/user.control.server');

module.exports = function(app){
  app.route('/userList')
  .get(userController.list)
  .post(userController.create)
  .put(userController.edit)
  .delete(userController.delete);
  app.route('/userList/:id')
  .get(userController.detail);
  app.route('/user/login')
  .post(userController.login);
}