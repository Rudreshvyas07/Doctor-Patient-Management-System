import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react' ;
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(), // Enable SVG as ReactComponent
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://doctor-patient-management-system-wje7.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
