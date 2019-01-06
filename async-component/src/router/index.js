import Vue from 'vue'
import Router from 'vue-router'
import one from '@/components/1'

const father = (resolve) => import('@/components/father').then((module) => resolve(module))

Vue.use(Router)

const constantRoutes = [
  {
    path: '/',
    name: 'One',
    component: one,
    children: [
      {
        path: 'two',
        name: 'Two',
        // component: import('@/components/1')
        component: () => import('@/components/1')
      }
    ]
  },
  {
    path: '/grandfather',
    component: (resolve) => require(['@/components/grandfather'], resolve),
    children: [
      {
        path: 'father',
        component: father
      }
    ]
  }
]

const asyncRoutes = [
  {
    path: '/async',
    component: () => import('@/components/async/index')
  }
]

export default new Router({
  routes: constantRoutes
})
