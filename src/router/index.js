import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../views/Manage.vue'),
    // redirect:"/userManage", //直接跳转用户管理界面
    children:[
      {
        path: 'userManage',
        name: '用户管理',
        component: () => import('../views/UserManage.vue'),
      },
      {
        path: 'foodManage',
        name: '食品管理',
        component: () => import('../views/FoodManage.vue'),
      },
      {
        path: 'page',
        name: '主页',
        component: () => import('../views/page.vue'),
      },
      {
        path: 'supplierManage',
        name: '商户管理',
        component: () => import('../views/SupplierManage.vue'),
      },
      {
        path: 'orderformManage',
        name: '订单管理',
        component: () => import('../views/OrderformManage.vue'),
      },
      {
        path: 'transportManage',
        name: '订单管理',
        component: () => import('../views/TransportManage.vue'),
      },
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
