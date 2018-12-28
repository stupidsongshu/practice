<template>
  <div class="todo">
    {{inputContent}}
    <div class="tabs-container">
      <tabs :value="tabValue" @change="handleChangeTab">
        <tab label="tab1" index="1">
          <span>Tab content 1 {{inputContent}}</span>
        </tab>
        <tab index="2">
          <span slot="label" style="color: pink;">Tab 2</span>
          <span>Tab content 2</span>
        </tab>
        <tab label="tab3" index="3">
          <span slot="label">Tab 3</span>
          <span>Tab content 3</span>
        </tab>
      </tabs>
    </div>
    <helper-tabs :filter="filter" :todos="todos" @toggle="toggleEvent" @clearAllCompleted="clearAllCompletedEvent" />
    <input type="text"
      class="add-input"
      autofocus
      placeholder="请输入"
      @keyup.enter="handleAddTodo"
      v-model="inputContent"
    >

    <item
      :todo="todo"
      v-for="todo in todoFilter"
      :key="todo.id"
      @del="delEvevnt"
      @toggle="toggleTodoState(todo)"
    />
  </div>
</template>

<script>
import item from './item.vue'
import helperTabs from './tabs.vue'

import { mapState, mapActions } from 'vuex'

let id = 0

export default {
  metaInfo: {
    title: 'TODO page'
  },
  props: ['id'],
  data() {
    return {
      // todos: [],
      filter: 'all',
      tabValue: '1',
      inputContent: ''
    }
  },
  components: {
    item,
    helperTabs
  },
  computed: {
    ...mapState(['todos']),
    todoFilter() {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === completed)
    }
  },
  created() {
    // console.log('路由props选项传过来的 id：', this.id)
    this.fetchTodos()
  },
  asyncData ({ store }) {
    return new Promise((resolve) => {
      store.dispatch('fetchTodos')
      resolve()
    })
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'deleteAllCompleted',
      'updateTodo'
    ]),
    // handleAddTodo(e) {
    //   var todoContent = e.target.value.trim()

    //   if (todoContent !== '') {
    //     this.todos.unshift({
    //       id: id++,
    //       completed: false,
    //       content: e.target.value.trim()
    //     })
  
    //     e.target.value = ''
    //   }
    // },
    handleAddTodo (e) {
      let content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '请输入todo内容'
        })
        return
      }
      const todo = {
        completed: false,
        content
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    // delEvevnt(data) {
    //   // 方法一 (循环里面尽量不要splice 因为index会变)
    //   // for (var i = 0, len = this.todos.length; i < len; i++) {
    //   //   if (this.todos[i].id === data) {
    //   //     this.todos.splice(i, 1)
    //   //     break // 一定要 break 跳出循环，否则会有bug
    //   //   }
    //   // }

    //   // 方法二
    //   this.todos.splice(this.todos.findIndex(todo => todo.id === data), 1)
    // },
    delEvevnt (id) {
      this.deleteTodo(id)
    },
    toggleEvent(state) {
      this.filter = state
    },
    // clearAllCompletedEvent() {
    //   this.todos = this.todos.filter(todo => !todo.completed)
    // },
    clearAllCompletedEvent () {
      this.deleteAllCompleted({
        ids: this.todos.filter(t => t.completed).map(t => t.id)
      })
    },
    handleChangeTab (index) {
      this.tabValue = index
    },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.todo
  width 600px
  margin 0 auto
  box-shadow 0 0 5px 0 #666
.add-input
  position relative
  width 100%
  font-size 24px
  font-weight inherit
  font-family inherit
  line-height 1.4em
  border 0
  outline none
  color inherit
  padding 6px
  border 1px solid #999
  box-shadow inset 0 -1px 5px 0 rgba(0, 0, 0, .1)
  box-sizing border-box
  font-smoothing antialiased
  padding 16px 16px 16px 60px
  border none
  box-shadow inset 0 -2px 1px rgba(0, 0, 0, .1)

.tabs-container
  // padding: 0 15px
  background-color: #fff
</style>

