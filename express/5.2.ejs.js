const ejs = require('ejs')

ejs.renderFile('./views/1.ejs', {time: new Date()}, function(err, str) {
    if (err) {
        console.log('编译失败')
    } else {
        console.log(str)
    }
})
