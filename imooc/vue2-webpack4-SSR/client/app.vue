<template>
  <div id="app">
    <div id="cover"></div>
    <v-header></v-header>
    <router-link to="/app/123">todo</router-link>
    <router-link to="/login" :event="['click', 'mouseleave']">login</router-link>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <v-footer></v-footer>
    <span style="color: yellow;">{{count}}</span>
  </div>
</template>

<script>
import header from './layout/header.vue'
import footer from './layout/footer.jsx'
import todo from './views/todo/todo.vue'

export default {
  metaInfo: {
    title: 'Test vue-meta'
  },
  components: {
    'v-header': header,
    'v-footer': footer,
    todo
  },
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  created() {
    setInterval(_ => {
      this.$store.commit('increment');
    }, 1000)
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
