

import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { Nav } from '../../components/Nav';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import {authFirebase} from "../../../utils/firebase";
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

const Login = () => {
    const navigate = useNavigate();



    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(authFirebase, googleProvider);
            navigate("/");
            console.log(result.user);


        } catch (error) {
            console.log(error);
        }
    }


    

  return (
    <React.Fragment>
        <Nav/>
        <div style={{display: "flex", height: "100vh", width: "100vw" ,justifyContent: "center", alignItems: "center"}}>
            <div style={{WebkitBoxShadow: "0px 0px 7px 0px #000000", display: "flex", justifyContent: "center", alignItems: "center", height: "40vh",width: "20vw", backgroundColor: "whitesmoke", borderRadius: "2rem", flexDirection: "column", marginBottom: "20rem"}}>
                <h1 style={{fontFamily: "'Poppins', sans-serif", color: "#374151", fontWeight: "bolder", color: "black", fontSize: "2rem", marginBottom: "1rem"}}>Join Today!</h1>
                <p style={{fontFamily: "'Poppins', sans-serif", color: "#374151", fontSize: "1rem", marginBottom: "4rem", textAlign: "center"}}>Sign in with one of our providers</p>
                <button onClick={googleLogin}style={{borderRadius: "1rem", fontSize: "2rem", display: "flex", justifyContent: "center", alignItems: "center", background: "#374151", padding: "1rem"}}>
                    <FcGoogle />
                    <h1 style={{padding: "10px", color: "white", fontSize: "1rem"}}>Sign in with Google</h1>
                </button>
            </div>
        </div>
        <Footer/>
    </React.Fragment>
    
  )
}

export default Login