import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import createRouter from './router/router.js'
import createStore from './store/index'

import 'normalize.css'
import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
