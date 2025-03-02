import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import WrapperLayout from '@/layouts/WrapperLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: WrapperLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            title: 'Homepage'
          }
        }
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
