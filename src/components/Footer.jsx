

import React from 'react'
import { AiFillGithub, AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
  return (
    <div style={{display: "flex", marginTop: "10vh" ,width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "2rem"}}>
      
        <div style={{display: "flex", fontSize: "2rem", gap: "1rem"}}>
          <SocialIcon  url='https://github.com/artOwlDev' fgColor="white" target="_blank" />
          <SocialIcon url='https://www.linkedin.com/in/artunselcuk/' fgColor="white" target="_blank" />
          <SocialIcon url='https://www.youtube.com' fgColor="white" target="_blank" />
          <SocialIcon url='https://twitter.com' fgColor="white" target="_blank" />
          <SocialIcon url='https://www.instagram.com/artunipunii/' fgColor="white" target="_blank" />
        </div>

        <p style={{fontSize: "1rem" ,fontFamily: "'Montserrat', sans-serif", paddingBottom: "2rem"}}>Whispr © 2023</p>
    </div>
  )
}

export default Footer