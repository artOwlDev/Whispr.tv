import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { TvItem } from './components/TvItem'
import { ListMovie } from './components/ListMovie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './pages/Details'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv/details/:id" element={<Details />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  )
}

export default App
