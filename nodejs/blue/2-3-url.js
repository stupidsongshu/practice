const http = require('http')
const urlLib = require('url')

let num = 0
let server = http.createServer(function(req, res) {
    num ++
    console.log('有人来了' + num)

    // 处理客户端请求
    console.log(req.url)
    let obj1 = urlLib.parse(req.url)
    let obj2 = urlLib.parse(req.url, true)
    console.log(obj1)
    console.log(obj2)
    console.log(obj2.pathname, obj2.query)
})

server.listen(8080)
