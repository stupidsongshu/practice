const http = require('http')
const urlLib = require('url')
const querystring = require('querystring')

let server = http.createServer(function(req, res) {
    res.writeHead(200,
        {
            'Content-Type': 'text/html;charset=utf-8',
            'Content-Length': 5
        }
    )

    let url1 = urlLib.parse(req.url)
    let url2 = urlLib.parse(req.url, true)
    console.log(url1.query)
    console.log(url2.query)

    console.log(querystring.parse(url1.query))

    res.end('hello nodejs' + '<br>' + (1 + 2) + 's')
})

server.listen(3000, '127.0.0.1')
