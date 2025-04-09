import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0'  // enables dev server access from outside
  },
  preview: {
    host: '0.0.0.0',  // required for Railway to access preview server
    port: parseInt(process.env.PORT) || 4173
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
