// @ts-nocheck
import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/Index.vue'
import Admin from '@/pages/Admin.vue'
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
        redirect: 'user'
      },
      {
        path: 'admin',
        name: 'admin',
        component: Admin
      },
      {
        path: 'user',
        name: 'user',
        component: User
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/horse'),
  routes
})

export default router