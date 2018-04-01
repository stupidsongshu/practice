function People(name, age) {
    this.name = name
    this.age = age
}

People.prototype = {
    say() {
        console.log('hello ' + this.name + ', your age is ' + this.age)
    }
}

// exports.people = People
module.exports = People
