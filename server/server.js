const express = require('express')
const mongoose = require('mongoose')

//连接mongo
const DB_URL = 'mongodb://localhost:27017/'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
    console.log('mongo connect success')
})

// 类似于mysql的表 mongo里面有文档、字段的概念
const User = mongoose.model('user', new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number, require: true}
}))
//新增一条数据
// User.create({
//     name: 'afly',
//     age: 25
// }, function (err, doc) {
//     if (!err) {
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
// })

//删除数据
// User.remove({}, function (err, doc) {
//     if (!err) {
//         console.log(doc)
//     }
// })

//更新数据
// User.update({name: 'afly'}, {'$set': {age: 18}}, function (err, doc) {
//     if (!err) {
//         console.log(doc)
//     }
// })
//新建app
const app = express()

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>')
})

app.get('/data', function (req, res) {
    User.findOne({age: '18'}, function (err, doc) {
        if (!err) {
            res.json(doc)
        }
    })
})

app.listen(9093, function () {
    console.log('Node app start at port 9093')
})