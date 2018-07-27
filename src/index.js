import './styles/main.scss'

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home'

const App = () => (
  <BrowserRouter>
    <Route exact path='/' componrny={Home} />
  </BrowserRouter>
)

render(<App />, document.querySelector('#app'))
