const express = require('express')
const url = require('url')
const User = require('../models/User')
const Category = require('../models/Category')

let router = express.Router()

router.use((req, res, next) => {
    if (!req.userInfo.isAdmin) {
        res.send('对不起，您没有权限进入！')
        return
    }
    next()
})

router.get('/', (req, res, next) => {
    res.render('admin/index.html', {
        userInfo: req.userInfo
    })
})

// 用户管理
router.get('/user', (req, res, next) => {
    /* 
        pageNo   当前页数     默认为第1页
        pageSize 每页显示条数  默认查询1000条
        skip     跳过查询的条数
    */

    let pageNo = 1;
    let pageSize = 2;
    let qs = url.parse(req.url, true);
    if (qs.query.pageNo !== '' && qs.query.pageNo !== undefined) {
        pageNo = parseInt(qs.query.pageNo);
    }
    if (qs.query.pageSize !== '' && qs.query.pageSize !== undefined) {
        pageSize = parseInt(qs.query.pageSize);
    }

    User.count().then(count => {
        // 总页数
        let pageTotalNo = Math.ceil(count / pageSize)
        // 当前页数不能大于总页数
        pageNo = Math.min(pageNo, pageTotalNo)
        // 当前页数不能小于1
        pageNo = Math.max(pageNo, 1)

        let skip = (pageNo - 1) * pageSize
        User.find().limit(pageSize).skip(skip).then(users => {
            res.render('admin/users.html', {
                users,
                pageNo,
                pageSize,
                count,
                pageTotalNo,
                url: '/admin/user'
            })
        })
    })
})

// 分类首页
router.get('/category', (req, res, next) => {
    let pageNo = 1;
    let pageSize = 2;
    let qs = url.parse(req.url, true)
    if (qs.pageNo !== '' && qs.pageNo !== undefined) {
        pageNo = qs.pageNo
    }
    if (qs.pageSize !== '' && qs.pageSize !== undefined) {
        pageSize = qs.pageSize
    }

    Category.count().then(count => {
        let pageTotalNo = Math.ceil(count / pageSize)
        pageNo = Math.max(pageNo, pageTotalNo)
        pageNo = Math.min(pageNo, 1)

        let skip = (pageNo - 1) * pageSize
        Category.find().limit(pageSize).skip(skip).then(categories => {
            res.render('admin/category.html', {
                categories,
                pageNo,
                pageSize,
                count,
                pageTotalNo,
                url: '/admin/category'
            })
        })
    })
})

// 分类添加
router.get('/category/add', (req, res, next) => {
    res.render('admin/category_add.html')
})
router.post('/category/add', (req, res, next) => {
    let name = req.body.name || ''
    if (name === '') {
        res.render('admin/error.html', {
            errorMsg: '分类名称不能为空'
        })
        return
    }

    // 判断分类名称是否已注册
    Category.findOne({
        name
    }).then(category => {
        if (category) {
            res.render('admin/error.html', {
                errorMsg: '该分类名称已存在'
            })
            return Promise.reject()
        }

        // 分类名称不存在可以保存
        return new Category({
            name
        }).save()
    }).then((save) => {
        console.log(save)
        res.render('admin/success.html', {
            successMsg: '分类添加成功',
            url: '/admin/category'
        })
    })
})

module.exports = router
