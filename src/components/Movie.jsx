

import React from 'react'
import image from "../img/mbdtf.jpg"
import "./movie.scss"


export const Movie = () => {
  return (
    <div className='movie'>
        <img src={image} alt="" />
        <h1>My Beautiful Dark Twisted Fantasy</h1>
        <h2>Kanye West</h2>
    </div>
  )
}
