import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import WrapperLayout from '@/layouts/WrapperLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: WrapperLayout,
      redirect: "/dashboard",
      children: [
        {
          path: '/',
          component: DashboardLayout,
          children: [
            {
              path: '/dashboard',
              name: 'dashboard',
              components: {
                default: WrapperLayout,
                dashboard: () => import('@/views/dashboard.vue'),
              },
              meta: {
                title: 'dashboard'
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
                title: 'login'
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

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
