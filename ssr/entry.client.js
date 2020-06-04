import {createApp} from './app'

const {app, router} = createApp()

router.onReady(_ => {
  app.$mount('#app')
})
