const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    // 关联字段 - 内容分类的id
    category: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用 对应着模型 models 目录里面 Category.js 的名称
        ref: 'Category'
    },
    // 内容标题
    title: String,
    // 内容简介
    description: {
        type: String,
        default: ''
    },
    // 内容的具体内容
    content: {
        type: String,
        default: ''
    },
    // 关联字段 - 用户id
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // 添加时间
    addTime: {
        type: Date,
        default: new Date()
    },
    // 阅读量
    views: {
        type: Number,
        default: 0
    },
    // 评论
    comments: {
        type: Array,
        default: []
    }
})