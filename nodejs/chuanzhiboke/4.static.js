/* 
    原生 nodejs 实现静态资源
*/

const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

let server = http.createServer(function(req, res) {
    let pathname = url.parse(req.url).pathname
    // 扩展名
    let extname = path.extname(pathname)
    // console.log(pathname, extname)

    let staticDir = './static/'
    fs.readFile(staticDir + pathname, function(err, data) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html',
                'charset': 'utf8'
            })
            fs.readFile(staticDir + '404.html', function(err, data) {
                if (err) {
                    throw err
                } else {
                    res.end(data)
                    return
                }
            })
        } else {
            let mime = setMime(extname)
            res.setHeader('content-type', mime)
            res.writeHead(200)

            res.end(data)
        }
    })
})

server.listen(3000)

function setMime(extname) {
    switch(extname) {
        case '.html':
            return 'text/html'
            break
        case '.css':
            return 'text/css'
            break
        case '.js':
            return 'text/javascript'
            break
        case '.jpg':
            return 'image/jpg'
            break
        default:
            return ''
    }
}
