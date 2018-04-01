const fs = require('fs')

fs.readFile('read.txt', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data.toString())
    }
})

fs.writeFile('writeFile.txt', 'this is a file writed by nodejs', (err) => {
    fs.readFile('writeFile.txt', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data.toString())
        }
    })
})