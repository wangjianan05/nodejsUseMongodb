/*
 * @Author: your name
 * @Date: 2020-02-19 11:17:52
 * @LastEditTime: 2020-02-19 14:03:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web-api\index.js
 */
// show dbs //查看数据库
// use test //使用当前数据库，新建数据库，test为数据库名称


// 增
// db.test.insert({name:'wangjn',age:'20'}) //插入   db.test.insertOne({name:'haha'})  db.test.insertMany([{name:'123'},{name:'222'}])


// 查 
// $lt 小于
// $lte 小于等于
// $gt 大于
// $gte 大于等于
// $ne 不等于
// db.test.find() //查询所有文档     
// db.test.find({age:{$lt:16}}) //年龄小于16的数据
// db.test.find({name:'234'}) //查找名字为234的文档
// db.test.find({name:'234',age:19}) // 多条件
// or条件
// db.col.find({$or: [{key1: value1}, {key2:value2}]})
// 删除
// db.test.remove({age:{$lt:16}}) //删除年龄小于16的文档，也就是记录行
// db.test.drop() //删除集合，就是表

//修改
// db.collection.update(
//   <query>,
//   <update>,
//   {
//     upsert: <boolean>,
//     multi: <boolean>,
//     writeConcern: <document>
//   }
// )
// query : update的查询条件，类似sql update查询内where后面的。
// update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
// upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
// multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
// writeConcern :可选，抛出异常的级别。

// 只更新第一条记录：

// db.col.update( { "count" : { $gt : 1 } } , { $set : { "test2" : "OK"} } );
// 全部更新：

// db.col.update( { "count" : { $gt : 3 } } , { $set : { "test2" : "OK"} },false,true );
// 只添加第一条：

// db.col.update( { "count" : { $gt : 4 } } , { $set : { "test5" : "OK"} },true,false );
// 全部添加进去:

// db.col.update( { "count" : { $gt : 5 } } , { $set : { "test5" : "OK"} },true,true );
// 全部更新：

// db.col.update( { "count" : { $gt : 15 } } , { $inc : { "count" : 1} },false,true );
// 只更新第一条记录：

// db.col.update( { "count" : { $gt : 10 } } , { $inc : { "count" : 1} },false,false );