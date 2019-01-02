import createApp from './create-app'
import bus from './util/bus'

const { app, router, store } = createApp()

console.log('window.__INITIAL_STATE__:', window.__INITIAL_STATE__)
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

bus.$on('needLogin', () => {
  router.push('/login')
})

router.onReady(_ => {
  app.$mount('#root')
})
