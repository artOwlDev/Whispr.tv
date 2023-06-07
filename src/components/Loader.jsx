

import React from 'react'
import { RaceBy } from '@uiball/loaders'
import Footer from './Footer'
import { Nav } from './Nav'
import whisper from "../img/whispr-logo.png"




const Loader = () => {
  return (
    <div className='loader'>
        <Nav/>
          <div style={{display: "flex", justifyContent: "center", height: "74vh", alignItems: "center", flexDirection: "column", gap: "1rem"}}>

            <img className='whisper-loader' src={whisper} style={{objectFit: "contain", height: "3vh", margin: " 2rem 0"}}/>
            <RaceBy size={80} lineWeight={5} speed={1.01} color="white" />
            <p style={{fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem"}}>Just a moment..</p>
          </div>
        <Footer style={{position: "sticky", bottom: "0"}}/>
    </div>
  )
}

export default Loader