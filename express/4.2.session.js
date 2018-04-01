const express = require('express')
const cookieSession = require('cookie-session')

const app = express()

app.listen(8080)

app.use(cookieSession({
    name: 'cookie_session',
    keys: ['ajhjghj', 'kkkjjHJJGJGJbJHH', 'jjJHjhJhjh'],
    maxAge: 30*60*1000 // 有效期30分钟
}))

app.use('/setSession', (req, res) => {
    console.log('this is setSession page')
    // 记录访问次数
    if (req.session.invitedCount === undefined) {
        req.session.invitedCount = 1
    } else {
        req.session.invitedCount++
    }
    console.log(req.session.invitedCount)
    // session使用delete进行删除，因为session存放在服务器；cookie存放在浏览器，使用res.clearCookie()方法进行删除
    // delete req.session.invitedCount
    console.log(req.session.invitedCount)
    res.send('session is over')
})
