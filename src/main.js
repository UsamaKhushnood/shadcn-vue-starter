import 'nprogress/nprogress.css'
import 'vue-toastification/dist/index.css'
import './assets/styles/main.scss'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toast from 'vue-toastification'
import * as filters from './filters'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)


// Registering filters
app.config.globalProperties.$filters = app.config.globalProperties.$filters || {}
Object.keys(filters).forEach((filterName) => {
  app.config.globalProperties.$filters[filterName] = filters[filterName]
})
// Registering filters ends

app.use(Toast, {
  maxToasts: 20,
  newestOnTop: true
})

app.mount('#app')
