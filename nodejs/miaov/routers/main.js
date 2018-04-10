const express = require('express')

let router = express.Router()

router.get('/', function(req, res, next) {
    res.render('main/index.html', {
        userInfo: req.userInfo
    })
})

module.exports = router
