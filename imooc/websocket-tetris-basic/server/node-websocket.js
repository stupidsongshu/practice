var ws = require("nodejs-websocket")

var count = 0

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    count++
    var data = {}
    data.nickname = 'user' + count
    data.type = 'enter'
    data.str = data.nickname + ' is coming'
    broadcast(JSON.stringify(data))

	conn.on("text", function (str) {
		console.log("Received "+str)
        // conn.sendText(str.toUpperCase()+"!!!")
        data.type = 'message'
        data.str = str
        broadcast(JSON.stringify(data))
	})
	conn.on("close", function (code, reason) {
        console.log("Connection closed")
        data.type = 'leave'
        data.str = 'user' + count + ' is left'
        broadcast(JSON.stringify(data))
    })
    conn.on("error", function(error) {
        console.log('error')
        console.log(error)
    })
}).listen(8001)

function broadcast(str) {
    server.connections.forEach(connection => {
        connection.sendText(str)
    })
}
