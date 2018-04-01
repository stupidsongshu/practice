const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const urlLib = require('url')

let server = http.createServer(function(req, res) {
    let obj = urlLib.parse(req.url, true)
    let pathname = obj.pathname

    // GET
    const GET = obj.query

    // POST
    let str = ''
    req.on('data', function(data) {
        str += data
    })
    req.on('end', function() {
        const POST = querystring.parse(str)

        // 文件请求
        let file_name = './www' + pathname
        fs.readFile(file_name, function(err, data) {
            if (err) {
                res.write('404 没找到')
            } else {
                res.write(data)
            }
            res.end()
        })

        console.log(pathname, GET, POST)
    })
})

server.listen(8080)
