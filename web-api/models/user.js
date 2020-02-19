/*
 * @Author: your name
 * @Date: 2020-02-19 14:25:49
 * @LastEditTime: 2020-02-19 16:56:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web-api\models\user.js
 */
const mongoose = require('../mongodb.js');

const UserSchema = new mongoose.Schema({
  username:String,
  userage:Number,
  password:String
})

const User = mongoose.model('User', UserSchema);
module.exports = {User}