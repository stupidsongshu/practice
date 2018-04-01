const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const urlLib = require('url')

let users = {} // {'hello': 123456, 'world': 654321}

let server = http.createServer((req, res) => {
    let obj = urlLib.parse(req.url, true)
    const pathname = obj.pathname
    console.log(pathname)

    let str = ''
    req.on('data', data => {
        str += data        
    })
    
    req.on('end', () => {
        // GET
        const GET = obj.query

        // POST
        const POST = querystring.parse(str)

        // 区分 接口请求 和 文件请求
        if (pathname === '/user') { // 接口
            switch(GET.act) {
                // 注册
                case 'register':
                    if (users[GET.userName]) {
                        res.write('{"ok": false, "msg": "此用户已存在"}')
                        // res.write('{"ok": false, "msg": "the user is already exist"}')
                    } else {
                        users[GET.userName] = GET.userPsw
                        res.write('{"ok": true, "msg": "注册成功"}')
                        // res.write('{"ok": true, "msg": "register success"}')
                    }
                    break
                // 登录
                case 'login':
                    if (!users[GET.userName]) {
                        res.write('{"ok": false, "msg": "此用户不存在"}')
                        // res.write('{"ok": false, "msg": "the user is not exist"}')
                    } else if (users[GET.userName] !== GET.userPsw) {
                        res.write('{"ok": false, "msg": "用户名或密码错误"}')
                        // res.write('{"ok": false, "msg": "userName or userPsw is worry"}')
                    } else {
                        res.write('{"ok": true, "msg": "登录成功"}')
                        // res.write('{"ok": true, "msg": "login success"}')
                    }
                    break
                default:
                    res.write('{"ok": false, "msg": "未知的接口"}')
                    break
            }
            res.end()
        } else {                   // 文件
            let file_name = './www' + pathname
            fs.readFile(file_name, (err, data) => {
                if (err) {
                    res.write('404')
                } else {
                    res.write(data)
                }
                res.end()
            })
        }
    })
})

server.listen(8080)
