
import React, { useEffect, useRef, useState } from 'react'
import { FaCameraRetro, FaFly, FaHatWizard } from "react-icons/fa";
import {IoMdArrowDropdown} from "react-icons/io"
import whisper from "../img/whispr-logo.png"
import { Link } from 'react-router-dom';
import { authFirebase } from '../../utils/firebase'; 
import {useAuthState} from "react-firebase-hooks/auth"
import {FaUserFriends} from "react-icons/fa"
import {AiOutlineSearch} from "react-icons/ai"
import {HiOutlineMenu} from "react-icons/hi"



export const Nav = () => {

  const[user, loading] = useAuthState(authFirebase);
  const[dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const[userImage, setUserImage] = useState("");

  const handleActiveTab  = (tab) => {
    setActiveTab(tab)
  }


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


  const DropDown = () => {
    return <div className='dropdown'>
      <Link to={'../../'}>
        <div className='dropdown-element'>Home</div>
      </Link>
      <Link to={'../../dashboard'}>
        <div className='dropdown-element'>Dashboard</div>
      </Link>
      <div className='hori-line'></div>
      <div onClick={() => authFirebase.signOut() && navigate("/")} className='dropdown-element logout'>Log out</div>
    </div>
  }

  

  return (
    <div className='navbg'>
      <div className="nav">

        <div className='left-side'>
          
          <a href="/"><img src={whisper} alt="" /></a>
          
        </div> 
        <div className='middle-side'>
          <div className="nav-items">
            <Link to={'/movie'}>
              <span>Movies</span>
            </Link>
            <Link to={'/tv'}>
              <span>TV Shows</span>
            </Link>
            
            <Link to={'/upcoming'}>
              <span>Upcoming</span>
              
            </Link>
            <Link to={'/reviews'}>
              <span>Reviews</span>
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
                
                <div  className='user-logged-in-dropdown' to={'/dashboard'}>
                  <p><span>{user.email.substring(0, user.email.indexOf("@")).charAt(0).toUpperCase() + user.email.substring(0, user.email.indexOf("@")).slice(1)}</span></p>
                  <img src={user.photoURL} alt="" />                
                </div>

                <HiOutlineMenu onClick={handleDropdown} className='dropdown-icon'/>
                {dropdown && <DropDown/>}

              </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}
