

import React from 'react'
import { RaceBy } from '@uiball/loaders'
import Footer from './Footer'
import { Nav } from './Nav'


const Loader = () => {
  return (
    <div>
        <Nav/>
          <div style={{display: "flex", justifyContent: "center", height: "74vh", alignItems: "center", flexDirection: "column", gap: "1rem"}}>

            <RaceBy size={80} lineWeight={5} speed={1.05} color="white" />
            <p style={{fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem"}}>Just a moment..</p>
          </div>
        <Footer style={{position: "sticky", bottom: "0"}}/>
    </div>
  )
}

export default Loader