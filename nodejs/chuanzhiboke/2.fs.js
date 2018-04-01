const http = require('http')
const fs = require('fs')

let server = http.createServer(function(req, res) {
    // 创建文件夹
    fs.mkdir('./dir', function(err) {
        if (err) {
            console.log('创建目录dir失败')
            console.log(err)
        } else {
            console.log('创建目录dir成功')
            fs.mkdir('./dir/a', function(err) {
                if (err) {
                    console.log('目录dir里面创建目录a失败')
                } else {
                    console.log('目录dir里面创建目录a成功')
                }
            })
        }
    })

    res.end('hello nodejs')
})

server.listen(3000, '127.0.0.1')
