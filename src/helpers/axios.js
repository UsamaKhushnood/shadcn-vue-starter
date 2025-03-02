import axios from 'axios'
import router from '@/router'
import { useToast } from 'vue-toastification'
import VueCookies from 'vue-cookies'
import { useAuthStore } from '@/stores'
// import NProgress from "nprogress";

// NProgress.configure({showSpinner: false});

const toast = useToast()

const CODES = {
  UNAUTHENTICATED: 401,
  NOT_FOUND: 404
}
const baseUrl = `${import.meta.env.VITE_BASE_URL}`
const token = VueCookies.get('token') || null

let activeRequests = 0

const fetchWrapper = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
})

fetchWrapper.interceptors.request.use((config) => {
  const token = VueCookies.get('token') || null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers.Accept = 'application/json'
  if (activeRequests === 0) {
    // NProgress.start();
  }
  activeRequests++
  return config
})

fetchWrapper.interceptors.response.use(
  function (response) {
    activeRequests--
    if (activeRequests === 0) {
      // NProgress.done()
    }
    return response
  },
  function (error) {
    activeRequests--
    if (activeRequests === 0) {
      // NProgress.done()
    }
    if (error.response?.status === 401) {
      VueCookies.remove('token')
      useAuthStore().user = {}
      useAuthStore().isLoggedIn = false
      router.push('/login')
    }
    if (!error.config.ignoreGlobalCatch) {
      if (error.response?.data.message) {
        toast.error(error.response.data.message)
      } else {
        error.response?.data.errors.forEach((error) => {
          toast.error(error)
        })
      }
    }

    return Promise.reject(error)
  }
)

export default fetchWrapper
