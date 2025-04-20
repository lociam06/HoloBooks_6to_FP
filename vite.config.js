import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true, // Permite cualquier host
  },
  resolve: {
    alias: {
      '@public': path.resolve(__dirname, './public'),
    }
  }
})
