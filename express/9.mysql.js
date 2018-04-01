const mysql = require('mysql')

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
})

db.query('INSERT INTO `t_user` (`id_user`, `name`, `password`) VALUES (0, "zhouyusong", "20180328214900")')

db.query('select * from t_user', function(err, data) {
    if (err) {
        console.log('查询失败')
    } else {
        console.log(data)
    }
})
