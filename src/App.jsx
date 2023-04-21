import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { TvItem } from './components/TvItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './pages/Details'
import Login from './pages/auth/Login'
import ScrollToTop from './components/ScrollTopTop'
import Movie from './pages/Movie'
import Tv from './pages/Tv'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/tv/details/:id" element={<Details />} />
          <Route path="/movie/details/:id" element={<Details />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </div>
    </BrowserRouter>
    
  )
}

export default App
