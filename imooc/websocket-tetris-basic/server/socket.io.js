var app = require('http').createServer()
var io  = require('socket.io')(app)

var count = 0

app.listen(8080)

io.on('connection', function(socket) {
    count++
    socket.nickname = 'user' + count

    io.emit('enter', socket.nickname + ' comes in')

    socket.on('message', function(str) {
        io.emit('message', socket.nickname + ' says: ' + str)
    })

    socket.on('disconnect', function() {
        io.emit('leave', socket.nickname + ' left')
    })
})
