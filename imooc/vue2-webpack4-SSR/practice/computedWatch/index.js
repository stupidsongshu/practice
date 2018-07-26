import Vue from 'vue'

var div = document.createElement('div')
document.body.appendChild(div)

new Vue({
  el: div,
  template: `
    <div>
      <p><button @click="changeCount">{{count}}</button></p>
      <p>firstName: <input type="text" v-model="firstName" /></p>
      <p>lastName: <input type="text" v-model="lastName" /></p>

      <p>firstName: {{firstName}}</p>
      <p>lastName: {{lastName}}</p>
      <p>fullName-methods: {{getFullName()}}</p>
      <p>fullName-computed: {{fullNameComputed}}</p>
      <p>fullName-watch1: {{fullName}}</p>
      <p>fullName-watch2: {{fullName2}}</p>

      <p>watch的deep属性: <input type="text" v-model="obj.a" /></p>
    </div>
  `,
  data: {
    firstName: 'zhou',
    lastName: 'yusong',
    fullName: '',
    fullName2: '',
    count: 0,
    obj: {
      a: 123
    }
  },
  computed: {
    fullNameComputed() {
      console.log('fullName computed')
      return this.firstName + ' ' + this.lastName
    }
  },
  watch: {
    firstName(newFirstName, oldFirstName) {
      console.log('firstName watch')
      this.fullName = newFirstName + ' ' + this.lastName
    },
    lastName: {
      handler(newValue, oldValue) {
        this.fullName2 = this.firstName + ' ' + newValue
      },
      // 在选项参数中指定 immediate: true 将立即以表达式的当前值触发回调
      immediate: true
    },
    // 修改obj属性a的值不会触发监听obj对象的方法(解决方法1：给obj对象重新赋值，这显然很蠢)
    obj() {
      console.log('1. obj.a changed')
    },
    // 修改obj属性a的值不会触发监听obj对象的方法(解决方法2：设置deep为true，但这样会影响性能)
    obj: {
      handler() {
        console.log('2. obj.a changde')
      },
      // deep属性默认为false
      // 由于监听的是obj对象，没有给obj对象重新赋值只是在改变obj对象某一个属性值的时候并不会触发handler函数。除非设置deep为true后，Vue会深层遍历从而触发handler函数，但这样会带来更大开销。
      deep: true
    },
    // 修改obj属性a的值不会触发监听obj对象的方法(解决方法3：最方便最不影响性能的是直接监听obj.a而不是监听obj)
    'obj.a'() {
      console.log('3. obj.a changde')
    }
  },
  methods: {
    changeCount() {
      this.count++
    },
    getFullName() {
      console.log('fullName methods')
      return this.firstName + ' ' + this.lastName
    }
  }
})