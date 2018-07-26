import Vue from 'vue'

let div = document.createElement('div')
document.body.appendChild(div)

let app = new Vue({
  el: div,
  template: '<p>hello, {{number}}</p>',
  data: {
    number: 0
  },
  beforeCreate() {
    console.log(this.$el, 'beforeCreate')
  },
  created() {
    console.log(this.$el, 'created')
  },
  beforeMount() {
    console.log(this.$el, 'beforeMount')
  },
  mounted() {
    console.log(this.$el, 'mounted')
  },
  beforeUpdate() {
    console.log(this.$el, 'beforeUpdate')
  },
  updated() {
    console.log(this.$el, 'updated')
  },
  activated() {
    console.log(this.$el, 'activated')
  },
  deactivated() {
    console.log(this.$el, 'deactivated')
  },
  beforeDestroy() {
    console.log(this.$el, 'beforeDestroy')
  },
  destroyed() {
    console.log(this.$el, 'destroyed')
  },

  render(h) {
    // throw new TypeError('render error')
    return h('span', {}, 'world')
  },
  // renderError方法只在开发环境有效,且只捕获本组件错误(子组件错误不捕获)
  renderError(h, err) {
    return h('div', {}, err.stack)
  },
  // errorCaptured方法在生产环境也有效,且会捕获所有子组件错误(冒泡机制),因此可以用来捕获线上错误日志
  errorCaptured(h, err) {
    return h('div', {}, err.stack)
  }
})

let num = 0
let timer
timer = setInterval(() => {
  num++
  if (num < 3) {
    app.number += 1
  } else {
    clearInterval(timer)
  }
}, 1000)

// 5s后手动调用$destory销毁组件
setTimeout(() => {
  app.$destroy()
}, 3000)
