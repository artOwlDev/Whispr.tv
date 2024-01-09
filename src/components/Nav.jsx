
import React, { useEffect, useRef, useState } from 'react'
import { FaCameraRetro, FaFly, FaHatWizard } from "react-icons/fa";
import {IoMdArrowDropdown} from "react-icons/io"
import whisper from "../img/whispr-logo.png"
import { Link, useParams } from 'react-router-dom';
import { authFirebase } from '../../utils/firebase'; 
import {useAuthState} from "react-firebase-hooks/auth"
import {FaUserFriends} from "react-icons/fa"
import {AiOutlineSearch} from "react-icons/ai"
import {HiOutlineMenu} from "react-icons/hi"
import TvIcon from '@mui/icons-material/Tv';
import {BiMovie} from "react-icons/bi"
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { MdOutlineMovie } from "react-icons/md";
import { FiUsers } from "react-icons/fi";



export const Nav = () => {


  const[user, loading] = useAuthState(authFirebase);
  const[dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const[userImage, setUserImage] = useState(""); 
  const [username, setUsername] = useState("");


  const handleActiveTab  = (tab) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (user) {
          const db = getFirestore();
          const userRef = doc(db, 'users', user.uid);
          const userSnapshot = await getDoc(userRef);
          const userData = userSnapshot.data();
          setUsername(userData.username)

  
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsername();
  }, []);
  

  



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
      setUserImage(user.photoURL);
      console.log(user);

    }
  },[])


  const DropDown = () => {
    return <div ref={dropdownRef} className='dropdown'>
      <Link to={'../../'}>
        <div className='dropdown-element'>Home</div>
      </Link>
      <Link to={'../../dashboard'}>
        <div className='dropdown-element'>Dashboard</div>
      </Link>
      <Link to={'../../movies'}>
        <div className='dropdown-element mobile'>Movies</div>
      </Link>
      <Link to={'../../television'}>
        <div className='dropdown-element mobile'>TV Series</div>
      </Link>
      

      <div className='hori-line'></div>
      <div onClick={() => authFirebase.signOut() && window.location.reload() && navigate("../..")} className='dropdown-element logout'>Log out</div>
    </div>
  }

  

  return (
    <div className='navbg'>
      <div className="nav">

        <div className='left-side'>
          
          <a href="/"><img src={whisper} alt="" /></a>
          
        </div> 
        


        <div className="right-side">
          
          
             

                <div className="nav-icons">
                  <Link to={'../../movies'} className="nav-link-element">
                    <MdOutlineMovie/>
                    <h1 className='right-nav-element text'>Movies</h1>
                  </Link>

                  <Link to={'../../television'} className="nav-link-element">
                    <TvIcon/>
                    <h1 className='right-nav-element text'>TV Series</h1>
                  </Link>

                  {/* <Link to={'../../social'} className="nav-link-element">
                    <FiUsers/>
                    <h1 className='right-nav-element text'>Social</h1>
                  </Link> */}



                  
                  <Link to={'../../'}>
                    <AiOutlineSearch className='right-nav-element'/>
                  </Link>

                </div>

                {!user && (
                  <Link to={`../../auth/login`}>
                    <button className='button-nav'>Log In</button>
                  </Link>
                )}

                {user && (
                  <React.Fragment>
                    <div  className='user-logged-in-dropdown' to={'/dashboard'}>
                      {username !== "" && <p>{username}</p>}
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
