const express = require('express')
const Category = require('../models/Category')
const Content = require('../models/Content')

let router = express.Router()

router.get('/', function(req, res, next) {
    let data = {
        pageNo: 0,
        pageSize: 2,
        pageTotalNo: 0,
        user: req.userInfo,
        categories: [],
        contents: []
    }

    if (req.query.pageNo !== '' && req.query.pageNo !== undefined) {
        data.pageNo = parseInt(req.query.pageNo)
    }
    if (req.query.pageSize !== '' && req.query.pageSize !== undefined) {
        data.pageSize = parseInt(req.query.pageSize)
    }

    Category.find().then(categories => {
        data.categories = categories
        return Content.count()
    }).then(count => {
        data.pageTotalNo = Math.ceil(count / data.pageSize)
        data.pageNo = Math.min(data.pageNo, data.pageTotalNo)
        data.pageNo = Math.max(data.pageNo, 1)

        let skip = (data.pageNo - 1) * data.pageSize

        return Content.find().limit(data.pageSize).skip(skip).sort({
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

module.exports = router
