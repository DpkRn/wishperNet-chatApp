import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': process.env.NODE_ENV === 'production'
        ? 'https://wisherapp.onrender.com'
        : 'http://localhost:8747',
    },
  },
  build: {
    outDir: 'dist', // Output to 'dist' for production
  },
})
