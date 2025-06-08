import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5015,
    hmr : {
      clientPort: 5015
    }
  },
  preview: {
    host: '127.0.0.1',
    port: 5015
  },
  base: '/'
})
