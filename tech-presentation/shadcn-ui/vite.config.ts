import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  slidev: {
    components: {
      globsExclude: ['**/components/ui/**/index.ts'],
    },
  },
})
