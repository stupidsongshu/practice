const express = require('express')
const Category = require('../models/Category')

let router = express.Router()

router.get('/', function(req, res, next) {
    Category.find().then(categories => {
        res.render('main/index.html', {
            userInfo: req.userInfo,
            categories
        })
    })
})

module.exports = router
