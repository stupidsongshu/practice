const express = require('express')
const expressStatic = require('express-static')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const consolidate = require('consolidate')
const mysql = require('mysql')
const timeParser = require('./lib/time')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
})

let app = express()

app.listen(8080)

// cookie
let cookieSecret = 'hIkbt86Noe0Vxc'
app.use(cookieParser(cookieSecret))

// session
let sessionKeys = []
for (var i = 0; i < 100000; i++) {
    sessionKeys.push('keys_' + Math.random())
}
app.use(cookieSession({
    name: 'session',
    keys: sessionKeys
}))

// 模板引擎
app.set('view engine', 'html')
app.set('views', './templates')
app.set('html', consolidate.ejs)

// 接口请求
app.use('/index', function(req, res, next) {
    db.query('SELECT * FROM `t_banner`', function(err, data) {
        if (err) {
            console.log()
            res.status(500).send('database error').end()
        } else {
            res.banners = data
            next()
        }
    })
})
app.use('/index', function(req, res, next) {
    db.query('SELECT ID, author, title, summary FROM `t_article`', function(err, data) {
        if (err) {
            res.status(500).send('database error').end()
        } else {
            res.articles = data
            next()
        }
    })
})
app.use('/index', function(req, res, next) {
    res.render('index.ejs', {
        banners: res.banners,
        articles: res.articles
    })
})

app.get('/article', function(req, res, next) {
    let url = req.query
    console.log(url.id)
    if (url.id == undefined || url.id == '') {
        res.status(404).send('404 页面未找到').end()
    } else {
        let query = `SELECT * FROM t_article WHERE ID=${url.id}`
        db.query(query, function(err, data) {
            if (err) {
                res.status(500).send(err).end()
            } else {
                if (data.length === 0) {
                    res.status(404).send('404 页面未找到').end()
                } else {
                    let article_data = data[0]
                    article_data.postTime = timeParser.time(article_data.post_time)
                    article_data.escapeContent = timeParser.escape(article_data.content)
                    res.render('article.ejs', {article: article_data})
                }
            }
        })
    }
})

app.use(expressStatic('./www'))
