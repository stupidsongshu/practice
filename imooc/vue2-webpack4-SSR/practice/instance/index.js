import Vue from 'vue'

var div = document.createElement('div')
document.body.appendChild(div)

const app = new Vue({
  el: div,
  template: '<div ref="root">hello {{text}} {{count}}, {{obj.key}}</div>',
  data: {
    text: 'webpack3/4',
    count: 0,
    obj: {}
  }
})

console.log('app.$options: ', app.$options)
console.log('app.$el: ', app.$el)
console.log('app.$data: ', app.$data)
setInterval(_ => {
  // app.count += 1
  app.$data.count += 1

  // app.$options.data.count += 1 // 重新定义app.$options下面的属性不会在视图里面改变(除了render方法)
}, 1000)

// app.$options.render 新定义的方法会在下一次数据更新时起作用
// app.$options.render = h => {
//   return h('div', {}, 'this is new render function')
// }

console.log('app.$props: ', app.$props)
console.log('app.$root: ', app.$root)
console.log('app.$root === app: ', app.$root === app)
console.log('app.$children: ', app.$children)
console.log('app.$refs: ', app.$refs)
console.log('app.$slots: ', app.$slots)
console.log('app.$scopedSlots: ', app.$scopedSlots)
console.log('app.$isServer: ', app.$isServer)

// vue 实例的方法
app.$on('emitEvent', data => {
  console.log('emit $on: ', data)
})
app.$once('emitEvent', data => {
  console.log('emit $once: ', data)
})
let i = 0
let timer = null
timer = setInterval(_ => {
  if (i < 3) {
    i++
    app.$emit('emitEvent', {number: i})
  } else {
    clearInterval(timer)
  }
}, 1000)

const unWatch = app.$watch('count', (newValue, oldValue) => {
  console.log('oldValue:', oldValue, ',newValue:', newValue)
})
setTimeout(_ => {
  unWatch() // 手动销毁 watch 实例防止内存泄漏
}, 3000)

// app.$forceUpdate() // 强制更新组件

setTimeout(_ => {
  // $set 添加响应式数据，$delete 删除响应式数据
  app.$set(app.$data.obj, 'key', 'app.$set key')
}, 2000)
