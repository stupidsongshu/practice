import Vue from 'vue'

let div1 = document.createElement('div')
let div2 = document.createElement('div')
document.body.appendChild(div1)
document.body.appendChild(div2)

const component1 = {
  props: ['value'],
  template: `
    <div>
      <input type="text" :value="value" @input="handleInput">
    </div>
  `,
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}

/**
 * 第1、2、3种写法都在一个共同前提下：
 * 1.子组件props绑定的value名称必须为'value';2.子组件emit的事件名称必须为'input'
 * 当需要改变上面两个默认条件名称时,需要在子组件声明model(见第4种写法)
 * 第1种和第2种基本一致，第3种是更简化的写法；第4种是定制化写法
 */

// 第1种写法
// new Vue({
//   el: div1,
//   components: {
//     comp: component1
//   },
//   data () {
//     return {
//       parentValue: 'hello vue'
//     }
//   },
//   template:'<comp :value="parentValue" @input="parentValue = arguments[0]"></comp>'
// })

// 第2种写法
// new Vue({
//   el: div1,
//   components: {
//     comp: component1
//   },
//   data () {
//     return {
//       parentValue: 'hello vue'
//     }
//   },
//   template:'<comp :value="parentValue" @input="listenEvent"></comp>',
//   methods: {
//     listenEvent(value) {
//       this.parentValue = value
//     }
//   }
// })

// 第3种写法
new Vue({
  el: div1,
  components: {
    comp: component1
  },
  data () {
    return {
      parentValue: 'hello vue'
    }
  },
  template:'<comp v-model="parentValue"></comp>'
})

// 第4种写法
const component2 = {
  model: {
    prop: 'customValueName',
    event: 'customEventName'
  },
  props: ['customValueName'],
  template: `
    <div>
      <input type="text" :value="customValueName" @input="handleInput"> 自定义
    </div>
  `,
  methods: {
    handleInput(e) {
      this.$emit('customEventName', e.target.value)
    }
  }
}
new Vue({
  el: div2,
  components: {
    comp: component2
  },
  data () {
    return {
      parentValue: 'hello world'
    }
  },
  template:'<comp v-model="parentValue"></comp>'
})
