const express = require('express')
const mysql = require('mysql')

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
                db.query(`SELECT * FROM t_banner WHERE ID=${req.query.id}`, (err, modify_data) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('database error').end()
                    } else {
                        db.query(`SELECT * FROM t_banner`, (err, data) => {
                            if (err) {
                                res.status(500).send('database error').end()
                            } else {
                                res.render('admin/banner.ejs', {
                                    modify_data: modify_data[0],
                                    banners: data
                                })
                            }
                        })
                    }
                })
                break;
            case 'delete':
                db.query(`DELETE FROM t_banner WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('delect banner database error').end()
                    } else {
                        res.redirect('/admin/banner')
                    }
                })
                break;
            default:
                db.query(`SELECT * FROM t_banner`, (err, data) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('select banner database error').end()
                    } else {
                        res.render('admin/banner.ejs', {
                            banners: data
                        })
                    }
                })
                break;
        }
    })
    router.post('/', (req, res, next) => {
        console.log(req.body)
        if (!req.body.title || !req.body.description || !req.body.href) {
            res.send('arguments error').end()
        } else {
            if (typeof req.body.modify_id !== 'undefined') { // 修改
                let sql = `UPDATE t_banner SET
                            title='${req.body.title}',
                            description='${req.body.description}',
                            href='${req.body.href}'
                            WHERE ID=${req.body.modify_id}`
                db.query(sql, (err, data) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('update banner database error').end()
                    } else {
                        res.redirect('/admin/banner')
                    }
                })
            } else {                                         // 新增
                let sql = `INSERT INTO t_banner (title, description, href) VALUES ('${req.body.title}', '${req.body.description}', '${req.body.href}')`
                db.query(sql, (err, data) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('insert banner database error').end()
                    } else {
                        res.redirect('/admin/banner')
                    }
                })
            }
        }
    })

    return router
}
