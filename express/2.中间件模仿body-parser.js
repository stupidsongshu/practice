const express = require('express')
const bodyParser = require('body-parser')
const querystring = require('querystring')

let app = express()
app.listen(8080)

// app.use(bodyParser.urlencoded()) // 使用bodyParser中间件后,post请求的参数可以通过req.body获取
// app.post('/login', function(req, res) {
//     console.log(req.body)
// })

app.use(function(req, res, next) {
    let str = ''
    req.on('data', function(data) {
        str += data
    })
    req.on('end', function() {
        req.body = querystring.parse(str)
        next()
    })
})

app.use('/', function(req, res, next) {
    console.log(req.body)
    next()
})

app.use('/login', function(req, res) {
    console.log(req.body)
})
