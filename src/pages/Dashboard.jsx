
import React, { useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import { authFirebase } from '../../utils/firebase'; 
import {useAuthState} from "react-firebase-hooks/auth"
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const[user, loading] = useAuthState(authFirebase);
    const [activeTab, setActiveTab] = useState('reviews');
    const navigate = useNavigate();

    const handleActiveTab  = (tab) => {
        setActiveTab(tab)
    }

  return (
    <div className='dashboard-page'>
        <Nav/>
        <div className="dashboard">
            <div className="dashboard-left">

                <div className="dashboard-userinfo">
                    <h1>Dashboard</h1>
                    <p style={{paddingBottom: "0.6rem"}}>{user.email}</p>
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
                        <p>Signed in with: {user.email}</p>

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