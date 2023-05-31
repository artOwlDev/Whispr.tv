
import React, { useEffect, useRef, useState } from 'react'
import { FaCameraRetro, FaFly, FaHatWizard } from "react-icons/fa";
import {IoMdArrowDropdown} from "react-icons/io"
import whisper from "../img/whispr.png"
import { Link } from 'react-router-dom';
import { authFirebase } from '../../utils/firebase'; 
import {useAuthState} from "react-firebase-hooks/auth"
import {FaUserFriends} from "react-icons/fa"
import {AiOutlineSearch} from "react-icons/ai"


export const Nav = () => {

  const[user, loading] = useAuthState(authFirebase);
  const[dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const[userImage, setUserImage] = useState("");


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
      console.log(user);
      setUserImage(user.photoURL);
      console.log(userImage);
    }
  },[])

  

  return (
    <div className='navbg'>
      <div className="nav">
        <div className='left-side'>
          
          <img src={whisper} alt="" />
          <a href="/" style={{textDecoration: 'none'}}><h1>Whispr</h1></a>
          
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
            <Link to={'/upcoming'}>
              <span>Upcoming</span>
              
            </Link>
          </div>
        </div>


        <div className="right-side">
          {!user && (
            <Link to={`../../auth/login`}>
              <button className='button-nav'>Login</button>
            </Link>
          )}
          {user && (
              <React.Fragment>
                <Link to={'../../'}>
                  <AiOutlineSearch className='search-icon'/>
                </Link>
                <Link to={'.././social'}>
                  <FaUserFriends className='social-icon'/>
                </Link>
                <Link  className='user-logged-in-dropdown' to={'/dashboard'}>
                  <h1>{user.email.substring(0, user.email.indexOf("@")).charAt(0).toUpperCase() + user.email.substring(0, user.email.indexOf("@")).slice(1)}</h1>
                  <img src={user.photoURL} alt="" />                
                </Link>
              </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}
