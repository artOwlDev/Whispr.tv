import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { Movie } from './components/Movie'
import { ListMovie } from './components/ListMovie'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Home/>
      <Movie/>
      <ListMovie/>
    </div>
  )
}

export default App
