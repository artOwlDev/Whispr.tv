

import React from 'react'
import { Nav } from '../components/Nav'
import adventure from "../img/greg.jpg"


const Profile = () => {
  return (
    <div className='profile'>
        <Nav/>

        <div className="profile-component">
            <div className="profile-banner">

                <div className="profile-banner-name-username">
                    <img src={adventure}/>
                    <div className="profile-banner-name-about">
                        <h1>ArtuniPuni</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                    </div>
                </div>

                <div className="profile-banner-stats">
                    <div className="profile-banner-stat-box">
                        <h1>Liked</h1>
                        <p>999</p>
                    </div>
                    <div className="profile-banner-stat-box">
                        <h1>Reviewed</h1>
                        <p>999</p>
                    </div>
                    <div className="profile-banner-stat-box">
                        <h1>Watched</h1>
                        <p>999</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Profile