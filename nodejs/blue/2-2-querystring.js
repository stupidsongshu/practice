const http = require('http')
const querystring = require('querystring')

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

        GET = querystring.parse(arr)
        
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
