const express = require('express')

let router = express.Router()

router.use('/', (req, res, next) => {
    res.render('admin/index.html', {
        userInfo: req.userInfo
    })
})

module.exports = router