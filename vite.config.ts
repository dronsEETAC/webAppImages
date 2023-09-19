import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),legacy()],
  define: {
    Module: {} // this
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    https: {
      cert: './localhost.crt',
      key: './localhost.key',
      
    },
  },
  /*test: {
    globals: true,
    environment: 'jsdom'
  },*/
  
})


