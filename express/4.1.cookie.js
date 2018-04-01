const express = require('express')
// cookie-parser 用于对cookie进行签名
// cookie-encrypter 用于对cookie进行加密
const cookieParser = require('cookie-parser')

const app = express()

app.listen(8080)

const secret = 'hJkkji776bbnI'
app.use(cookieParser(secret))
app.use('/setCookies', function(req, res, next) {
    console.log('this is setCookies page')
    res.cookie('name', 'express', {
        path: '/',
        maxAge: 24*60*60*1000,
        signed: true // 是否签名
    })
    console.log('未签名的cookie', req.cookies)
    console.log('签过名的cookie', req.signedCookies)
    // next()
    res.send('this is setCookies page')
})

app.use('/', function(req, res, next) {
    console.log('this is root page')
    res.clearCookie('name');
    res.send('this is root page')
})
