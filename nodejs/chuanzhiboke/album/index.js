const http = require('http')
const urlLib = require('url')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

var server = http.createServer((req, res) => {
    var url = req.url
    if (url === '/favicon.ico' || url === '/robots.txt') {
        return
    }

    // 静态资源
    var pathname = urlLib.parse(req.url).pathname
    if (pathname.indexOf('.') === -1) {
        // pathname += '/index.html'
    }
    var extname = path.extname(pathname)
    // 静态资源目录
    let staticDir = './static'
    let templatesDir = './templates'
    fs.readFile(staticDir + pathname, function(err, data) {
        if (err) {
            // read404(templatesDir, req, res)
            console.log('读取静态资源出错', err)
        } else {
            getMime(extname, function(mime) {
                res.writeHead(200, {
                    'Content-Type': mime
                })
                res.end(data)
            })
        }
    })

    // 响应接口
    if (url === '/admin') {
        var data = {}
        ejs.renderFile(templatesDir + '/admin.ejs', data, function(err, str) {
            if (err) {
                console.log(err)
            } else {
                res.end(str)
            }
        })
    }

    // 首页
    if (url === '/') {
        fs.readdir('./uploads', function(err, files) {
            if (err) {
                res.end('uploads目录读取失败')
            } else {
                var filesList = []

                ;(function iterator(i) {
                    if (i === files.length) {
                        renderFile(filesList)
                        showAlbum(filesList)
                        return
                    }
                    fs.stat('./uploads/' + files[i], function(err, stats) {
                        if (err) {
                            console.log('判断是否为目录出错', err)
                        } else {
                            if (stats.isDirectory()) {
                                filesList.push(files[i])
                            }
                            iterator(i+1)
                        }
                    })
                })(0)

                function renderFile(filesList) {
                    var data = {
                        files: filesList
                    }
                    ejs.renderFile(templatesDir + '/index.ejs', data, function(err, str) {
                        if (err) {
                            console.log('渲染模板index.ejs出错', err)
                            // read404(templatesDir, req, res)
                        } else {
                            res.end(str)
                        }
                    })
                }

                function showAlbum(filesList) {
                    filesList.forEach(item => {
                        if (url === item) {
                            console.log(item)
                            fs.readFile('./uploads/' + item, function (err, files) {
                                console.log(files)
                            })
                        }
                    })
                }

            }
        })
    }
})

var app = server.listen(3000)

function getMime(extname, cb) {
    fs.readFile('./mime.json', function(err, data) {
        if (err) {
            res.end('404 mime.json not found')
        } else {
            data = JSON.parse(data.toString())
            var mime = data[extname] || 'text/plain'
            cb && cb(mime)
        }
    })
}

function read404(templatesDir, req, res) {
    ejs.renderFile(templatesDir + '/404.ejs', function(err,data) {
        if (err) {
            res.end('404.ejs not found')
        } else {
            res.end(data)
        }
    })
}
