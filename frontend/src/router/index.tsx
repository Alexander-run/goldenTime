import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/Index.vue'
import Photography from '@/pages/photography/Index.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    children: [
      {
        path: '',
        name: 'index',
        component: Index
      },
      {
        path: 'photography',
        name: 'photography',
        component: Photography
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router