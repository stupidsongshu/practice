const jade = require('jade')

let str = jade.renderFile('./views/1.jade', {pretty: true})

console.log(str)
