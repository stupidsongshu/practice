const express = require('express')
const static = require('express-static')
const expressRoute = require('express-route')
const routerWeb = require('./route/web/router')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const multer = require('multer')
const consolidate = require('consolidate')

let app = express()

app.listen(3000)

// 1.接口请求
app.use(bodyParser.urlencoded({
    extended: true
}))
const multerObj = multer({
    dest: './static/upload'
})
app.use(multerObj.any())

// 2.cookie
;(function () {
    let sess_keys = []
    for (var i = 0; i < 100000; i++) {
        sess_keys.push('keys_' + Math.random())
    }
    app.use(cookieSession({
        name: 'sess_id',
        keys: sess_keys,
        maxAge: 20 * 60 * 1000 // 20min
    }))
})()

// 3.模板
// app.set('view engine', 'html')
// app.set('views', './template')
// app.set('html', consolidate.ejs)

app.engine('html', consolidate.ejs) // assign the ejs engine to .html files
app.set('view engine', 'html') // set .html as the default extension
// app.set('views', './template')
app.set('views', __dirname + '/template')

// 4.route
// app.use('/index', (req, res, next) => {
//     res.writeHead(200, {
//         'content-type': 'text/html'
//     })
//     res.end('success')
// })

// app.use('/article', routerWeb.router_article())
// app.use('/blog', routerWeb.router_blog())


app.use('/', require('./route/web')())
app.use('/admin', require('./route/admin/index')())

// 5.default: static
app.use(static('./static'))
