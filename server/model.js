const mongoose = require('mongoose')
//连接mongo
const DB_URL = 'mongodb://localhost:27017/react-chat'
mongoose.connect(DB_URL)

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        //头像
        'avatar': {type: String},
        //个人简介
        'desc': {type: String},
        //职位名
        'title': {type: String},
        //如果是BOSS，还有两个字段
        'company': {type: String},
        'money': {type: Number}
    },
    chat: {},
}

for (let m in models) {
    mongoose.model(m, mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}