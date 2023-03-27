
import React from 'react'
import './nav.scss'
import { FaCameraRetro, FaFly, FaHatWizard } from "react-icons/fa";
import whisper from "../img/whisper.png"




export const Nav = () => {
  return (
    <div className='navbg'>
      <div className="nav">
        <div className='left-side'>
          
          <img src={whisper} alt="" />
          <h1>Whisperr.tv</h1>
          
        </div> 

        

        <div className='middle-side'>
          <div className="nav-items">
              <span>TV Shows</span>
              <span>Reviews</span>
              <span>Watchlist</span>
              <span>Discover</span>
          </div>
        </div>


        <div className="right-side">
          <button>Login</button>
        </div>
      </div>
    </div>
  )
}
