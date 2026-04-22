import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true, // Prevents port hopping
    cors: true,
    allowedHosts: [
      '.ngrok-free.dev',
      'e903-103-171-99-41.ngrok-free.app'
    ],
    hmr: {
      clientPort: 443,
    },
  },
})
