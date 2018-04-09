const express = require('express')

function router_article() {
    let router = express.Router()
    router.get('/1.html', (req, res, next) => {
        // res.send('article1').end()
        res.render('1.ejs', {
            title: '模板标题',
            name: '王者荣耀'
        })
    })
    router.get('/2.html', function(req, res, next) {
        res.end('article2')
    })
    router.get('/3.html', function(req, res, next) {
        res.send('article3')
    })

    return router
}

function router_blog() {
    let router = express.Router()
    router.get('/1.html', function(req, res, next) {
        res.send('blog1')
    })
    router.get('/2.html', function(req, res, next) {
        res.send('blog2')
    })

    return router
}

module.exports = {
    router_article,
    router_blog
}