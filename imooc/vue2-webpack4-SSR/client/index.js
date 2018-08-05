import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import createRouter from './router/router.js'

import 'normalize.css'

import './assets/styles/global.styl'

const router = createRouter()

Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#root')
