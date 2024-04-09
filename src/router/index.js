import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage.vue'),
    redirect:"/userManage", //直接跳转用户管理界面
    children:[
      {
        path: 'userManage',
        name: 'UserManage',
        component: () => import('../views/UserManage.vue'),
      },
      {
        path: 'Manage',
        name: 'UserManage',
        component: () => import('../views/UserManage.vue'),
      }

    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
