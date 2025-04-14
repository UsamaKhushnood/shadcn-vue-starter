import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import WrapperLayout from '@/layouts/WrapperLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: WrapperLayout,
      children: [
        {
          path: '/',
          component: DashboardLayout,

          children: [
            {
              path: '/',
              name: 'dashboard',
              components: {
                default: WrapperLayout,
                dashboard: () => import('@/views/dashboard.vue'),
              },
              meta: {
                title: 'dashboard',
                auth: true
              }
            },
          ]
        },
        {
          path: '/',
          component: AuthLayout,
          children: [
            {
              path: '/login',
              name: 'login',
              components: {
                default: WrapperLayout,
                auth: () => import('@/views/auth/login.vue'),
              },
              meta: {
                title: 'login',
                auth: false
              }
            },
            {
              path: '/forgot-password',
              name: 'forgot-password',
              components: {
                default: WrapperLayout,
                auth: () => import('@/views/auth/forgot-password.vue'),
              },
              meta: {
                title: 'Forgot Password'
              }
            },
            {
              path: '/check-email',
              name: 'check-email',
              components: {
                default: WrapperLayout,
                auth: () => import('@/views/auth/check-email.vue'),
              },

              meta: {
                title: 'Check Email'
              }
            },
            {
              path: '/reset-password',
              name: 'reset-password',
              components: {
                default: WrapperLayout,
                auth: () => import('@/views/auth/reset-password.vue'),
              },

              meta: {
                title: 'Reset Password'
              }
            },
            {
              path: '/reset-success',
              name: 'reset-success',
              components: {
                default: WrapperLayout,
                auth: () => import('@/views/auth/reset-success.vue'),
              },

              meta: {
                title: 'Reset Success'
              }
            },
            {
              path: '/verify-code',
              name: 'verify-code',
              components: {
                default: WrapperLayout,
                auth: () => import('@/views/auth/verify-code.vue'),
              },

              meta: {
                title: 'Verify Code'
              }
            },
          ]
        },


      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title}`
  NProgress.start()

  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const authRequired = to.meta.auth

  if (authRequired && !isAuthenticated) {
    return next('/login')
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
