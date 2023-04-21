
import React, { useEffect, useRef, useState } from 'react'
import { FaCameraRetro, FaFly, FaHatWizard } from "react-icons/fa";
import {IoMdArrowDropdown} from "react-icons/io"
import whisper from "../img/whisper.png"
import { Link } from 'react-router-dom';
import { authFirebase } from '../../utils/firebase'; 
import {useAuthState} from "react-firebase-hooks/auth"



export const Nav = () => {

  const[user, loading] = useAuthState(authFirebase);
  const[dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);


  const handleDropdown = () => {
    if (!dropdown){
      setDropdown(true);
    }
    else{
      setDropdown(false);
    }
  }
  useEffect(()=> {
    if (user){
      console.log(user.photoURL);
    }
  },[])

  

  return (
    <div className='navbg'>
      <div className="nav">
        <div className='left-side'>
          
          <img src={whisper} alt="" />
          <a href="/" style={{textDecoration: 'none'}}><h1>Whispr.tv</h1></a>
          
        </div> 

        <div className='middle-side'>
          <div className="nav-items">
            <Link to={'/movie'}>
              <span>Movies</span>
            </Link>
            <Link to={'/tv'}>
              <span>TV Shows</span>
            </Link>
            
            <Link to={'/reviews'}>
              <span>Reviews</span>
            </Link>
            <Link to={'/discover'}>
              <span>Discover</span>
            </Link>
          </div>
        </div>


        <div className="right-side">
          {!user && (
            <Link to={`auth/login`}>
              <button>Login</button>
            </Link>
          )}
          {user && (
              <div className="user-logged-in-dropdown">
                <h1>{user.displayName}</h1>
                <Link to={'/dashboard'}>
                  <img src={user.photoURL} alt="" />                
                </Link>
              </div>
          )}
        </div>
      </div>
    </div>
  )
}
