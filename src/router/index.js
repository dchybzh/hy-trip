// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 配置映射关系： path -> component
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/home.vue')
    },
    {
      path: '/favor',
      name: 'favor',
      component: () => import('@/views/favor/favor.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/order/order.vue')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('@/views/message/message.vue')
    },
    {
      path: '/city',
      // name: 'city',
      component: () => import('@/views/city/city.vue')
      // 路由的其他信息放到 meta 里
      // meta: {
      //   hideTabBar: true
      // }
    }
  ]
})

export default router
