import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import unfonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '18' }]]
      }
    }),
    tailwindcss(),
    tsconfigPaths(),
    unfonts({
      custom: {
        families: [
          {
            name: 'SFPro',
            local: 'SFPro',
            src: './src/assets/fonts/*.woff2'
          }
        ],
        preload: true,
        display: 'swap',
        injectTo: 'head'
      }
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000
  }
})
