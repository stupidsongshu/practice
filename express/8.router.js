const express = require('express')

let app = express()

app.listen(8080)

let routerUser = express.Router()
routerUser.get('/my', function(req, res, next) {
    res.send('user-my')
})
routerUser.use('/setting', function(req, res, next) {
    res.send('user-setting')
})
app.use('/user', routerUser)

let routerNews = express.Router()
routerNews.get('/list', function(req, res, next) {
    res.send('news-list')
})
routerNews.get('/item', function(req, res, next) {
    res.send('news-item')
})
app.use('/news', routerNews)
