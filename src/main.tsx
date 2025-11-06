import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ReactQueryProvider from '@/providers/ReactQueryProvider.tsx'

import '@/assets/styles/globals.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </StrictMode>
)
