import { defineStore } from 'pinia'
import { resetAllPiniaStores } from './index'
import api from '../helpers/axios'
import fetchWrapper from '../helpers/axios'
import VueCookies from 'vue-cookies'
import router from '@/router'
import { useToast } from 'vue-toastification'
// import Echo from 'laravel-echo'
// import Pusher from 'pusher-js'

const toast = useToast()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    isLoggedIn: false,
    detailsComplete: false,
    resettingPassword: false
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn || VueCookies.isKey('token'),
    isVerified: (state) => state.user.email_verified
  },
  actions: {
    login(form) {
      return api.post('/login', form).then((response) => {
        const { token, user, message } = response.data
        this.setUpProfile({ token, user })
        if (router.currentRoute.value.query.redirect) {
          router.push(router.currentRoute.value.query.redirect)
        } else if (!user.email_verified) {
          router.push('/email-verification')
        } else {
          router.push('/')
        }
        // useCommonStore().initAll()
      })
    },
    signup(form) {
      return api.post('/register', form).then((response) => {
        const { token, data, message } = response.data
        this.setUpProfile({ token, user: data })
        router.push('/email-verification')
        toast.success(message)
      })
    },
    setUpProfile(payload) {
      VueCookies.set('token', payload.token)
      this.user = payload.user
      this.isLoggedIn = true
      // useCommonStore().initAll()
      // this.initializePusher()
    },
    getMyProfile() {
      return api.get(`/users/${this.user.username}`).then((response) => {
        this.user = response.data.data
        if (!this.user.email_verified && this.isAuthenticated) {
          router.push('/email-verification')
        }
        return response.data.data
      })
    },
    initializePusher() {
      window.Pusher = Pusher
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        encrypted: true,
        forceTLS: true,
        channelAuthorization: {
          endpoint: `${import.meta.env.VITE_BASE_URL}/broadcasting/auth`,
          headers: {
            Authorization: `Bearer ${VueCookies.get('token')}`
          }
        }
      })
    },

    forgotPassword(form) {
      this.user.email = form.email
      this.resettingPassword = true
      return api.post('/forgot-password', form).then((response) => {
        router.push('/password/email-sent')
      })
    },
    resetPassword(form) {
      return api.post('/reset-password', form).then((response) => {
        router.push('/settings/profile')
      })
    },
    sendVerifcationEmail() {
      return api.get('/settings/email/resend').then((response) => {
        console.log(response)
        return response
      })
    },
    resedVerificationEmail(form) {
      return api.post('/reset-password', form).then((response) => {
        console.log(response)
      })
    },
    verifyEmail(id, payload) {
      return api
        .post(
          `/settings/email/verify/${id}?expires=${payload.expires}&signature=${payload.signature}&hash=${payload.hash}`,
          payload
        )
        .then((response) => {
          this.user.email_verified = true
          return response
        })
    },
    updateDetailsStatus(status) {
      this.detailsComplete = status
    },
    getProfile() {
      return api.get(`/users/${this.user.username}`).then((response) => {
        return response.data.data
      })
    },
    logout() {
      if (fetchWrapper.defaults.headers?.Authorization) {
        return api.post('/logout').then(() => {
          this.reset()
        })
      } else {
        this.reset()
      }
    },
    reset() {
      VueCookies.remove('token')
      this.user = {}
      this.isLoggedIn = false
      fetchWrapper.interceptors.request.use((config) => {
        config.headers.Authorization = null
        return config
      })
      resetAllPiniaStores()
      router.push('/login')
    },
    loginFirst() {
      return new Promise((resolve, reject) => {
        if (this.isLoggedIn) {
          resolve()
        } else {
          const currentPath = router.currentRoute.value.fullPath
          router.push({ name: 'login', query: { redirect: currentPath } })
          reject()
        }
      })
    }
  },
  persist: true
})
