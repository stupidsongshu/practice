const express = require('express')
const User = require('../models/User')

let router = express.Router()

let responseData = {}

router.use((req, res, next) => {
    responseData = {
        code: 0,
        msg: ''
    }
    next()
})

router.post('/user/register', (req, res, next) => {
    let username = req.body.username
    var password = req.body.password
    var repassword = req.body.repassword

    if (username === '') {
        responseData.code = 1
        responseData.msg = '用户名不能为空'
        res.json(responseData)
        return
    }

    if (password === '') {
        responseData.code = 1
        responseData.msg = '密码不能为空'
        res.json(responseData)
        return
    }

    if (password !== repassword) {
        responseData.code = 1
        responseData.msg = '两次密码不一致'
        res.json(responseData)
        return
    }

    // 判断用户名是否已注册
    User.findOne({
        username: username
    }).then(userInfo => {
        console.log(userInfo)
        if (userInfo) {
            responseData.msg = '用户名已被注册'
            res.json(responseData)
            return
        }

        // 保存用户信息到数据库
        var user = new User({
            username: username,
            password: password
        })
        return user.save()
    }).then(newUserInfo => {
        responseData.msg = '注册成功'
        res.json(responseData)
    })
})

module.exports = router
