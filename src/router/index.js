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
      component: () => import('@/views/message/message.vue'),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('@/views/city/city.vue')
      // 路由的其他信息放到 meta 里
      // meta: {
      //   hideTabBar: true
      // }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search/search.vue'),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: '/detail/:id', // 除了query传递参数，还可以通过动态路由传递参数
      name: 'detail',
      component: () => import('@/views/detail/detail.vue'),
      meta: {
        // hideTabBar: true
      }
    }
  ]
})

export default router
