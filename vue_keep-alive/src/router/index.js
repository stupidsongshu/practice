import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import list from '@/components/list'
import detail from '@/components/detail'

Vue.use(Router)

/**
 * B页面跳转到A，A页面需要缓存
 * C页面跳转到A，A页面不需要被缓存
 */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/list',
      name: 'list',
      component: list,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail,
      meta: {
        keepAlive: false
      }
    },
  ]
})
