/* 
    原生 nodejs 实现静态资源
*/

const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

let server = http.createServer(function(req, res) {
    let pathname = url.parse(req.url).pathname
    // 如果输入的是文件夹默认访问里面的index.html文件
    if (req.url.indexOf('.') === -1) {
        pathname += '/index.html'
    }
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
            // fs.readFile('./mime.json', function(err, mimedata) {
            //     if (err) {
            //         throw err
            //         return
            //     } else {
            //         mimedata = JSON.parse(mimedata.toString())
            //         let mime = mimedata[extname]
            //         res.writeHead(200, {'Content-Type': mime})
            //         res.end(data)
            //     }
            // })

            getMime(extname, function (mime) {
                res.writeHead(200, {'Content-Type': mime})
                res.end(data)
            })
        }
    })
})

server.listen(3000)

function getMime(extname, cb) {
    fs.readFile('./mime.json', function(err, mimedata) {
        if (err) {
            throw err
            return
        } else {
            mimedata = JSON.parse(mimedata.toString())
            let mime = mimedata[extname] || 'text/plain'
            cb && cb(mime)
        }
    })
}
