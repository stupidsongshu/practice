const express = require('express')

module.exports = function() {
    let router = express.Router()

    router.get('/', (req, res, next) => {
        res.send('web').end()
    })

    return router
}
