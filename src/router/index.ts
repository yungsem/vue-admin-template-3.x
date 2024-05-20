import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/HomeView.vue'),
      children: [
        {
          path: '/home-board',
          name: 'home-board',
          component: () => import('../views/home-board/HomeBoard.vue'),
        }
      ]
    }
  ]
})

export default router
