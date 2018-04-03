const http = require('http')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const util = require('util')

let server = http.createServer(function(req, res) {
    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
        var form = new formidable.IncomingForm()
        form.encoding = 'utf-8';
        form.uploadDir = './dir'

        form.parse(req, function(err, fields, files) {
            if (err) {
                res.end('上传失败')
            } else {
                console.log(fields)
                console.log(files)

                let file = files.pic
                let oldname = file.path
                let extname = path.extname(file.name)
                let newname = oldname + extname
                fs.rename(oldname, newname, function(err) {
                    if (err) {
                        console.log('文件上传后重命名失败')
                    } else {
                        console.log('文件上传后重命名成功')
                        res.writeHead(200, {'content-type': 'text/plain'});
                        res.write('received upload:\n\n');
                        res.end(util.inspect({fields: fields, files: files}));
                    }
                })
            }
        })
    }
})

server.listen(3000)
