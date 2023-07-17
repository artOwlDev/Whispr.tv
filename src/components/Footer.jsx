

import React from 'react'
import { AiFillGithub, AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
  return (
    <div className="footer">
      
        <div className="footer-links">
          <SocialIcon  url='https://github.com/artOwlDev' fgColor="white" target="_blank" />
          <SocialIcon url='https://www.linkedin.com/in/artunselcuk/' fgColor="white" target="_blank" />
        </div>

        <p>Whispr © 2023 | Data Collected from TMDB API</p>
    </div>
  )
}

export default Footer