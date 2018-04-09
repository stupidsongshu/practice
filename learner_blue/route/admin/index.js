const express = require('express')
const mysql = require('mysql')

module.exports = function() {
    let router = express.Router()

    router.use((req, res, next) => {
        if (!req.session['admin_id'] && req.url !== '/login') {
            res.redirect('/admin/login')
        } else {
            next()
        }
    })

    router.use('/login', require('./login')())

    router.get('/md5', (req, res, next) => {
        let str = '123456'
        let str_crypto = ''

        let MD5_SUFFIX = 'dK8*Jl01mpT@o-w0S=^m'
        let obj = crypto.createHash('md5')
        obj.update(str + MD5_SUFFIX)
        str_crypto = obj.digest('hex')

        res.send(str_crypto).end()
    })

    router.get('/', (req, res, next) => {
        res.render('admin/index.ejs', {})
    })

    router.use('/banner', require('./banner')())

    router.use('/customer', require('./customer')())

    return router
}
