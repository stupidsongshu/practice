function format(val) {
    val = parseFloat(val)
    return val < 10 ? '0' + val : '' + val
}

module.exports = {
    time(timestamp) {
        let datetime = new Date(timestamp * 1000)
        let year = datetime.getFullYear()
        let month = format(datetime.getMonth() + 1)
        let date = format(datetime.getDate())
        let hour = format(datetime.getHours())
        let minute = format(datetime.getMinutes())
        let second = format(datetime.getSeconds())

        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    },
    escape(str) {
        return str.replace(/^/gm, '<p>').replace(/$/gm, '</p>')
    }
}
