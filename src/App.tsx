import { Fragment } from 'react'

import Board from '@/modules/Kanban/Board'

import Footer from '@/layout/footer/Footer'
import Header from '@/layout/header/Header'

export default function App() {
  return (
    <Fragment>
      <Header />
      <main className='pt-header pb-footer grid h-screen grid-cols-3 max-lg:block max-lg:h-auto'>
        <Board />
      </main>
      <Footer />
    </Fragment>
  )
}
