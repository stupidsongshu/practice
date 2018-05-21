import Vue from 'vue'
import App from './app.vue'

import './assets/styles/test.css'
import './assets/styles/test.styl'
import './assets/images/panda.jpg'
import './assets/images/webpack.svg'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: h => h(App)
}).$mount('#app')