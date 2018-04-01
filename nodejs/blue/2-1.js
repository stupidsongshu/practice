const http = require('http')

let num = 0
let server = http.createServer(function(req, res) {
    num ++
    console.log('有人来了' + num)

    // 处理客户端请求
    let GET = {}
    let url
    if (req.url.indexOf('?') !== -1) {
        url = req.url.split('?')[0]
        // arr -> 'name=zys&psw=123456'
        let arr = req.url.split('?')[1]
        // arr1 -> ['name=zys', 'psw=123456']
        let arr1 = arr.split('&')
        for (let i = 0,len = arr1.length;i < len;i ++) {
            var arr2 = arr1[i].split('=')
            GET[arr2[0]] = arr2[1]
        }
        let data = {
            returnCode: '000000',
            retunrMsg: 'success',
            response: GET
        }
        res.write(JSON.stringify(data))
        res.end()
    } else {
        url = req.url
    }
    console.log(url, GET)
})

server.listen(8080)
