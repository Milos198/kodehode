import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/kodehode/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        movie: './public/movie.html'
      }
    }
  }
})
