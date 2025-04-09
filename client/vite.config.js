import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true  // This allows network access during development
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173  // This lets Vercel’s PORT override the default
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
