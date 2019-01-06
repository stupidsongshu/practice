// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

// 如果您使用的是 Babel，你将需要添加 syntax-dynamic-import 插件，才能使 Babel 可以正确地解析语法。
const Todo = () => import(/* webpackChunkName: "todo-view" */ '../views/todo/todo.vue')
const Login = () => import(/* webpackChunkName: "login-view" */ '../views/login/login.vue')

const routes = [
  {
    path: '/',
    redirect: '/todo'
  },
  {
    path: '/app/:id',

    // props: true,
    // props: {id: '456'},
    props: (route) => ({id: route.params.id}),

    // 异步组件引入在提示语法错误时需要安装 babel-plugin-syntax-dynamic-import 插件,然后在.babelrc的plugins加入syntax-dynamic-import
    component: Todo
  },
  {
    path: '/todo',
    component: Todo
  },
  {
    path: '/login',
    component: Login
  }
]

export default routes
