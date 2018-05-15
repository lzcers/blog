import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

import Routes from '@/routes'

import 'normalize.css'
import '@/styles/base.scss'

const App = _ => (
  <div className="wrap">
    <Nav />
    <div className="content">
      <Routes />
    </div>
    <Footer />
  </div>
)

export default App
