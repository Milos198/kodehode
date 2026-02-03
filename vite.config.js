import { defineConfig } from 'vite'

export default defineConfig({
  base: '/kodehode/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        movie: './src/movie.html'
      }
    }
  }
})
