const express = require('express')
const User = require('../models/User')
const Content = require('../models/Content')

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
    let password = req.body.password
    let repassword = req.body.repassword

    if (username === '') {
        responseData.code = 1
        responseData.msg = '用户名不能为空'
        res.json(responseData)
        return
    }

    if (password === '') {
        responseData.code = 2
        responseData.msg = '密码不能为空'
        res.json(responseData)
        return
    }

    if (password !== repassword) {
        responseData.code = 3
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
            responseData.code = 4
            responseData.msg = '用户名已被注册'
            res.json(responseData)
            return
        }

        // 保存用户信息到数据库
        let user = new User({
            username: username,
            password: password
        })
        return user.save()
    }).then(newUserInfo => {
        responseData.msg = '注册成功'
        res.json(responseData)
    })
})

router.post('/user/login', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    if (!username || !password) {
        responseData.code = 1
        responseData.msg = '用户名或密码不能为空'
        res.json(responseData)
        return
    }
    User.findOne({
        username: username,
        password: password
    }).then(userInfo => {
        if (!userInfo) {
            responseData.code = 2
            responseData.msg = '用户名或密码错误'
            res.json(responseData)
            return
        }

        let info = {
            id: userInfo._id,
            username: userInfo.username
        }
        responseData.msg = '登录成功'
        responseData.response = info
        req.cookies.set('userInfo', JSON.stringify(info))
        res.json(responseData)
    })
})

router.get('/user/logout', (req, res, next) => {
    req.cookies.set('userInfo', null)
    res.json(responseData)
})

router.get('/comment', (req, res, next) => {
    let contentId = req.query.contentId || ''
    console.log(contentId)
    Content.findOne({
        _id: contentId
    }).then(content => {
        responseData.comments = content.comments
        res.json(responseData)
    })
})
router.post('/comment/add', (req, res, next) => {
    let username = req.userInfo.username
    let contentId = req.body.contentId
    let commentContent = req.body.comment

    Content.findOne({
        _id: contentId
    }).then(content => {
        let comments = content.comments
        comments.push({
            username,
            commentContent,
            time: new Date().getTime()
        })
        return content.save()
    }).then(newContent => {
        responseData.msg = '评论成功'
        responseData.content = newContent
        res.json(responseData)
    })
})

module.exports = router
