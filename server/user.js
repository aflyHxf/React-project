const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd': 0, '__v': 0}
Router.get('/list', function (req, res) {
    // User.remove({}, function () {
    // })
    User.find({}, function (err, doc) {
        if (!err) {
            return res.json(doc)
        }
    })
})
Router.post('/login', function (req, res) {
    const {user, pwd} = req.body
    User.findOne({user, pwd: md5pwd(pwd)}, _filter, function (err, doc) {
        if (!err) {
            if (!doc) {
                return res.json({code: 1, msg: '用户名或密码错误'})
            }
            res.cookie('userId', doc._id)
            return res.json({code: 0, data: doc})
        }
    })
})
Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body
    User.findOne({user}, function (err, doc) {
        if (!err) {
            if (doc) {
                return res.json({code: 1, msg: '用户名已被注册'})
            }
            const userModel = new User({user, pwd: md5pwd(pwd), type})
            userModel.save(function (e, d) {
                if (e) {
                    return res.json({code: 1, msg: '出错了'})
                }
                const {user, type, _id} = d
                res.cookie('userId', _id)
                return res.json({code: 0, data: {user, type, _id}})
            })
        }
    })
})


Router.get('/info', function (req, res) {
    const {userId} = req.cookies
    if (!userId) {
        console.log('这里的code是1')
        return res.json({code: 1})
    }
    User.findOne({_id: userId}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
    //用户有没有cookie信息
})

//md5加盐

function md5pwd(pwd) {
    const salt = 'asjdia_13qe89qw@#!__*(&%jdioas_'
    return utils.md5(utils.md5(pwd + salt))
}


module.exports = Router