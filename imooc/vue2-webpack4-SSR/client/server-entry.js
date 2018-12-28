import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents) {
        return reject(new Error('no component matched'))
      }

      Promise.all(matchedComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData({
            route: router.currentRoute,
            store
          })
        }
      })).then(data => {
        console.log('asyncData: ', data)
        console.log('store state---: ', store.state)
      })

      context.meta = app.$meta()
      resolve(app)
    })
  })
}
