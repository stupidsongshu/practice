import Vue from 'vue'

let div = document.createElement('div')
let div1 = document.createElement('div')
document.body.appendChild(div)
document.body.appendChild(div1)

let baseComponent = {
  props: {
    active: Boolean,
    number: {
      required: true
    },
  },
  template: `
    <div>
      <p>{{content}}</p>
      <input type="text" v-model="text" />
      <button @click="handleChange">{{number}}</button>
      <span v-show="active">see me if active</span>
    </div>
  `,
  // data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数
  data() {
    return {
      content: 'Hello Vue',
      text: 'This is baseComponent'
    }
  },
  mounted() {
    console.log('baseComponent mounted')
  },
  methods: {
    handleChange() {
      this.number++
    }
  }
}

// extend 的第一种形式
const component1 = Vue.extend(baseComponent)
new component1({
  el: div,
  // props 需用 propsData 进行合并替换
  propsData: {
    active: true,
    number: 1
  },
  data: {
    // 替换 base component 中的 text
    text: 'This is component1'
  },
  mounted() {
    console.log('component1 mounted')
  }
})


// extend 的第二种形式 
let component2 = {
  extends: baseComponent, // component2 继承 baseComponent
  data() {
    return {
      text: 'This is component2'
    }
  },
  mounted() {
    console.log('component2 mounted') 
  }
}
new Vue({
  el: div1,
  // propsData: {
  //   number: 2
  // },
  components: {
    comp: component2
  },
  template: `<comp :number="2"></comp>`
})
