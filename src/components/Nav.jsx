import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCameraRetro, faFileImage, faFilm } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './nav.scss'




export const Nav = () => {
  return (
    <div className='navbg'>
      <div className="nav">
        <div className='left-side'>
          
        <FontAwesomeIcon icon="fa-sharp fa-solid fa-projector" />
        <i class="fa-solid fa-camera-movie"></i>
        <h1>Whisper</h1>
          
        </div> 



        <div className='middle-side'>
          <div className="nav-items">
              <span>Movies</span>
              <span>TV Shows</span>
              <span>Reviews</span>
              <span>Watchlist</span>
              <span>Discover</span>
          </div>
        </div>


        <div className="right-side">
          <FontAwesomeIcon icon="fa-solid fa-camera-movie" />
          <button>Login</button>
        </div>
      </div>
    </div>
  )
}
