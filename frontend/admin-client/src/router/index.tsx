// @ts-nocheck
import { createRouter, createWebHistory } from 'vue-router'
import Admin from '@/pages/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    children: [
      {
        path: '',
        name: 'index',
        component: Admin
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/horse/admin'),
  routes
})

export default router