import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  base: '/Timer2/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.gif', '**/*.mp3'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          return `assets/[name][extname]`
        },
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js'
      }
    }
  }
})