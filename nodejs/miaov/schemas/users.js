const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    username: String,
    password: String,
    // 是否为管理员
    isAdmin: {
        type: Boolean,
        default: false
    }
})
