const express = require('express')
const Category = require('../models/Category')
const Content = require('../models/Content')

let router = express.Router()

let data = {}
router.use((req, res, next) => {
    data = {
        user: req.userInfo,
        categories: []
    }
    Category.find().then(categories => {
        data.categories = categories
        next()
    })
})

router.get('/', function(req, res, next) {
    data.pageNo = 1
    data.pageSize = 2
    data.pageTotalNo = 0
    data.categoryId = req.query.category || ''
    data.contents = []

    let where = {}
    if (data.categoryId) {
        where.category = data.categoryId
    }

    if (req.query.pageNo !== '' && req.query.pageNo !== undefined) {
        data.pageNo = parseInt(req.query.pageNo)
    }
    if (req.query.pageSize !== '' && req.query.pageSize !== undefined) {
        data.pageSize = parseInt(req.query.pageSize)
    }

    Content.where(where).count().then(count => {
        data.pageTotalNo = Math.ceil(count / data.pageSize)
        data.pageNo = Math.min(data.pageNo, data.pageTotalNo)
        data.pageNo = Math.max(data.pageNo, 1)

        let skip = (data.pageNo - 1) * data.pageSize

        return Content.where(where).find().limit(data.pageSize).skip(skip).sort({
            addTime: -1
        })
    }).then(contents => {
        data.contents = contents
        console.log(data)
        res.render('main/index.html', {
            userInfo: req.userInfo,
            data
        })
    })
})

router.get('/content', (req, res, next) => {
    let contentId = req.query.id || ''
    Content.findOne({
        _id: contentId
    }).then(content => {
        // 内容阅读量
        content.views++
        content.save()

        data.content = content
        console.log(data)
        res.render('main/content.html', {
            userInfo: req.userInfo,
            data
        })
    })
})

module.exports = router
