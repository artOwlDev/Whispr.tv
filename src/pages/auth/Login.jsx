

import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { Nav } from '../../components/Nav';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import {authFirebase} from "../../../utils/firebase";
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import bannerimage from "../../img/banner.jpg"
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Login / Sign up · Whispr`;
    },[])



    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async () => {
      try {
        const result = await signInWithPopup(authFirebase, googleProvider);
        const user = result.user;
  
        // Check if the user has already selected a username
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          // User has already selected a username
          navigate('/');
        } else {
          // User hasn't selected a username yet, proceed to username selection page
          // Create a user document in the 'users' collection
          const newUserRef = doc(db, 'users', user.uid);
          await setDoc(newUserRef, {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            userId: user.uid,
            likedReviews: [],
            username: ""
            // Add other desired user information here
          });
  
          navigate('/username-select');
        }
  
        console.log(user);
      } catch (error) {
        console.log(error);
      }
      };
      

    


    

  return (
    <div className='login-page-container'>
        <Nav/>
        <div className="login-page">
            <div className="login-card">
                <div className="left">
                    <img src={bannerimage} alt="" />
                </div>
                <div className="right">
                    <h1>Create your account</h1>
                    <p>Let's get started with your experience on Whispr.</p>
                    <h3>Sign in with one of our providers:</h3>
                    <button onClick={googleLogin}style={{borderRadius: "1rem", fontSize: "2rem", display: "flex", justifyContent: "center", alignItems: "center", background: "#374151", padding: "1rem"}}>
                        <FcGoogle />
                        <h1 style={{padding: "10px", color: "white", fontSize: "1rem"}}>Sign in with Google</h1>
                    </button>

                </div>
            </div>
        </div>
        <Footer/>
    </div>
    
  )
}

export default Login