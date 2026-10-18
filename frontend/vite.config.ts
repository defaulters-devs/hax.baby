import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'https://virtue-departmental-reach-wow.trycloudflare.com'
    ]
  }
})
