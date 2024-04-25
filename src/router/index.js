import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/admin/',
    name: '管理员',
    component: () => import('../views/Manage.vue'),
    // redirect:"/userManage", //直接跳转用户管理界面
    children:[
      {
        path: 'userManage',
        name: '用户管理',
        component: () => import('../views/admin/user/UserManage.vue'),
      },
      {
        path: 'foodManage',
        name: '食品管理',
        component: () => import('../views/admin/food/FoodManage.vue'),
      },
      {
        path: 'page',
        name: '主页',
        component: () => import('../views/page.vue'),
      },
      {
        path: 'supplierManage',
        name: '商户管理',
        component: () => import('../views/admin/user/SupplierManage.vue'),
      },
      {
        path: 'orderformManage',
        name: '订单管理',
        component: () => import('../views/admin/order/OrderformManage.vue'),
      },
      {
        path: 'transportManage',
        name: '运输管理',
        component: () => import('../views/admin/transport/TransportManage.vue'),
      },
    ]
  },
  {
    path: '/user/',
    name: '用户',
    component: () => import('../views/ManageUser.vue'),
    // redirect:"/userManage", //直接跳转用户管理界面
    children:[
      {
        path: 'person',
        name: '个人管理',
        component: () => import('../views/user/person/Person.vue'),
      },
      {
        path: 'food',
        name: '食品管理',
        component: () => import('../views/user/food/Food.vue'),
      },
      {
        path: 'order',
        name: '订单管理',
        component: () => import('../views/user/order/Order.vue'),
      },
      {
        path: 'transport',
        name: '订单管理',
        component: () => import('../views/user/transport/Transport.vue'),
      },
    ]
  },
  {
    path: '/supplier/',
    name: '商家',
    component: () => import('../views/ManageSupplier.vue'),
    // redirect:"/userManage", //直接跳转用户管理界面
    children:[
      {
        path: 'person',
        name: '个人管理',
        component: () => import('../views/supplier/person/Person.vue'),
      },
      {
        path: 'food',
        name: '食品管理',
        component: () => import('../views/supplier/food/Food.vue'),
      },
      {
        path: 'order',
        name: '订单',
        component: () => import('../views/supplier/order/Order.vue'),
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
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: '注册',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/supplier/login',
    name: '商户登录',
    component: () => import('../views/LoginSupplier.vue'),
  },
  {
    path: '/supplier/register',
    name: '商户注册',
    component: () => import('../views/RegisterSupplier.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
