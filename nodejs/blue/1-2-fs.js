const http = require('http')
const fs = require('fs')

let num = 0
let server = http.createServer(function(req, res) {
    num ++
    console.log('有人来了' + num)

    // 文件请求
    let file_name = './www' + req.url
    fs.readFile(file_name, (err, data) => {
        if (err) {
            res.write('404')
        } else {
            res.write(data)
        }
        res.end()
    })
})

server.listen(8080)
