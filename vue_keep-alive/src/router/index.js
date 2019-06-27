import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import index from '@/components/index'
import list from '@/components/list'
import detail from '@/components/detail'

import keepAlive from '@/components/keep-alive/index'
import keepAliveList from '@/components/keep-alive/list'
import keepAliveDetail from '@/components/keep-alive/detail'

Vue.use(Router)

/**
 * B页面跳转到A，A页面需要缓存
 * C页面跳转到A，A页面不需要被缓存
 */
const routes = [
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
      keepAlive: true
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
  {
    path: '/keep-alive',
    name: 'KeepAlive',
    component: keepAlive
  },
  {
    path: '/keep-alive-list',
    name: 'KeepAliveList',
    component: keepAliveList,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/keep-alive-detail',
    name: 'KeepAliveDetail',
    component: keepAliveDetail
  }
]

let router = new Router({
  routes
})

router.afterEach((to, from) => {
  if (from.name === 'index' && to.name === 'list') {
    console.log('index -> list : need refresh')
    store.commit('LIST_NEED_REFRESH', true)
  }
  else if (from.name === 'list') {
    console.log('detail -> list : not refresh')
    store.commit('LIST_NEED_REFRESH', false)
  }
})

export default router
