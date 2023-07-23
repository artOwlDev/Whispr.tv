
import React, { useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import { authFirebase } from '../../utils/firebase'; 
import {useAuthState} from "react-firebase-hooks/auth"
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


const Dashboard = () => {

    const[user, loading] = useAuthState(authFirebase);
    const [activeTab, setActiveTab] = useState('reviews');
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    const handleActiveTab  = (tab) => {
        setActiveTab(tab)
    }

    useEffect(() => {
        const handleDashboard = () => {
            if (!user){
               navigate("../../auth/login")
            }
        };
    


        const fetchUsername = async () => {
          try {
            if (user) {
              const db = getFirestore();
              const userRef = doc(db, 'users', user.uid);
              const userSnapshot = await getDoc(userRef);
    
              if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                if (userData && userData.username) {
                  setUsername(userData.username);
                }
              }
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchUsername();
        handleDashboard();
      }, []);

    useEffect(() => {
        document.title = `${username} | Whispr`;

    },[])

  return (
    <div className='dashboard-page'>
        <Nav/>
        <div className="dashboard">
            <div className="dashboard-left">

                <div className="dashboard-userinfo">
                    <h1>Dashboard</h1>
                    <p style={{paddingBottom: "0.6rem"}}>{user ? user.email : null}</p>
                </div>

                <div className="dashboard-selections">
                    <a className={activeTab === "reviews" ? "active" : ""} href="#" onClick={() => handleActiveTab('reviews')}>Reviews</a>
                    <a className={activeTab === "account" ? "active" : ""} href="#" onClick={() => handleActiveTab('account')}>Account</a>
                </div>
            </div>

            <div className="dashboard-right">
                {activeTab === "reviews" && (
                    <div className='dashboard-right-div'>
                        <h1 style={{fontSize: "1rem", paddingBottom: "1rem"}}>Reviews</h1>
                        <h1 style={{fontSize: "2rem", paddingBottom: "0.4rem"}}>Review history: </h1>
                        <p>Signed in with: {user ? user.email : null}</p>

                    </div>


                )}

                {activeTab === 'account' && (
                    <div className='dashboard-right-div'>
                    <h1 style={{fontSize: "1rem", paddingBottom: "1rem"}}>Account</h1>
                    <h1 style={{fontSize: "2rem", paddingBottom: "0.4rem"}}>My Account</h1>
                    <p>Signed in with: {user.email}</p>

                    <button onClick={() => authFirebase.signOut() && navigate("/")}style={{marginTop: "2rem", borderRadius: "1rem", margin: "1rem 0px", background: "#2596be", fontSize: "1.2rem", padding: "10px"}}>Sign out</button>
                </div>
                )}
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Dashboard