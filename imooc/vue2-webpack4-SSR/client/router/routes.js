// import todo from '../views/todo/todo.vue'
// import login from '../views/login/login.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/app/:id',

    // props: true,
    // props: {id: '456'},
    props: (route) => ({id: route.params.id}),

    // 异步组件引入在提示语法错误时需要安装 babel-plugin-syntax-dynamic-import 插件,然后在.babelrc的plugins加入syntax-dynamic-import
    component: () => import('../views/todo/todo.vue')
  },
  {
    path: '/todo',
    component: () => import('../views/todo/todo.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]

export default routes
