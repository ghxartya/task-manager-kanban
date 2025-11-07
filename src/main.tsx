import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ChakraUIProvider from '@/providers/ChakraUIProvider.tsx'
import ReactQueryProvider from '@/providers/ReactQueryProvider.tsx'

import '@/assets/styles/globals.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ChakraUIProvider>
        <App />
      </ChakraUIProvider>
    </ReactQueryProvider>
  </StrictMode>
)
