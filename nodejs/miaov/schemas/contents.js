const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    // 关联字段 - 内容分类的id
    category: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用 对应着模型 models 目录里面 Category.js 的名称
        ref: 'Category'
    },
    title: String,
    description: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    }
})