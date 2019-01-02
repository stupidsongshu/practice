import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    if (context.user) {
      store.state.user = context.user
    }

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents) {
        return reject(new Error('no component matched'))
      }

      Promise.all(matchedComponents.map(component => {
        if (component.asyncData) {
          console.log('has asyncData------')
          return component.asyncData({
            route: router.currentRoute,
            store,
            router
          })
        }
      })).then(_ => {
        console.log('store state---: ', store.state)

        context.meta = app.$meta()

        context.state = store.state

        context.router = router

        resolve(app)
      })
    })
  })
}
