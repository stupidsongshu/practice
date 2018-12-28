<template>
  <div id="app">
    <div id="cover"></div>
    <v-header></v-header>
    <router-link to="/login" :event="['click', 'mouseleave']">login</router-link>
    <router-link to="/app/123">todo</router-link>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <v-footer></v-footer>
    <button @click="generateNotify">generateNotify</button>
    <!-- <span style="color: yellow;">{{count}}</span> -->
    <notification content="test notification" />
    <div class="loading" v-show="loading">
      <loading></loading>
    </div>
    <drag></drag>
  </div>
</template>

<script>
import header from './layout/header.vue'
import footer from './layout/footer.jsx'
import todo from './views/todo/todo.vue'
import Loading from './components/loading/loading.vue'
import { mapState } from 'vuex'
import drag from './views/drag.vue'
let count = 0
export default {
  metaInfo: {
    title: 'Test vue-meta'
  },
  components: {
    'v-header': header,
    'v-footer': footer,
    todo,
    Loading,
    drag
  },
  computed: {
    ...mapState(['loading'])
    // count() {
    //   return this.$store.state.count
    // }
  },
  // created() {
  //   setInterval(_ => {
  //     this.$store.commit('increment');
  //   }, 1000)
  // },
  methods: {
    generateNotify () {
      this.$notify({
        content: 'Hello Notify',
        btn: `close${count++}`
      })
    }
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
.loading
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  background-color: rgba(255, 255, 255, .3)
  z-index: 99
  display: flex
  justify-content: center
  align-items: center
</style>
