const express = require('express')
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'learner_blue'
})

module.exports = function() {
    let router = express.Router()

    router.get('/', (req, res, next) => {
        switch(req.query.action) {
            case 'modify':
                // TODO
                break;
            case 'delete':
                db.query(`SELECT * FROM t_customer_evaluation`, (err, customers) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('select customer database error').end()
                    } else {
                        if (customers.length === 0) {
                            res.status(404).send('404 not found this customer').end()
                        } else {
                            // let filePath = 'static/upload/' + customers[0].avatar_src
                            let filePath = 'static/' + customers[0].avatar_src // 注意：数据库存储的avatar_src路径名格式为'/upload/*******.jpg'，所以这里路径不再需要加上'upload'
                            // console.log(filePath)
                            // 删除服务器文件
                            fs.unlink(filePath, err => {
                                if (err) {
                                    console.error(err)
                                    res.status(500).send('file system unlink error').end()
                                } else {
                                    // 删除数据库记录
                                    db.query(`DELETE FROM t_customer_evaluation WHERE ID=${req.query.id}`, (err, data) => {
                                        if (err) {
                                            console.error(err)
                                            res.status(500).send('delete customer database error').end()
                                        } else {
                                            res.redirect('/admin/customer')
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
                break;
            default:
                db.query(`SELECT * FROM t_customer_evaluation`, (err, customers) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('select customers databse error').end()
                    } else {
                        res.render('admin/customer.ejs', {customers})
                    }
                })
                break;
        }
    })

    router.post('/', (req, res, next) => {
        if (req.body.modify_id) { // 修改

        } else {                  // 新增
            console.log(req.files)
            let file = req.files[0]
            let oldname = file.path
            let extname = path.parse(file.originalname).ext
            let newname = oldname + extname
            let filepath = '/upload/' + file.filename + extname
            fs.rename(oldname, newname, (err) => {
                if (err) {
                    console.error(err)
                    res.status(500).send('rename file error').end()
                } else {
                    let sql = `INSERT INTO t_customer_evaluation (title, description, avatar_src) VALUES ('${req.body.title}', '${req.body.description}', '${filepath}')`
                    db.query(sql, (err, data) => {
                        if (err) {
                            console.error(err)
                            res.status(500).send('insert customer database error').end()
                        } else {
                            res.redirect('/admin/customer')
                        }
                    })
                }
            })
        }
    })

    return router
}
