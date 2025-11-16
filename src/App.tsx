import { Fragment } from 'react'

import Board from '@/modules/Kanban/Board'
import TaskModal from '@/modules/Modal/TaskModal'

import Footer from '@/layout/footer/Footer'
import Header from '@/layout/header/Header'

export default function App() {
  return (
    <Fragment>
      <Header>
        <TaskModal />
      </Header>
      <main className='pt-header pb-footer grid min-h-screen grid-cols-3 max-lg:block'>
        <Board />
      </main>
      <Footer />
    </Fragment>
  )
}
