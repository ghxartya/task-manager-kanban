import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'unfonts.css'

import HeroProvider from '@/providers/HeroProvider.tsx'
import ReactQueryProvider from '@/providers/ReactQueryProvider.tsx'

import '@/assets/styles/globals.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <HeroProvider>
        <App />
      </HeroProvider>
    </ReactQueryProvider>
  </StrictMode>
)
