import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import fs from 'fs'

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
    host: "dronseetac.upc.edu",
          port: 8106,

    // https: {
    //   cert: './localhost.crt',
    //   key: './localhost.key',
    //   //key: fs.readFileSync('/etc/letsencrypt/live/dronseetac.upc.edu/privkey.pem'),
    //   //cert: fs.readFileSync('/etc/letsencrypt/live/dronseetac.upc.edu/cert.pem'),
    //   //ca: fs.readFileSync('/etc/letsencrypt/live/dronseetac.upc.edu/chain.pem')

    // },

  },
  /*test: {
    globals: true,
    environment: 'jsdom'
  },*/
  
})


