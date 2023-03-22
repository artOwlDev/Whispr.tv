

import React from 'react'
import "./movie.scss"


export const Movie = ({image,title,year}) => {

  const IMAGES = "https://image.tmdb.org/t/p/w1280"

  return (


    <div className='movie'>
        <img src={IMAGES + image} alt="" />
        <h1>{title}</h1>
    </div>
  )
}
