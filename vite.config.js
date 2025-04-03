import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [
    vue(),
    Components({
      // dirs: ['src/components/common', 'src/components/ui'],
      extensions: ['vue']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
