const express = require('express')
const bodyParser2 = require('./lib/body-parser2')

const app = express()

app.listen(8080)

// app.use(function(req, res, next) {
//     let str = ''
//     req.on('data', function(data) {
//         str += data
//     })
//     req.on('end', function() {
//         req.body = querystring.parse(str)
//         next()
//     })
// })

app.use(bodyParser2.url())

app.use('/login', function(req, res) {
    console.log(req.body)
})
