// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'dist/index.html',
          dest: '', // This will copy `index.html` to the root of the output directory
        },
      ],
    }),
  ],
  build: {
    outDir: 'dist', // Ensure the output directory is correct
  },
})
