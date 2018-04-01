const http = require('http')
const querystring = require('querystring')

let num1 = 0
let num2 = 0
http.createServer(function(req, res) {
    // POST 分段传输数据(因为数据可能很大)

    let str = ''
    let POST
    req.on('data', function(data) {
        // num1++
        // console.log('data' + num1)
        // console.log(data.toString())
        str += data
    })

    req.on('end', function() {
        // num2++
        // console.log(num2)
        POST = querystring.parse(str)
        console.log(POST)
    })
}).listen(8080)