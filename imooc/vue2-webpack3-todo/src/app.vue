<template>
  <div id="app">
    <div id="cover"></div>
    <div class="test">测试 extract-text-webpack-plugin</div>
    <v-header></v-header>
    <todo></todo>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from './todo/header.vue'
import footer from './todo/footer.jsx'
import todo from './todo/todo.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    'v-header': header,
    'v-footer': footer,
    todo
  }
}
</script>

<style lang="stylus" scoped>
#app
  position absolute
  left 0
  right 0
  top 0
  bottom 0
#cover
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background-color #555
  opacity 0.5
  z-index -1
</style>
