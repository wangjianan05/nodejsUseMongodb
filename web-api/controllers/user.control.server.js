/*
 * @Author: your name
 * @Date: 2020-01-09 15:12:05
 * @LastEditTime: 2020-02-19 17:39:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web-api\control\user.control.server.js
 */
var express = require('express')
var app = express();
const uuidv1 = require('uuid/v1');
const cors = require("cors");
const crypto = require("crypto"); //node自带的密码加密
// const { get } = require("axios").default; //利用axois发送个网络请求
app.use(cors()); //就这一步就已经解决了跨域
var connection = require('../mongodb');
const {User} = require('../models/user.js');
module.exports = {
  list:app.get('/userList', (req,res)=>{
    var start = (req.query.pageNum-1)*req.query.pageSize
    var end = req.query.pageNum*req.query.pageSize
    new Promise(function(resolve, reject){
      User.find({username:{$regex:req.query.name,$options:'i'}}, function(err, result){
        if(err){
          console.log('[search ERROR] - ',err);
          return;
        }
        console.log(result.length)
        resolve(result.length)
      })
    }).then((data)=>{
      User.find({username:{$regex:req.query.name,$options:'i'}}, function(err, result){
        if(err){
          console.log('[search ERROR] - ',err);
          return;
        }
        res.json({
          code:'0',
          data:result,
          total:data,
          msg:''
        });
      }).limit(Number(req.query.pageSize)).skip(start)
    })
    
  }),
  detail:app.get('/userList/:id', (req,res)=>{
    User.findOne({_id:req.params.id}, function(error, results){
      if (error) throw error;   
      console.log(req.params)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      res.json({
        code:'0',
        data:results,
        msg:''
      });
    })  
  }),
  create:app.post('/userList', (req,res)=>{
    User.findOne({username:req.body.username}, function(error, results){
      if (error) throw error;
      if(results){
        res.json({
          code:'10010',
          data:[],
          msg:'用户名已存在'
        });
        return;
      } else {
        let md5 = crypto.createHash("md5");
        let newPas = md5.update(req.body.password).digest("hex");
         User.create({
          username:req.body.username,
          userage:req.body.userage,
          password:newPas
        },function(err, result){
          if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
          }        
          res.json({
            code:'0',
            data:'',
            msg:'成功'
          });
        })
      }
    })
  }),
  edit:app.put('/userList', (req,res)=>{
    User.findByIdAndUpdate(
      {
        _id: req.body._id
      },{
        username:req.body.username,
        userage:req.body.userage,
        password:req.body.password
      }, function(error, results){
        if(error){
          console.log('[UPDATE ERROR] - ',error);
          return;
        }        
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows',results);
        res.json({
          code:'0',
          data:'',
          msg:'成功'
        });
    })
    
  }),
  delete:app.delete('/userList', (req,res)=>{
    User.deleteOne({_id:[req.body[0]]}, function(error, results){
      if (error) throw error;   
      console.log(results)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      res.json({
        code:'0',
        data:'',
        msg:'成功'
      });
    })  
  }),
  login:app.post('/user/login', (req,res)=>{
    // const {username, password} = req.body;
    let username = req.body.username;
    let password = req.body.password;
    
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    console.log(username,newPas)
    const user = User.findOne({username:username},function(err,result){
      if(err){
        console.log(err);
        return;
      }
      if(!result){
        res.json({
          code:'10020',
          data:[],
          msg:'用户不存在'
        });
        return;
      }
      if(result.password !== newPas){
        res.json({
          code:'10030',
          data:[],
          msg:'密码错误'
        });
        return;
      } else if(result.password === newPas){
        res.json({
          code:'0',
          data:[],
          msg:'成功'
        });
        return;
      } else {
        res.json({
          code:'999',
          data:[],
          msg:'未知错误'
        });
        return;
      }
    })
  }),
}