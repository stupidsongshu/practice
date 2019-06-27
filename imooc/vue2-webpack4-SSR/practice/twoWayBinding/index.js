import Vue from 'vue'

let div1 = document.createElement('div')
let div2 = document.createElement('div')
let div3 = document.createElement('div')
let div4 = document.createElement('div')
document.body.appendChild(div1)
document.body.appendChild(div2)
document.body.appendChild(div3)
document.body.appendChild(div4)

// https://cn.vuejs.org/v2/guide/components.html#在组件上使用-v-model
// https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model

const component1 = {
  props: ['value'],
  template: `
    <input v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
  `
  // template: `
  //   <input type="text" :value="value" @input="handleInput">
  // `,
  // methods: {
  //   handleInput(e) {
  //     this.$emit('input', e.target.value)
  //   }
  // }
}

/**
 * 第1、2、3种写法都在一个共同前提下：
 * 1.子组件props绑定的value名称必须为'value';2.子组件emit的事件名称必须为'input'
 * 当需要改变上面两个默认条件名称时,需要在子组件声明model(见第4种写法)
 * 第1种和第2种基本一致，第3种是更简化的写法；第4种是定制化写法
 */

// 第1种写法
new Vue({
  el: div1,
  components: {
    comp: component1
  },
  data () {
    return {
      parentValue: 'vue 第1种写法'
    }
  },
  template:`
    <div>
      <comp :value="parentValue" @input="parentValue = arguments[0]"></comp>
      {{parentValue}}
    </div>
  `
})

// 第2种写法
new Vue({
  el: div2,
  components: {
    comp: component1
  },
  data () {
    return {
      parentValue: 'vue 第2种写法'
    }
  },
  template:`
    <div>
      <comp :value="parentValue" @input="listenEvent"></comp>
      {{parentValue}}
    </div>
  `,
  methods: {
    listenEvent(value) {
      this.parentValue = value
    }
  }
})

// 第3种写法
new Vue({
  el: div3,
  components: {
    comp: component1
  },
  data () {
    return {
      parentValue: 'vue 第3种写法'
    }
  },
  // 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件
  template:`
    <div>
      <comp v-model="parentValue"></comp>
      {{parentValue}}
    </div>
  `
})

// 第4种写法
const component2 = {
  model: {
    prop: 'customValueName',
    event: 'customEventName'
  },
  // 注意你仍然需要在组件的 props 选项里声明 customValueName 这个 prop。
  props: ['customValueName'],
  template: `
    <input type="text" :value="customValueName" @input="handleInput">
  `,
  methods: {
    handleInput(e) {
      this.$emit('customEventName', e.target.value)
    }
  }
}
new Vue({
  el: div4,
  components: {
    comp: component2
  },
  data () {
    return {
      parentValue: 'vue 第4种写法'
    }
  },
  template:`
    <div>
      <comp v-model="parentValue"></comp> {{parentValue}}
    </div>
  `
})
