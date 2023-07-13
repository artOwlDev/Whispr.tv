

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
      
          // Create a user document in the 'users' collection
          const db = getFirestore();
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            userId : user.uid,
            likedReviews: []
            // Add other desired user information here
          });
      
          navigate('/');
          console.log(user);
        } catch (error) {
          console.log(error);
        }
      };
      

    


    

  return (
    <React.Fragment>
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
    </React.Fragment>
    
  )
}

export default Login