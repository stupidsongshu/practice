const express = require('express')
const expressStatic = require('express-static')
const bodyParser = require('body-parser')

var users = {
    'zys': '123456',
    'zwq': '654321'
}
let app = express()

var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
})

app.get('/login', function(req, res) {
    const query = req.query
    if (users[query.userName] === undefined) {
        res.send({
            ok: false,
            msg: '此用户不存在'
        })
    } else if (users[query.userName] !== query.userPsw) {
        res.send({
            ok: false,
            msg: '用户名或密码不存在'
        })
    } else {
        res.send({
            ok: true,
            msg: '登录成功'
        })
    }
})

app.use(bodyParser.urlencoded({
    extended: true, // true: 扩展模式 false: 普通模式
    limit: 2*1024 // 限制post数据大小 (2*1024 = 2k)
})) // 使用bodyParser中间件后,post请求的参数可以通过req.body获取
app.post('/login', function(req, res) {
    console.log(req.body)
})

app.use('/', function(req, res, next) {
    console.log('a')
    next() // 如果不调用next(), 下面的b不会打印
})
app.use('/', function(req, res, next) {
    console.log('b')
})

// app.use('/a.html', (req, res) => {
//     res.send('a.html')
// })
// app.use('/b.html', function(req, res) {
//     res.send('b.html')
// })
app.use(expressStatic('./www')) // 使用express-static并传入路径'./www'后可以动态返回前端请求的资源文件
