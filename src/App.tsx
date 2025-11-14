import { Fragment } from 'react'

import Board from '@/modules/Kanban/Board'

import Footer from '@/layout/footer/Footer'
import Header from '@/layout/header/Header'

export default function App() {
  return (
    <Fragment>
      <Header />
      <main className='pt-header h-screen'>
        <Board />
      </main>
      <Footer />
    </Fragment>
  )
}
