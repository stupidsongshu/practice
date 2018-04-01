const http = require('http')
const fs = require('fs')

let server = http.createServer(function(req, res) {
    if (req.url === '/favicon.ico') {
        return
    }

    fs.readdir('./dir', function(err, files) {
        if (err) {
            console.log(err)
        } else {
            console.log('读取dir目录里面的东西', files)

            let filesArr = [] // 存放文件夹的数组
            // 需求：只读取dir目录里面的文件夹
            // 方法一（有问题）
            // for (var i = 0; i < files.length; i ++) {
            //     var filename = files[i]
            //     // console.log(i, filename)
            //     fs.stat('./dir/' + filename, function(err, stats) {
            //         /*
            //         * 由于检测是异步操作,导致变量i在内部被访问的时候for循环已经执行完毕，变量i已经变成files.length；
            //         * 由于变量i的改变导致filename被不断覆盖的，与此同时异步检测还来不及到访问正确的filename，
            //         * 等到异步检测想要访问filename的时候for循环已经执行完毕，所以所有的异步操作里面读取的filename就永远是files数组里面的最后一个，
            //         * 最终导致push进去的不正确
            //         */
            //         // console.log(i, filename)
            //         if (err) {
            //             console.log(err)
            //         } else {
            //             if (stats.isDirectory()) {
            //                 filesArr.push(filename)
            //             }
            //             console.log(filesArr)
            //         }
            //     })
            // }

            // 方法二（有问题，且问题同上述方法一）
            // for (var i = 0; i < files.length; i ++) {
            //     fs.stat('./dir/' + files[i], function(err, stats) {
            //         if (err) {
            //             console.log(err)
            //         } else {
            //             if (stats.isDirectory()) {
            //                 filesArr.push(files[i-1])
            //             }
            //             console.log(filesArr)
            //         }
            //     })
            // }

            // 解决方法一 (使用匿名函数构成闭包)
            // for (var i = 0; i < files.length; i ++) {
            //     (function(i) {
            //         var filename = files[i]
            //         fs.stat('./dir/' + filename, function(err, stats) {
            //             if (err) {
            //                 console.log(err)
            //             } else {
            //                 if (stats.isDirectory()) {
            //                     filesArr.push(filename)
            //                 }
            //                 console.log(filesArr)
            //             }
            //         })
            //     })(i)
            // }

            // 解决方法二 (变量filename不用var改用let声明)
            // for (var i = 0; i < files.length; i ++) {
            //     let filename = files[i]
            //     fs.stat('./dir/' + filename, function(err, stats) {
            //         if (err) {
            //             console.log(err)
            //         } else {
            //             if (stats.isDirectory()) {
            //                 filesArr.push(filename)
            //             }
            //             console.log(filesArr)
            //         }
            //     })
            // }

            // 解决方法三 (不用for循环，改用forEacn循环避开变量i的问题)
            // files.forEach(item => {
            //     fs.stat('./dir/' + item, function(err, stats) {
            //         if (err) {
            //             console.log(err)
            //         } else {
            //             if (stats.isDirectory()) {
            //                 filesArr.push(item)
            //             }
            //             console.log(filesArr)
            //         }
            //     })
            // })

            // 解决方法四 (异步检测操作改写成同步检测操作)
            // 巨坑请注意 (IIFE函数前请用分号隔开)
            ;(function iterator(i) {
                if (i == files.length) {
                    console.log(filesArr);
                    return;
                }

                fs.stat('./dir/' + files[i], function(err, stats) {
                    if (err) {
                        console.log(err)
                    } else {
                        if (stats.isDirectory()) {
                            filesArr.push(files[i])
                        }
                        iterator(i + 1)
                    }
                })
            })(0)
        }
    })

    res.end('hello nodejs')
}).listen(3000)
