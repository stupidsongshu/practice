import createApp from './create-app'
import bus from './util/bus'

const { app, router } = createApp()

bus.$on('needLogin', () => {
  router.push('/login')
})

router.onReady(_ => {
  app.$mount('#root')
})
