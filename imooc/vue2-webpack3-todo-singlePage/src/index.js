import Vue from 'vue'
import App from './app.vue'

import 'normalize.css'

import './assets/styles/global.styl'

// const root = document.createElement('div')
// document.body.appendChild(root)

new Vue({
  render: h => h(App)
}).$mount('#app')