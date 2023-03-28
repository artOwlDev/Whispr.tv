
import React from 'react'
import './nav.scss'
import { FaCameraRetro, FaFly, FaHatWizard } from "react-icons/fa";
import {IoMdArrowDropdown} from "react-icons/io"
import whisper from "../img/whisper.png"
import { Link } from 'react-router-dom';
import { authFirebase } from '../../utils/firebase'; 
import {useAuthState} from "react-firebase-hooks/auth"



export const Nav = () => {

  const[user, loading] = useAuthState(authFirebase);

  return (
    <div className='navbg'>
      <div className="nav">
        <div className='left-side'>
          
          <img src={whisper} alt="" />
          <a href="/" style={{textDecoration: 'none'}}><h1>Whisperr.tv</h1></a>
          
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
          {!user && (
            <Link to={`auth/login`}>
              <button>Login</button>
            </Link>
          )}
          {user && (
            <div>
              <div style={{display: "flex", flexDirection: "row", alignItems: "center", margin: "1rem", gap: "1rem"}}to={`/dashboard`}>
                <img src={user.photoURL} style={{borderRadius: "50%", height: "4vh"}}alt="" />
                <h1 style={{fontSize: "1.2rem"}}>{user.displayName}</h1>
                <IoMdArrowDropdown style={{cursor: "pointer"}}/>
                <h1>hi</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
