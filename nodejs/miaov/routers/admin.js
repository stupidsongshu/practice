const express = require('express')

let router = express.Router()

router.use('/', (req, res, next) => {
    res.send('admin')
})

module.exports = router