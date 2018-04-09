const express = require('express')
const mysql = require('mysql')
const crypto = require('crypto')

let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'learner_blue'
})

module.exports = function() {
    let router = express.Router()

    router.get('/', (req, res, next) => {
        res.render('admin/login.ejs', {title: '管理员登录'})
    })
    router.post('/', (req, res, next) => {
        let userInfo = req.body
        console.log(userInfo)
        // let sql = 'SELECT * FROM t_admin WHERE username=' + '"' + userInfo.username + '"'
        let sql = `SELECT * FROM t_admin WHERE username='${userInfo.username}'`
        // console.log(sql)
        db.query(sql, (err, data) => {
            if (err) {
                console.error(err)
                res.status(500).send('database error').end()
            } else {
                if (data.length === 0) {
                    res.status(404).send('用户不存在').end()
                } else {
                    let str = ''
                    let MD5_SUFFIX = 'dK8*Jl01mpT@o-w0S=^m'
                    let obj = crypto.createHash('md5')
                    obj.update(userInfo.password + MD5_SUFFIX)
                    str = obj.digest('hex')

                    if (str === data[0].password) {
                        console.log('登录成功')
                        req.session['admin_id'] = data[0].ID
                        res.redirect('/admin/')
                    } else {
                        res.status(400).send('用户名或密码错误').end()
                    }
                }
            }
        })
    })

    return router
}
