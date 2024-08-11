import path from 'path';
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/activateVideo': {
        target: 'http://localhost:5173/move_videos.sh',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/activateVideo/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Set content type for the shell script
            res.setHeader('Content-Type', 'application/x-sh');
          });
        },
      },
    },
  },
  preview: {
  }
})
