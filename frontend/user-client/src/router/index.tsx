// @ts-nocheck
import { createRouter, createWebHistory } from 'vue-router'
import User from '@/pages/User.vue'
// import Login from '@/pages/Login.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    children: [
      {
        path: '',
        name: 'index',
        component: User
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/horse/user'),
  routes
})

export default router