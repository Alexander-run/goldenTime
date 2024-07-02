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

router.beforeEach((to, from, next) => {
  // for google oAuth
  if (to.hash) {
    const paramsPairArray = to.hash.substr(1)
    const usp = new URLSearchParams(paramsPairArray)

    const state = usp.get('state')
    const access_token = usp.get('access_token')
    const token_type = usp.get('token_type')
    const expires_in = usp.get('expires_in')
    const scope = usp.get('scope')
    localStorage.setItem('google_state',state)
    localStorage.setItem('google_access_token',access_token)
    localStorage.setItem('google_token_type',token_type)
    localStorage.setItem('google_expires_in',expires_in)
    localStorage.setItem('google_scope',scope)
    next('/')
  }
  next()
})

export default router