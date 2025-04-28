import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.VITE_APP_PORT || '5173'),
    strictPort: true,
    watch: {
      usePolling: true,
    }
  }
})
