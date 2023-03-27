import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { TvItem } from './components/TvItem'
import { ListMovie } from './components/ListMovie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Home/>
    </div>
  )
}

export default App
