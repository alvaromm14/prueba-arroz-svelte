import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: './docs', // relative to index.html
    // emptyOutDir: true, // true if outDir is inside root. if outDir is not inside root, uncomment this.
  },
  resolve: {
    alias: {
      "$components": path.resolve('./src/components'),
      "$data": path.resolve("./src/data"),
      "$routes": path.resolve("./src/routes"),
    }
  }
})

