const express = require('express')
const consolidate = require('consolidate')

let app = express()

app.listen(8080)

// 输出什么东西
app.set('view engine', 'html')
// 模板文件的位置
app.set('views', './views')
// 选择模板引擎
app.set('html', consolidate.ejs)

app.use('/index', function(req, res, next) {
    res.render('1.ejs', {time: new Date()})
})
