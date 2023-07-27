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
import Actor from './pages/Actor'
import Upcoming from './pages/Upcoming'
import Reviews from './pages/Reviews'
import Username from './pages/Username'
import WriteReview from './pages/WriteReview'

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/television" element={<Tv />} />
          <Route path="/television/details/:id" element={<Details />} />
          <Route path="/movies/details/:id" element={<Details />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/actor/:id" element={<Actor />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/movies/write-review/:id" element={<WriteReview />} />
          <Route path="/television/write-review/:id" element={<WriteReview />} />
          <Route path="/username-select" element={<Username />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  )
}

export default App
