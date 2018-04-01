const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

let app = express()

app.listen(8080)

let upload = multer({
    dest: './www/upload'
})

app.use('/upload', upload.any(), function(req, res, next) {
    console.log(req.files)
    let file = req.files[0]

    let oldFile = file.path
    let ext = path.parse(file.originalname).ext

    let newFile = oldFile + ext
    fs.rename(oldFile, newFile, function(err) {
        if (err) {
            console.log('上传文件重命名失败')
            res.send('上传文件且重命名失败')
        } else {
            console.log('上传文件重命名成功')
            res.send('上传文件且重命名成功')
        }
    })
})
