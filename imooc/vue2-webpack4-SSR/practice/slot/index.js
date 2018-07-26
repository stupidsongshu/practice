import Vue from 'vue'

let div1 = document.createElement('div')
let div2 = document.createElement('div')
document.body.appendChild(div1)
document.body.appendChild(div2)

const component1 = {
  data() {
    return {
      value2: '子组件作用域的值'
    }
  },
  template: `
    <div>
      <h1>Hello Vue</h1>
      <slot>默认插槽的默认内容</slot>

      <slot name="header"></slot>
      <slot name="main"></slot>
      <slot name="footer"></slot>

      <slot :value1="value2"></slot>
      </div>
  `
}

new Vue({
  el: div1,
  components: {
    comp: component1
  },
  data () {
    return {
      parentValue: '父组件作用域的值'
    }
  },
  template: `
    <div>
      <comp>
        <h2 slot="header">具名插槽 this is header</h2>
        <h2 slot="main">具名插槽 this is main</h2>
        <h2 slot="footer">具名插槽 this is footer</h2>
        <h2>这是默认插槽的内容</h2>

        <span>{{parentValue}}</span>
        <span slot-scope="slotScope">作用域插槽(父组件读取子组件值)：{{slotScope.value1}}</span>
      </comp>
    </div>
  `
})
