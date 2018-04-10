const express = require('express')
const swig = require('swig')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Cookies = require('cookies')
const User = require('./models/User')

const app = express()

// 设置静态文件托管
// 当用户访问的url以/public开始，那么直接返回__dirname+'/public'下的文件
app.use('/public', express.static(__dirname + '/public'))

// 配置应用模板
// 定义当前模板使用的模板引擎
app.engine('html', swig.renderFile)
// 设置模板文件存放目录
app.set('views', './views')
// 注册所使用的模板引擎
app.set('view engine', 'html')
// 开发模式取消模板缓存
swig.setDefaults({
    cache: false
})

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use((req, res, next) => {
    req.cookies = new Cookies(req, res)

    req.userInfo = {}
    let userInfo = req.cookies.get('userInfo')
    if (userInfo) {
        try {
            req.userInfo = JSON.parse(userInfo)
            // 判断当前登录用户是否为管理员
            User.findById(req.userInfo.id).then(userInfo => {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin)
            })
            next()
        } catch (error) {
            console.log(error)
            next()
        }
    } else {
        next()
    }
})

app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))

// mongod --dbpath=E:\practice\nodejs\miaov\db --port=27017
mongoose.connect('mongodb://localhost:27017/miaov_blog', err => {
    if (err) {
        console.log('link mongodb fail', err)
    } else {
        console.log('link mongodb success')
        app.listen(3000)
    }
})
